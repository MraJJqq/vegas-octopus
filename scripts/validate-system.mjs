import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
const jsFiles = [
'assets/js/signals/v9-events.js','assets/js/core/market-universe.js','assets/js/core/market-data.js',
'assets/js/cards/card-view.js','assets/js/scroll/scroll-engine.js','assets/js/cards/card-system.js',
'assets/js/kline/kline-data.js','assets/js/kline/kline-chart.js','assets/js/kline/kline-controller.js',
'assets/js/signals/bottom-ticker.js'];
let failed=false; const fail=m=>{failed=true;console.error('FAIL:',m)};
for(const file of jsFiles){const r=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(r.status!==0)fail(file+': '+(r.stderr||r.stdout).trim())}
const read=p=>fs.readFileSync(p,'utf8');
const symbols=[...read('assets/js/core/market-universe.js').matchAll(/\['([A-Z]+)','([A-Z0-9]+)'\]/g)];
if(symbols.length!==27)fail('Expected 27 instruments; found '+symbols.length);
const market=read('assets/js/core/market-data.js');
if(!market.includes('/api/v3/market/candles?')||!market.includes('/api/v2/mix/market/candles?'))fail('Bitget spot/Mix endpoints missing');
const kline=read('assets/js/kline/kline-data.js');
if(!kline.includes('/api/v3/market/candles')||!kline.includes('/api/v2/mix/market/candles'))fail('K-line Bitget endpoints missing');
const card=read('assets/js/cards/card-system.js'),controller=read('assets/js/kline/kline-controller.js');
if(!card.includes('VegasLayer5ShowSymbol')||!card.includes('VegasLayer5SetAutoQueue'))fail('Card/K-line bridge missing');
if(!controller.includes('window.VegasLayer5ShowSymbol=selectSymbol')||!controller.includes('window.VegasLayer5SetAutoQueue=setQueue'))fail('K-line public contract missing');
const html=read('index.html');
for(const p of ['assets/js/signals/v9-events.js','assets/js/core/market-universe.js','assets/js/core/market-data.js','assets/js/cards/card-view.js','assets/js/scroll/scroll-engine.js','assets/js/cards/card-system.js','assets/js/kline/kline-data.js'])if(!html.includes(p))fail('Entry point missing '+p);
if(!html.includes("chart.src='./assets/js/kline/kline-chart.js")||!html.includes("app.src='./assets/js/kline/kline-controller.js"))fail('Dynamic K-line loader missing');
if(!failed)console.log('PASS: syntax, 27 instruments, Bitget endpoints, module paths and card/K-line contracts.');else process.exitCode=1;
