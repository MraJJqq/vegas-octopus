async function loadQuote(symbol) {
  const response = await fetch("https://api.bitget.com/api/v2/spot/market/tickers?symbol=" + encodeURIComponent(symbol), {cache:"no-store"});
  if (!response.ok) throw new Error("HTTP " + response.status);
  const data = await response.json();
  if (data.code !== "00000" || !data.data || !data.data[0]) throw new Error("Quote unavailable");
  return {price:Number(data.data[0].lastPr), time:Number(data.data[0].ts || Date.now()), source:"Bitget"};
}
async function loadYahoo(symbol) {
  const response = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(symbol) + "?range=1d&interval=1m", {cache:"no-store"});
  if (!response.ok) throw new Error("HTTP " + response.status);
  const data = await response.json();
  const item = data.chart && data.chart.result && data.chart.result[0];
  if (!item || !Number.isFinite(item.meta.regularMarketPrice)) throw new Error("Quote unavailable");
  return {price:item.meta.regularMarketPrice, time:(item.meta.regularMarketTime || Date.now()/1000)*1000, source:"Yahoo Finance"};
}
