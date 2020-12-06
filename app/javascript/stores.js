import { writable, readable } from 'svelte/store'

export const user = writable(null)

export const page = readable({},set=>{
  if(typeof location=='undefined' || typeof document=='undefined') return set({});
  const update = ()=>set({path:location.pathname})
  update()
  document.addEventListener('turbolinks:load',update)
})