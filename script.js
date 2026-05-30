function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(value);
}

function formatMoney(value, currency = 'USD') {
  return `${currency} ${formatNumber(value, 0)}`;
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function calculateSalesTarget(input) {
  const currency = input.currency || 'USD';
  const profitGoal = toNumber(input.profitGoal);
  const fixedCosts = toNumber(input.fixedCosts);
  const variableCostRate = toNumber(input.variableCostRate);
  const averageOrderValue = toNumber(input.averageOrderValue);
  const workingDays = toNumber(input.workingDays);
  const conversionRate = toNumber(input.conversionRate);
  const staffCount = toNumber(input.staffCount);
  const warnings = [];

  if (profitGoal < 0 || fixedCosts < 0) warnings.push('Profit goal and fixed costs should not be negative.');
  if (variableCostRate < 0 || variableCostRate >= 1) warnings.push('Variable cost rate must be from 0% to below 100%.');
  if (averageOrderValue <= 0) warnings.push('Average order value must be greater than zero.');
  if (workingDays <= 0) warnings.push('Working days must be greater than zero.');
  if (conversionRate < 0 || conversionRate > 1) warnings.push('Conversion rate must be between 0% and 100%.');
  if (staffCount < 0) warnings.push('Staff count should not be negative.');

  const grossMarginRate = 1 - variableCostRate;
  if (warnings.length || grossMarginRate <= 0) {
    return { currency, warnings, error: warnings[0] || 'Invalid inputs.' };
  }

  const requiredRevenue = (profitGoal + fixedCosts) / grossMarginRate;
  const requiredOrders = requiredRevenue / averageOrderValue;
  const dailyRevenueTarget = requiredRevenue / workingDays;
  const dailyOrdersTarget = requiredOrders / workingDays;
  const requiredLeadsOrVisitors = conversionRate > 0 ? requiredOrders / conversionRate : null;
  const revenueTargetPerStaff = staffCount > 0 ? requiredRevenue / staffCount : null;

  if (!conversionRate) warnings.push('Conversion rate not provided; visitor/lead target is skipped.');
  if (!staffCount) warnings.push('Staff count not provided; per-staff target is skipped.');

  return {
    currency,
    grossMarginRate,
    requiredRevenue,
    requiredOrders,
    dailyRevenueTarget,
    dailyOrdersTarget,
    requiredLeadsOrVisitors,
    revenueTargetPerStaff,
    warnings
  };
}

function renderSalesTarget(result) {
  if (result.error) {
    return `<div class="error">${result.error}</div><ul>${result.warnings.map(w => `<li>${w}</li>`).join('')}</ul>`;
  }
  const rows = [
    ['Gross margin rate', `${formatNumber(result.grossMarginRate * 100, 1)}%`],
    ['Required revenue', formatMoney(result.requiredRevenue, result.currency)],
    ['Required orders', formatNumber(Math.ceil(result.requiredOrders), 0)],
    ['Daily revenue target', formatMoney(result.dailyRevenueTarget, result.currency)],
    ['Daily orders target', formatNumber(Math.ceil(result.dailyOrdersTarget), 0)]
  ];
  if (result.requiredLeadsOrVisitors !== null) rows.push(['Required leads/visitors', formatNumber(Math.ceil(result.requiredLeadsOrVisitors), 0)]);
  if (result.revenueTargetPerStaff !== null) rows.push(['Revenue target per staff', formatMoney(result.revenueTargetPerStaff, result.currency)]);
  const table = `<table class="result-table"><tbody>${rows.map(([k,v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</tbody></table>`;
  const warnings = result.warnings.length ? `<div class="warnings"><strong>Warnings:</strong><ul>${result.warnings.map(w => `<li>${w}</li>`).join('')}</ul></div>` : '';
  return table + warnings + '<p class="formula">Formula: required revenue = (profit goal + fixed costs) / (1 - variable cost rate).</p>';
}

if (typeof window !== 'undefined') {
  window.calculateSalesTarget = calculateSalesTarget;
  window.renderSalesTarget = renderSalesTarget;
  document.getElementById('sales-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const data = {
      currency: document.getElementById('currency').value.trim() || 'USD',
      profitGoal: document.getElementById('profitGoal').value,
      fixedCosts: document.getElementById('fixedCosts').value,
      variableCostRate: Number(document.getElementById('variableCostRate').value) / 100,
      averageOrderValue: document.getElementById('averageOrderValue').value,
      workingDays: document.getElementById('workingDays').value,
      conversionRate: Number(document.getElementById('conversionRate').value) / 100,
      staffCount: document.getElementById('staffCount').value
    };
    const result = calculateSalesTarget(data);
    document.getElementById('result').innerHTML = renderSalesTarget(result);
  });
}

if (typeof module !== 'undefined') {
  module.exports = { calculateSalesTarget, renderSalesTarget };
}
