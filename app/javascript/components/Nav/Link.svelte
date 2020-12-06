<script>
  import { page } from '../../stores.js'
  export let href
  export let preload = false
  export let mobile = true
  let path, isCurrent, current
  $:{
    path = $page.path
    isCurrent = path === href || (href === '.' && path === "")
    current = isCurrent ? 'page' : undefined
  }
</script>

<li class:hideMobile={!mobile}><a href={href} rel={preload ? "preload" : undefined} aria-current={current}><slot /></a></li>

<style>
  /* Works with ../Nav styles */
  a[aria-current] {
    color:inherit;
  }
  @media(max-width:450px){
    li.hideMobile {
      display:none;
    }
  }
</style>