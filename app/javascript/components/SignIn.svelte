<script>
import { user } from '../stores.js'
import apikit from '../apikit.js'

export let focus = false
export let create = false
let form, name, email, password, wants_email

$:{
  if(focus && form){
    let field = Array.from(form.elements).find(i=>!i.value)
    if(field) field.focus()
  }
}
const doCreate = apikit.post("api/users").store(user)
const doLogin = apikit.post("api/session").store(user)
function toggle(){
  create = !create
}
function onSubmit(){
  if(create){
    doCreate({name,email,password,wants_email})
  } else {
    doLogin({email,password})
  }
}
</script>

<form class:loading={$doCreate.loading || $doLogin.loading} bind:this={form} on:submit|preventDefault={onSubmit}>
  {#if create}
  <label for="name">First name (or whatever)</label>
  <input type="text" id="name" bind:value={name}>
  {/if}
  <label for="email">Email (or whatever)</label>
  <input type="text" id="email" bind:value={email}>
  <label for="password">Password</label>
  <input type="password" id="password" bind:value={password}>
  {#if create}
    <div class="checkbox-row"><input type="checkbox" id="subscribe" bind:checked={wants_email}><label for="subscribe" class="subtle">Send me email when there are new or improved calculators (needs a real email address)</label></div>
    {#if $doCreate.error}<p class="error">{$doCreate.error}</p>{/if}
    <button type="submit">Create Account</button>
    <p>Already have an account? <a href="." on:click|preventDefault={toggle}>Sign in</a></p>
  {:else}
    {#if $doLogin.error}<p class="error">{$doLogin.error}</p>{/if}
    <button type="submit">Sign In</button>
    <p>Don't have an account? <a href="." on:click|preventDefault={toggle}>Create one</a> so you can save and share your work.</p>
  {/if}
  <p>If you want to stay anonymous, you can use any username instead of an email address.</p>
</form>

<style>
form {
  border:none;
  box-shadow: none;
  margin:0;
  transition: opacity 0.2s;
}
form.loading {
  opacity:0.5;
  pointer-events: none;
}
button {
  padding:0.5rem 1rem;
}
input[type=text], input[type=password] {
  width:100%;
  box-sizing: border-box;
}
p {
  font-weight:normal;
}
p:last-child {
  margin-bottom:0;
}
p.error {
  color:#900;
}
label.subtle {
  font-weight: normal;
}
div.checkbox-row {
  display:flex;
  align-items: flex-start;
  justify-content: stretch;
}
div.checkbox-row input {
  flex:0 0 auto;
  margin:0.35rem 0.5rem 0 0;
}
div.checkbox-row label {
  flex:1 1 auto;
  margin-bottom:1rem;
}
</style>