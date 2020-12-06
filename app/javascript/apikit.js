import { writable, get } from 'svelte/store'

const bodyData = {
  getPath:(path,data)=>path,
  getData:(data)=>data
}

const queryData = {
  getPath:(path,data)=>{
    const params = Object.entries(data||{}).map((k,v)=>`${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
    return path+(params ? '?'+params : '')
  },
  getData:(data)=>null
}

const apiFn = (method,dataManipulation=bodyData)=>(path,options={})=>{
  const {getPath,getData} = bodyData
  // store props for component rendering
  const current = {
    loading: false,
    error: null,
    value: null
  }
  let update
  const fn = async (data)=>{
    path = getPath(path,data)
    data = getData(data)
    try {
      update({loading:true,error:null})
      const result = await fetch(path,{
        method:method,
        headers: { 'Content-Type': 'application/json' },
        body:data === null ? null : JSON.stringify(data)
      })
      const json = await result.json()
      if(!result.ok) throw new Error(json.error || "Server error")
      update({loading:false,error:null,value:json})
      for(const [destination,valueFn] of destinations){
        destination.set(
          valueFn
          ? valueFn.length == 2
            ? valueFn(get(destination),json)
            : valueFn(json)
          : json
        )
      }
      return json
    } catch(e) {
      update({loading:false,error:e.message})
    }
  }
  // chain method(s)
  const destinations = []
  fn.store = (destination,valueFn=null)=>{
    destinations.push([destination,valueFn])
    return fn
  }
  // convenience to sync to a key of the sapper session
  // fn.session = (key,valueFn=null)=>fn.store(
  //   stores().session, // WARNING: I tried to lazily get this later, but it only works right during component setup
  //   (old,value)=>Object.assign(old,{
  //       [key]: valueFn
  //         ? valueFn.length == 2
  //           ? valueFn(old[key],value)
  //           : valueFn(value)
  //         : value
  //     })
  // )
  // store contract
  let subscriptions = []
  const unsubscribeFn = notify=>()=>{
    subscriptions = subscriptions.filter((f)=>f!=notify)
  }
  fn.subscribe = notify=>{
    subscriptions.push(notify)
    notify(current)
    return unsubscribeFn(notify)
  }
  update = (attrs)=>{
    Object.assign(current,attrs)
    for(const notify of subscriptions) notify(current);
  }
  return fn
}

const apikit = {
  get:apiFn('GET',queryData),
  put:apiFn('PUT'),
  post:apiFn('POST'),
  del:apiFn('DELETE'),
  patch:apiFn('PATCH')
}

export default apikit