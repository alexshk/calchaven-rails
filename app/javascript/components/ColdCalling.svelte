<script>
  import { round } from './util.js'
  import Report from './ColdCalling/Report.svelte'
  let daysCalling = 20
  let dailyCalls = 20
  let monthlyCalls
  let percentConversation = 15
  let dailyConversations
  let percentSale = 7
  let daysForSale
  let salesPerDay
  let monthlySales
  let currentCustomers = 2
  $: monthlyCalls = daysCalling * dailyCalls
  $: {
    dailyConversations = (dailyCalls && percentConversation) ? dailyCalls * percentConversation / 100 : null
    salesPerDay = (dailyConversations && percentSale) ? (dailyConversations * percentSale / 100) : null
    daysForSale = (salesPerDay) ? 1 / salesPerDay : null
    monthlySales = (salesPerDay && daysCalling) ? salesPerDay * daysCalling : null
  }

  let setupRevenue = 500
  let monthlyRevenue = 200
  let setupCost = 100
  let monthlyCost = 40
  let customerLifetime = 18
  let churnRate
  let monthsToRefer = 12
  let referralRate

  $: churnRate = customerLifetime ? 1 / customerLifetime : null
  $: referralRate = monthsToRefer ? 1 / monthsToRefer : null
</script>

<div class="fields">
  <fieldset>
    <legend>Cold Calling Sales</legend>
    <table>
      <tr>
        <th><label for="daysCalling">Days per month calling</label></th>
        <td><input type="number" id="daysCalling" bind:value={daysCalling} /></td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <th><label for="dailyCalls">Calls per day</label></th>
        <td><input type="number" id="dailyCalls" bind:value={dailyCalls} /></td>
        <th>Calls per month</th>
        <td><input type="text" id="monthlyCalls" value={monthlyCalls} disabled /></td>
      </tr>
      <tr>
        <th><label for="percentConversation">% Conversation</label></th>
        <td><input type="number" id="percentConversation" bind:value={percentConversation} /></td>
        <th>Conversations per day</th>
        <td><input type="text" id="dailyConversations" value={round(dailyConversations)} disabled /></td>
      </tr>
      <tr>
        <th><label for="percentSale">% Sale</label></th>
        <td><input type="number" id="percentSale" bind:value={percentSale} /></td>
        {#if salesPerDay >= 1 }
          <th>Sales per day</th>
          <td><input type="text" id="salesPerDay" value={round(salesPerDay)} disabled /></td>
        {:else}
          <th>Days to make a sale</th>
          <td><input type="text" id="daysForSale" value={round(daysForSale)} disabled /></td>
        {/if}
      </tr>
      <tr class="gap-above">
        <th><label for="currentCustomers">Current customers</label></th>
        <td><input type="number" id="currentCustomers" bind:value={currentCustomers} /></td>
        <td colspan="2"></td>
      </tr>
    </table>
  </fieldset>
  <fieldset>
    <legend>Product &amp; Pricing</legend>
    <table>
      <tr>
        <th><label for="setupRevenue">Setup revenue</label></th>
        <td><input type="number" id="setupRevenue" bind:value={setupRevenue} /></td>
        <td colspan="2" rowspan="4" class="all-values-info">All values are<br />per-customer</td>
      </tr>
      <tr>
        <th><label for="monthlyRevenue">Monthly revenue</label></th>
        <td><input type="number" id="monthlyRevenue" bind:value={monthlyRevenue} /></td>
      </tr>
      <tr class="gap-above">
        <th><label for="setupCost">Setup cost</label></th>
        <td><input type="number" id="setupCost" bind:value={setupCost} /></td>
      </tr>
      <tr>
        <th><label for="monthlyCost">Monthly cost of providing service</label></th>
        <td><input type="number" id="monthlyCost" bind:value={monthlyCost} /></td>
      </tr>
      <tr class="gap-above">
        <th><label for="customerLifetime">Average customer lifetime months</label></th>
        <td><input type="number" id="customerLifetime" bind:value={customerLifetime} /></td>
        <th>Monthly % churn</th>
        <td><input type="text" id="churnRate" value={round(churnRate * 100,2)} disabled /></td>
      </tr>
      <tr>
        <th><label for="monthsToRefer">Existing customer refers a <br class="wide-br" />new customer every X months</label></th>
        <td><input type="number" id="monthsToRefer" bind:value={monthsToRefer} /></td>
      </tr>
    </table>
  </fieldset>
</div>
<Report {monthlySales} {churnRate} {referralRate} {setupRevenue} {monthlyRevenue} {setupCost} {monthlyCost} startingCustomers={currentCustomers} />

<style>

  div.fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }
  fieldset {
    border:solid 1px #777;
  }
  @media(max-width: 910px) {
    div.fields {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }
  @media(max-width: 1230px) {
    .wide-br {
      display: none;
    }
  }
  table {
    width:100%;
    border-collapse: separate;
    border-spacing: 0;
    display: table;
    white-space:normal;
    border:none;
  }
  th, td {
    font-size:0.9rem;
    line-height:1.1;
  }
  tr { background: transparent; }
  th { text-align: right; vertical-align: middle; padding-right: 0px; font-weight: 500; }
  td { vertical-align: middle; padding-right: 8px; text-align:left; }
  tr.gap-above td, tr.gap-above th {
    border-top: solid 8px transparent;
  }
  .all-values-info {
    padding-left: 8px;
    border-left:solid 1px #777;
    color:#777;
  }
  label { margin:0; font-weight:inherit; }
  input { width:4rem; text-align: center; margin:0; padding:0.2rem 0; }
  input[disabled] { color:black; }
</style>