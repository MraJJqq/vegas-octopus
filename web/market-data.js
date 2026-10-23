/* Public market-data adapters. No account credentials and no order endpoints. */
const MARKET_TIMEOUT_MS = 9000;

async function fetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), MARKET_TIMEOUT_MS);
  try {
    const response = await fetch(url, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function loadQuote(symbol) {
  const data = await fetchJson("https://api.bitget.com/api/v2/spot/market/tickers?symbol=" + encodeURIComponent(symbol));
  if (data.code !== "00000" || !data.data || !data.data[0]) throw new Error("Bitget quote unavailable");
  const row = data.data[0];
  const price = Number(row.lastPr);
  if (!Number.isFinite(price) || price <= 0) throw new Error("Invalid Bitget price");
  return { price, time: Number(row.ts || Date.now()), source: "Bitget public spot" };
}

async function loadYahoo(symbol) {
  const encoded = encodeURIComponent(symbol);
  const urls = [
    "https://query1.finance.yahoo.com/v8/finance/chart/" + encoded + "?range=1d&interval=1m",
    "https://query2.finance.yahoo.com/v8/finance/chart/" + encoded + "?range=1d&interval=1m"
  ];
  let lastError;
  for (const url of urls) {
    try {
      const data = await fetchJson(url);
      const item = data.chart && data.chart.result && data.chart.result[0];
      const price = Number(item && item.meta && item.meta.regularMarketPrice);
      if (!item || !Number.isFinite(price) || price <= 0) throw new Error("Invalid Yahoo Finance quote");
      return {
        price,
        time: Number(item.meta.regularMarketTime || Date.now() / 1000) * 1000,
        source: "Yahoo Finance public feed"
      };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Public quote unavailable");
}
