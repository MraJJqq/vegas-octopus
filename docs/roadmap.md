# VEGAS OCTOPUS — Development Roadmap

## 1. Project boundary
- Repository: `MraJJqq/vegas-octopus`.
- This is a standalone visualization project. All octopus UI code, assets, tests, data adapters, and workflows belong here.
- Do not modify the Vegas signal-system repository or alter any established Vegas trading rules.
- Phase one is a monitoring and visualization dashboard, not an auto-trading system.

## 2. Product goal
Build a premium, full-screen iPad trading cockpit with a high-end science-fiction atmosphere. It should combine readable real market/trading data with a visually rich, strongly biological mechanical-octopus animation language inspired by the user's reference image.

## 3. Screen composition
1. **Market header:** compact live quotes for major US equities and the tracked BTC, HYPE, gold, and crude-oil markets.
2. **Central creature stage:** several detailed mechanical octopuses with organic motion, metallic structures, articulated tentacles, and a neural-network-like environment.
3. **Signal and position panels:** actual Vegas signals, active positions/trade events, and their current states.
4. **Capital and performance panels:** account equity, available funds, realized/unrealized P&L, and an account equity curve when reliable data is available.
5. **Trade/event feed:** timestamped events that explain why an animation occurred.

The visual stage may be dramatic, but persistent text and essential numbers must remain legible. The layout is based on the user's selected Scheme A.

## 4. Animation rules
- Octopuses can roam between market zones occasionally; movement must not constantly obscure key data.
- When a confirmed real event shows a profitable outcome, the creature may grab/capture dollar coins.
- When a confirmed real event shows a loss, the creature may spit/release coins.
- Coin effects must be tied to real trade/P&L events. If demo data is used during development, label it clearly as simulated.
- Use layered motion (tentacle articulation, body drift, lighting, particles, coin trajectories, and restrained camera/parallax effects) for visual spectacle without sacrificing readability.
- Never imply a profit, trade, signal, or account balance that the source data does not support.

## 5. Data and reliability
- Prioritize real source/exchange data where available; keep each market adapter separate from the presentation layer.
- Display source timestamps and explicit loading, stale, disconnected, or unavailable states.
- Do not silently substitute fabricated values when an API fails.
- Keep API keys and tokens out of Git; use environment configuration or repository secrets.
- Do not place orders or execute trades. Any future order-execution capability would require a separate, explicit authorization and design decision.

## 6. Technical architecture
- **Presentation layer:** responsive iPad-first dashboard and full-screen visual scene.
- **Market adapters:** isolated connectors for each supported market/data source.
- **Trading-data adapter:** reads existing signal, position, trade, capital, and P&L data without changing the underlying trading logic.
- **Event layer:** normalizes timestamped market/trade/P&L events for the UI and animation system.
- **Animation controller:** receives normalized events and triggers creature/coin behaviors; it does not generate financial facts.
- **Tests:** validate event mapping, stale-data handling, error states, and the separation between real and simulated data.

Choose the implementation stack after confirming practical browser/iPad performance and data-source access. Keep data ingestion independent from rendering so visual work can proceed using clearly marked fixtures.

## 7. Delivery stages
### Stage 0 — Project specification
- Keep scope, visual direction, data principles, and the no-auto-trading boundary documented.
- Inventory the available real data sources and define their fields, refresh limits, and authentication requirements.

### Stage 1 — Static dashboard skeleton
- Implement the Scheme A screen layout and visual hierarchy.
- Establish the iPad full-screen sizing and readable market/signal/account panels.
- Use clearly labeled fixture data only until live adapters are verified.

### Stage 2 — Octopus visual prototype
- Build the central mechanical-octopus scene with organic, articulated motion.
- Add occasional travel between market zones and coin grab/spit effects.
- Confirm animations do not block important numbers or controls.

### Stage 3 — Live market data
- Connect the supported market feeds.
- Show source timestamps and loading/error/stale states.
- Test reconnect behavior and incomplete data.

### Stage 4 — Real trading and account data
- Connect the existing signal, position, trade, capital, and P&L records through read-only adapters.
- Preserve all established Vegas rules; this repository visualizes data rather than changing the trading system.
- Map validated profitable/loss events to coin animations.

### Stage 5 — Verification and polish
- Test iPad viewport sizes, performance, reconnection, data integrity, and event-to-animation mappings.
- Verify that demo data is always labeled and that no animation fabricates financial outcomes.
- Tune lighting, particles, movement, and transitions for a premium visual result.

## 8. Acceptance checklist
- [ ] All octopus project files and workflows are in `MraJJqq/vegas-octopus`.
- [ ] No octopus work changes the Vegas signal-system repository or trading rules.
- [ ] iPad full-screen layout is readable.
- [ ] Live data is timestamped and failures are visible.
- [ ] Signals, positions, funds, and P&L come from real sources once connected.
- [ ] Profit/loss animations only trigger from validated events; fixtures are labeled simulated.
- [ ] No automatic order placement.
- [ ] Secrets are not committed to the repository.

## 9. Current status
The repository currently contains the project README and design specification. This roadmap records the implementation sequence; live market feeds, trading/account adapters, and the animated dashboard are not yet confirmed as implemented.
