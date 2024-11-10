
function getRange(values) {
  let min = values.reduce(minPredicate, Infinity);
  min = min == Infinity ? 0 : min;
  let max = values.reduce(maxPredicate, 0);
  max = max == min ? max + 1 : max;

  return [min, max];
}


function getPercentileRange(values) {
  values.sort();
  let lower = getPercentile(values, 0.05);
  let upper = getPercentile(values, 0.95);
  upper = upper == lower ? upper + 1 : upper;

  return [lower, upper];
}


function getPercentile(values, percentile) {
  percentile = percentile >= 0 && percentile <= 1 ? percentile : percentile / 100;
  const percentileIndex = parseInt(values.length * percentile);
  return values[percentileIndex];
}


function minPredicate(currentMin, currentVal) {
  return (currentVal < currentMin) ? currentVal : currentMin;
}

function maxPredicate(currentMax, currentVal) {
  return (currentVal > currentMax) ? currentVal : currentMax;
}


export {
  getRange,
  getPercentileRange,
}
