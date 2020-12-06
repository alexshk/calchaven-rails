function thousands(numeric){
  if(numeric === null) return ''
  // BUG: adds separators after decimal if >3 decimal places
  // From https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch06s12.html
  return (""+numeric).replace(/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g,"$&,")
}

function round(number,digits=1){
  if(number === null) return ''
  return thousands(number.toFixed(digits).replace(/\.?0+$/,''))
}

function dollars(number,withCents=false){
  if(number === null) return ''
  return "$"+(withCents ? round(number,2) : thousands(Math.round(number)))
}

function* range(start=0,end=Infinity,step=1){
  for(let i=start; i<=end; i+=step) yield i;
}

export { round, thousands, dollars, range };