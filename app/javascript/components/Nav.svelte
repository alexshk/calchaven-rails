<script>
  import Link from './Nav/Link.svelte'
  import PulldownButton from './Nav/PulldownButton.svelte'
  import SignIn from './SignIn.svelte'
  import { user } from '../stores.js'
  import apikit from '../apikit.js'

  const logout = apikit.del("api/session").store(user,()=>null)
</script>

<nav>
  <a href="."><img alt="" src="/logo-192.png" height="70"></a>
  <ul>
    <Link href="/" mobile={false}>Home</Link>
    <Link href="/cold-calling">Cold Calling Sales</Link>
    {#if $user}
      <li><button on:click={logout}>Logout {$user.name}</button></li>
    {:else}
      <PulldownButton label="Sign In" align="right" let:open>
        <SignIn focus={open} />
      </PulldownButton>
    {/if}
  </ul>
</nav>