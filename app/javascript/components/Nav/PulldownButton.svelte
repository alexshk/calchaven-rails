<script>
  export let label
  export let align = "right"
  let open = false
  let everOpen = false
  let alignRight = align == "right"
  let alignLeft = align == "left"

  function toggle(){
    open = !open
    everOpen = everOpen || open
  }

  // Might be better to manually turn this on when open instead of listening
  // to clicks anywhere all the time. OTOH, it's just one element. NBD for now.
  function clickAnywhere(e){
    if(!open) return true;
    toggle();
  }
</script>

<svelte:window on:click={clickAnywhere}/>

<li>
  <div class="wrapper">
    <button class:open on:click|stopPropagation={toggle} on:click>{label} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 308 108" width="12">
<path stroke="currentColor" fill="currentColor" stroke-width="5" d="M8,3H300L154,105z"/>
</svg></button>
    {#if everOpen}
    <div class="pulldown" class:alignRight class:alignLeft on:click|stopPropagation class:open>
      <slot {open}/>
    </div>
    {/if}
  </div>
</li>

<style>
  .wrapper {
    display:inline-block;
    position: relative;
    overflow: visible;
  }
  .pulldown {
    position:absolute;
    top:100%;
    width:354px;
    box-sizing: border-box;
    max-width: calc(100vw - 2rem);
    border:solid 2px var(--color);
    border-radius: var(--border-radius);
    background: var(--color-bg);
    z-index:9998;
    margin-top:-2px;
    display:none;
  }
  .pulldown.open {
    display:block;
  }
  .alignLeft {
    left:0;
    border-top-left-radius: 0;
  }
  .alignRight {
    right:0;
    border-top-right-radius: 0;
  }
  button {
    padding:0.5rem 1rem;
    margin:0;
  }
  @media(max-width:450px){
    button {
      padding:0.25rem 0.5rem;
    }
  }
  button.open {
    background-color: var(--color-bg);
    color: var(--color);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    z-index:9999;
    position: relative;
  }
  button.open::after {
    content:'';
    width:100%;
    height:4px;
    background-color:var(--color-bg);
    position:absolute;
    bottom:0;
    left:0;
    margin-bottom:-3px;
  }
  button.open:hover {
    filter: none;
  }
  svg {
    vertical-align: middle;
    padding: 0 0 3px 2px;
  }
  li:last-child {
    margin-right:0;
  }
</style>