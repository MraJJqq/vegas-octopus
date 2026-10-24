/* Bitget public market-data adapters only. No account credentials and no order endpoints. */
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
  if (data.code !== "00000" || !data.data || !data.data[0]) throw new Error("Bitget spot quote unavailable");
  const row = data.data[0];
  const price = Number(row.lastPr);
  if (!Number.isFinite(price) || price <= 0) throw new Error("Invalid Bitget spot price");
  return { price, time: Number(row.ts || Date.now()), source: "Bitget spot" };
}

async function loadFuturesQuote(symbol) {
  const data = await fetchJson("https://api.bitget.com/api/v2/mix/market/ticker?productType=USDT-FUTURES&symbol=" + encodeURIComponent(symbol));
  const row = Array.isArray(data.data) ? data.data[0] : data.data;
  if (data.code !== "00000" || !row) throw new Error("Bitget USDT-FUTURES quote unavailable");
  const price = Number(row.lastPr || row.last);
  if (!Number.isFinite(price) || price <= 0) throw new Error("Invalid Bitget futures price");
  return { price, time: Number(row.ts || Date.now()), source: "Bitget USDT-FUTURES" };
}
