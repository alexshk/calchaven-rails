<script>
import { dollars, range } from '../util.js'
export let startingCustomers
export let monthlySales
export let churnRate
export let referralRate
export let setupRevenue
export let monthlyRevenue
export let setupCost
export let monthlyCost
let report
$: {
  report = [{
    month:0,
    fractionalSold:0,
    soldCustomers:0,
    fractionalReferred:0,
    referredCustomers:0,
    newCustomers:0,
    fractionalChurned:0,
    churnedCustomers:0,
    totalCustomers:startingCustomers||0,
    oneTimeRevenue:0,
    recurringRevenue:0,
    costs:0,
    net:0
  }]
  for(const i of range(1,12)){
    const prev = report[i-1];
    const carryoverSold = prev.fractionalSold - prev.soldCustomers
    const fractionalSold = monthlySales + carryoverSold
    const soldCustomers = Math.floor(fractionalSold)

    const carryoverReferred = prev.fractionalReferred - prev.referredCustomers
    const fractionalReferred = referralRate * prev.totalCustomers + carryoverReferred
    const referredCustomers = Math.floor(fractionalReferred)

    const newCustomers = soldCustomers + referredCustomers

    const carryoverChurned = prev.fractionalChurned - prev.churnedCustomers
    const fractionalChurned = prev.totalCustomers * churnRate + carryoverChurned
    const churnedCustomers = Math.floor(fractionalChurned)

    const totalCustomers = prev.totalCustomers - churnedCustomers + newCustomers

    const oneTimeRevenue = soldCustomers * setupRevenue
    const recurringRevenue = totalCustomers * monthlyRevenue
    const costs = soldCustomers * setupCost + totalCustomers * monthlyCost
    const net = oneTimeRevenue + recurringRevenue - costs
    
    report[i] = {
      month: prev.month+1,
      fractionalSold: fractionalSold,
      soldCustomers: soldCustomers,
      fractionalReferred: fractionalReferred,
      referredCustomers: referredCustomers,
      newCustomers: newCustomers,
      fractionalChurned: fractionalChurned,
      churnedCustomers: churnedCustomers,
      totalCustomers: totalCustomers,
      oneTimeRevenue: oneTimeRevenue,
      recurringRevenue: recurringRevenue,
      costs: costs,
      net: net
    }
  }
  report = report.slice(1)
}
</script>

<table>
  <thead>
    <tr>
      <th class="row-label">Month</th>
      {#each report as month (month.month)}
        <th class="month">{month.month}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Sold customers</th>
      {#each report as month (month.month)}
        <td>{month.soldCustomers}</td>
      {/each}
    </tr>
    <tr>
      <th>Referred customers</th>
      {#each report as month (month.month)}
        <td>{month.referredCustomers}</td>
      {/each}
    </tr>
    <tr>
      <th>Total new customers</th>
      {#each report as month (month.month)}
        <td>{month.newCustomers}</td>
      {/each}
    </tr>
    <tr>
      <th>Churned customers</th>
      {#each report as month (month.month)}
        <td>{month.churnedCustomers}</td>
      {/each}
    </tr>
    <tr>
      <th>Total customers</th>
      {#each report as month (month.month)}
        <td>{month.totalCustomers}</td>
      {/each}
    </tr>
    <tr>
      <th>One-time revenue</th>
      {#each report as month (month.month)}
        <td>{dollars(month.oneTimeRevenue)}</td>
      {/each}
    </tr>
    <tr>
      <th>Recurring revenue</th>
      {#each report as month (month.month)}
        <td>{dollars(month.recurringRevenue)}</td>
      {/each}
    </tr>
    <tr>
      <th>Costs</th>
      {#each report as month (month.month)}
        <td>{dollars(month.costs)}</td>
      {/each}
    </tr>
    <tr>
      <th>Gross profit</th>
      {#each report as month (month.month)}
        <td>{dollars(month.net)}</td>
      {/each}
    </tr>
  </tbody>
</table>

<style>
table {
  width:100%;
  border-collapse: collapse;
  table-layout: fixed;
  display: table;
  border:none;
}
thead {
  border-bottom: solid 1px black;
}
thead th { text-align:right; border-radius:0; font-weight:500; }
thead th:first-child { text-align:left; }
tbody th { text-align: left; font-weight:500; }
tbody td { text-align: right; }
table th, table td {
  padding:0.4rem;
}
table th:first-child, table td:first-child {
  padding-left:0.8rem;
}
table th:last-child, table td:last-child {
  padding-right:0.8rem;
}
.row-label {
  width:10.5rem;
}
</style>