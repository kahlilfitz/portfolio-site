import React, { useState, useRef, useEffect } from "react";

// Mulberry32 — fast, high-quality 32-bit seeded PRNG
function mulberry32(seed) {
  return function() {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let z = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    z = z ^ (z + Math.imul(z ^ (z >>> 7), 61 | z));
    z = z ^ (z >>> 14);
    return (z >>> 0) / 0xFFFFFFFF;
  };
}

function cryptoSeed() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0];
}

function makeRollDice(rand) {
  return () => {
    const d1 = Math.floor(rand() * 6) + 1;
    const d2 = Math.floor(rand() * 6) + 1;
    return { d1, d2, total: d1 + d2 };
  };
}

const getOddsPayoutRatio = (point) => {
  if (point === 4 || point === 10) return 2;
  if (point === 5 || point === 9) return 1.5;
  if (point === 6 || point === 8) return 1.2;
  return 0;
};

const diePips = {
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[25, 25], [75, 25], [25, 75], [75, 75]],
  5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
  6: [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
};

function Die({ value, dieColor }) {
  const pips = diePips[value] || [];
  const themes = {
    green:  { glow: "drop-shadow(0 0 9px #3dca3d)",  face: "#1a3a1a", border: "#3dca3d", pip: "#6dca6d" },
    yellow: { glow: "drop-shadow(0 0 9px #d4af37)",  face: "#2a1e00", border: "#d4af37", pip: "#f5d76e" },
    red:    { glow: "drop-shadow(0 0 9px #cc3333)",  face: "#3a1010", border: "#cc3333", pip: "#e06060" },
    orange: { glow: "drop-shadow(0 0 9px #d4711a)",  face: "#2a1500", border: "#d4711a", pip: "#f0944a" },
    plain:  { glow: "drop-shadow(2px 3px 6px rgba(0,0,0,0.6))", face: "#f5f0e8", border: "#2a1a0a", pip: "#1a0a00" },
  };
  const t = themes[dieColor] || themes.plain;
  return (
    <svg width="44" height="44" viewBox="0 0 100 100" style={{ filter: t.glow, transition: "filter 0.3s" }}>
      <rect x="4" y="4" width="92" height="92" rx="16" ry="16" fill={t.face} stroke={t.border} strokeWidth="3" />
      {pips.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="8" fill={t.pip} />
      ))}
    </svg>
  );
}

function simulate({ passBet, odds410, odds59, odds68, seed, buyIn, stopAtProfit }) {
  const BUY_IN = buyIn;
  const MAX_ROLLS = 100;
  const rand = mulberry32(seed);
  const rollDice = makeRollDice(rand);

  const getOddsMult = (point) => {
    if (point === 4 || point === 10) return odds410;
    if (point === 5 || point === 9) return odds59;
    if (point === 6 || point === 8) return odds68;
    return 0;
  };

  let bankroll = BUY_IN;
  let highWater = BUY_IN;
  let highWaterRoll = 0;
  let rolls = [];
  let rollCount = 0;
  let point = null;
  let passLineBet = 0;
  let oddsBet = 0;
  let pastCap = false;
  let pointsMade = 0;

  while (bankroll >= passBet) {
    if (rollCount >= MAX_ROLLS) pastCap = true;

    if (point === null) {
      passLineBet = passBet;
      bankroll -= passBet;
      const roll = rollDice();
      rollCount++;

      if (roll.total === 7 || roll.total === 11) {
        bankroll += passLineBet * 2;
        rolls.push({ roll: rollCount, dice: roll, phase: "come-out", result: "WIN", detail: `Natural ${roll.total}`, bankroll, net: passLineBet, point: null, pastCap });
        passLineBet = 0;
      } else if ([2, 3, 12].includes(roll.total)) {
        rolls.push({ roll: rollCount, dice: roll, phase: "come-out", result: "LOSS", detail: `Craps ${roll.total}`, bankroll, net: -passLineBet, point: null, pastCap });
        passLineBet = 0;
      } else {
        point = roll.total;
        const mult = getOddsMult(point);
        oddsBet = Math.min(passBet * mult, bankroll);
        bankroll -= oddsBet;
        rolls.push({ roll: rollCount, dice: roll, phase: "come-out", result: "POINT", detail: `Point: ${point}`, bankroll, net: 0, point, oddsBet, pastCap });
      }
    } else {
      const roll = rollDice();
      rollCount++;

      if (roll.total === point) {
        const oddsWin = oddsBet * getOddsPayoutRatio(point);
        bankroll += passLineBet * 2 + oddsBet + oddsWin;
        const net = passLineBet + oddsWin;
        rolls.push({ roll: rollCount, dice: roll, phase: "point", result: "WIN", detail: `Made the ${point}!`, bankroll, net, point, pastCap });
        passLineBet = 0; oddsBet = 0; point = null; pointsMade++;
      } else if (roll.total === 7) {
        const lost = passLineBet + oddsBet;
        const net = bankroll - BUY_IN;
        const profitStop = stopAtProfit > 0 && net >= stopAtProfit;
        const detail = pastCap ? `Seven out — session closed` : profitStop ? `Seven out — profit target reached` : `Seven out`;
        rolls.push({ roll: rollCount, dice: roll, phase: "point", result: "LOSS", detail, bankroll, net: -lost, point, pastCap });
        passLineBet = 0; oddsBet = 0; point = null;
        if (bankroll > highWater) { highWater = bankroll; highWaterRoll = rollCount; }
        if (pastCap || profitStop) break;
      } else {
        rolls.push({ roll: rollCount, dice: roll, phase: "point", result: "NEUTRAL", detail: `${roll.total} — need ${point}`, bankroll, net: 0, point, pastCap });
      }
    }

    if (bankroll > highWater) { highWater = bankroll; highWaterRoll = rollCount; }
  }

  if (point !== null) bankroll += passLineBet + oddsBet;

  return { rolls, finalBankroll: bankroll, highWater, highWaterRoll, totalRolls: rollCount, netResult: bankroll - BUY_IN, seed, pointsMade };
}

function NumInput({ label, sublabel, value, onChange, min = 0, max = 100, step = 1 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
      <label style={{ fontFamily: "'Cinzel', serif", fontSize: "0.58rem", letterSpacing: "0.18em", color: "#5a8a5a", textTransform: "uppercase" }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 3, overflow: "hidden", background: "rgba(0,0,0,0.3)" }}>
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          style={{ background: "rgba(212,175,55,0.08)", border: "none", color: "#d4af37", width: 30, height: 38, cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.2)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.08)"}
        >−</button>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={e => {
            const v = Number(e.target.value);
            if (!isNaN(v) && v >= min && v <= max) onChange(v);
          }}
          style={{
            width: 52, height: 38, textAlign: "center", background: "transparent", border: "none",
            color: "#d4af37", fontFamily: "'Cinzel', serif", fontSize: "1rem", fontWeight: 700,
            outline: "none", MozAppearance: "textfield"
          }}
        />
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          style={{ background: "rgba(212,175,55,0.08)", border: "none", color: "#d4af37", width: 30, height: 38, cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.2)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.08)"}
        >+</button>
      </div>
      {sublabel && <div style={{ fontFamily: "'Crimson Text', serif", fontSize: "0.78rem", color: "#4a7a4a", fontStyle: "italic", minHeight: 18 }}>{sublabel}</div>}
    </div>
  );
}

export default function CrapsSession() {
  const [session, setSession] = useState(null);
  const [history, setHistory] = useState([]);
  const [view, setView] = useState("all");
  const tableRef = useRef(null);
  const historyRef = useRef(null);

  const [buyIn, setBuyIn] = useState(500);
  const [passBet, setPassBet] = useState(25);
  const [odds410, setOdds410] = useState(3);
  const [odds59, setOdds59] = useState(4);
  const [odds68, setOdds68] = useState(5);
  const [seedInput, setSeedInput] = useState("");
  const [lastSeed, setLastSeed] = useState(null);
  const [stopAtProfit, setStopAtProfit] = useState(0);
  const [autoRunCount, setAutoRunCount] = useState(1);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [sortCol, setSortCol] = useState("Num");
  const [sortDir, setSortDir] = useState("desc");
  const [intervalMs, setIntervalMs] = useState(1000);
  const [maxSessions, setMaxSessions] = useState(100);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);
  const sessionCountRef = useRef(0);
  const runLatest = useRef(null);

  const stopLoop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
  };

  const run = (replaySeed) => {
    const count = replaySeed ? 1 : autoRunCount;
    const currentCount = sessionCountRef.current;

    if (!replaySeed && maxSessions > 0 && currentCount >= maxSessions) {
      stopLoop();
      return;
    }

    const actualCount = (!replaySeed && maxSessions > 0)
      ? Math.min(count, maxSessions - currentCount)
      : count;

    const baseSessionNum = currentCount + 1;
    const newEntries = [];

    for (let i = 0; i < actualCount; i++) {
      const seed = replaySeed && i === 0 ? replaySeed :
                   i === 0 && seedInput.trim() !== "" ? parseInt(seedInput.trim()) >>> 0 :
                   cryptoSeed();
      const result = simulate({ passBet, odds410, odds59, odds68, seed, buyIn, stopAtProfit });
      newEntries.push({ ...result, sessionNum: baseSessionNum + i, passBet, odds410, odds59, odds68, buyIn });
    }

    const lastEntry = newEntries[newEntries.length - 1];
    setSession(lastEntry);
    setLastSeed(lastEntry.seed);
    if (!replaySeed) {
      setHistory(prev => [...prev, ...newEntries]);
      sessionCountRef.current += actualCount;
      if (maxSessions > 0 && sessionCountRef.current >= maxSessions) stopLoop();
    }
    setView("all");
  };

  // Always keep runLatest pointing at the freshest closure
  runLatest.current = run;

  const startLoop = () => {
    setRunning(true);
    runLatest.current();
    intervalRef.current = setInterval(() => runLatest.current(), intervalMs);
  };

  // Clean up interval on unmount
  useEffect(() => () => clearInterval(intervalRef.current), []);

  const filtered = session ? (
    view === "all" ? session.rolls :
    view === "decisive" ? session.rolls.filter(r => ["WIN","LOSS","POINT"].includes(r.result)) :
    session.rolls.filter(r => r.result !== "NEUTRAL")
  ) : [];

  const fmt = (n) => Math.round(n * 100) / 100;
  const maxExposure = passBet + Math.max(passBet * odds410, passBet * odds59, passBet * odds68);

  const sortKeyMap = { Num: "sessionNum", Pass: "passBet", Rolls: "totalRolls", Pts: "pointsMade", Peak: "highWater", Final: "finalBankroll", Net: "netResult" };
  const onSort = (col) => {
    if (col === "Odds") return;
    setSortCol(col);
    setSortDir(prev => sortCol === col && prev === "desc" ? "asc" : "desc");
  };
  const sortedHistory = [...history].sort((a, b) => {
    const key = sortKeyMap[sortCol];
    if (!key) return 0;
    return sortDir === "asc" ? a[key] - b[key] : b[key] - a[key];
  });
  const historyCols = [
    { key: "Num", label: "#" }, { key: "Pass", label: "Pass" }, { key: "Odds", label: "Odds" },
    { key: "Rolls", label: "Rolls" }, { key: "Pts", label: "Pts" }, { key: "Peak", label: "Peak" }, { key: "Final", label: "Final" }, { key: "Net", label: "Net" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d1a0e",
      backgroundImage: `
        radial-gradient(ellipse at 50% 0%, rgba(30,80,30,0.4) 0%, transparent 60%),
        repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.012) 40px, rgba(255,255,255,0.012) 41px),
        repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.012) 40px, rgba(255,255,255,0.012) 41px)
      `,
      fontFamily: "'Georgia', serif",
      color: "#e8dfc8",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        .roll-row { transition: background 0.2s; }
        .roll-row:hover { background: rgba(212,175,55,0.06) !important; }
        .btn-main {
          background: linear-gradient(135deg, #8b6914 0%, #d4af37 50%, #8b6914 100%);
          border: none; cursor: pointer; font-family: 'Cinzel', serif;
          font-size: 1.05rem; font-weight: 700; letter-spacing: 0.15em;
          padding: 15px 44px; color: #0d1a0e;
          clip-path: polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%);
          transition: all 0.2s; text-transform: uppercase;
        }
        .btn-main:hover { filter: brightness(1.2) drop-shadow(0 0 12px #d4af37aa); transform: scale(1.04); }
        .filter-btn { background: transparent; border: 1px solid #3a5a3a; color: #8ab88a; font-family: 'Crimson Text', serif; font-size: 0.9rem; padding: 6px 14px; cursor: pointer; transition: all 0.2s; border-radius: 2px; letter-spacing: 0.05em; }
        .filter-btn.active { background: rgba(212,175,55,0.15); border-color: #d4af37; color: #d4af37; }
        .filter-btn:hover { border-color: #d4af37aa; color: #d4af37aa; }
        .sparkline-bar { display: inline-block; width: 3px; border-radius: 1px; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d1a0e; }
        ::-webkit-scrollbar-thumb { background: #2a4a2a; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", padding: "48px 24px 28px", borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
        <div style={{ fontSize: "0.72rem", letterSpacing: "0.4em", color: "#6a9a6a", textTransform: "uppercase", fontFamily: "'Crimson Text', serif", marginBottom: 10 }}>
          ✦ Casino Floor Simulation ✦
        </div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, margin: 0, letterSpacing: "0.05em", color: "#d4af37", textShadow: "0 0 40px rgba(212,175,55,0.3)" }}>
          CRAPS TABLE
        </h1>
        <div style={{ marginTop: 10, fontFamily: "'Crimson Text', serif", color: "#8ab88a", fontSize: "0.95rem", letterSpacing: "0.08em" }}>
          ${buyIn} Buy-In &nbsp;·&nbsp; ${passBet} Pass Line &nbsp;·&nbsp; {odds410}/{odds59}/{odds68}× Odds &nbsp;·&nbsp; 100 Roll Cap{stopAtProfit > 0 ? ` · Stop +$${stopAtProfit}` : ""}
        </div>
      </div>

      {/* Config Panel */}
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 24px" }}>
        <div style={{
          border: "1px solid rgba(212,175,55,0.2)", borderRadius: 4,
          background: "rgba(0,0,0,0.22)", padding: "28px 36px",
          display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-end", justifyContent: "center"
        }}>

          {/* Buy-in */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.25em", color: "#4a7a4a", textTransform: "uppercase", marginBottom: 6 }}>Buy-In</div>
            <NumInput
              label="Starting Amount"
              value={buyIn}
              onChange={setBuyIn}
              min={25} max={10000} step={25}
              sublabel={`$${buyIn} starting bankroll`}
            />
          </div>

          <div style={{ width: 1, background: "rgba(212,175,55,0.15)", alignSelf: "stretch" }} />

          {/* Pass bet */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.25em", color: "#4a7a4a", textTransform: "uppercase", marginBottom: 6 }}>Pass Line</div>
            <NumInput
              label="Min Bet"
              value={passBet}
              onChange={setPassBet}
              min={5} max={500} step={5}
              sublabel={`$${passBet} per come-out`}
            />
          </div>

          <div style={{ width: 1, background: "rgba(212,175,55,0.15)", alignSelf: "stretch" }} />

          {/* Odds */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.25em", color: "#4a7a4a", textTransform: "uppercase", marginBottom: 4 }}>Pass Odds Multiplier</div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
              <NumInput
                label="4 & 10"
                value={odds410}
                onChange={setOdds410}
                min={0} max={20} step={1}
                sublabel={odds410 === 0 ? "No odds" : `$${passBet * odds410} → pays $${passBet * odds410 * 2}`}
              />
              <NumInput
                label="5 & 9"
                value={odds59}
                onChange={setOdds59}
                min={0} max={20} step={1}
                sublabel={odds59 === 0 ? "No odds" : `$${passBet * odds59} → pays $${passBet * odds59 * 1.5}`}
              />
              <NumInput
                label="6 & 8"
                value={odds68}
                onChange={setOdds68}
                min={0} max={20} step={1}
                sublabel={odds68 === 0 ? "No odds" : `$${passBet * odds68} → pays $${passBet * odds68 * 1.2}`}
              />
            </div>
          </div>

          <div style={{ width: 1, background: "rgba(212,175,55,0.15)", alignSelf: "stretch" }} />

          {/* Max exposure */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#4a7a4a", textTransform: "uppercase" }}>Max Exposure</div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.6rem", fontWeight: 700, color: "#d4af37", lineHeight: 1 }}>
              ${maxExposure}
            </div>
            <div style={{ fontFamily: "'Crimson Text', serif", fontSize: "0.78rem", color: "#4a7a4a", fontStyle: "italic", textAlign: "center" }}>worst-case<br/>per hand</div>
          </div>

          <div style={{ width: 1, background: "rgba(212,175,55,0.15)", alignSelf: "stretch" }} />

          {/* Stop at profit */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.25em", color: "#4a7a4a", textTransform: "uppercase", marginBottom: 6 }}>Stop at Profit</div>
            <NumInput
              label="On 7-Out"
              value={stopAtProfit}
              onChange={setStopAtProfit}
              min={0} max={10000} step={25}
              sublabel={stopAtProfit === 0 ? "Disabled" : `Stop if +$${stopAtProfit} on 7-out`}
            />
          </div>

          <div style={{ width: 1, background: "rgba(212,175,55,0.15)", alignSelf: "stretch" }} />

          {/* Auto-run sessions */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.25em", color: "#4a7a4a", textTransform: "uppercase", marginBottom: 6 }}>Auto-Run</div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
              <NumInput
                label="Sessions / Tick"
                value={autoRunCount}
                onChange={setAutoRunCount}
                min={1} max={100} step={1}
                sublabel={autoRunCount === 1 ? "1 session per tick" : `${autoRunCount} sessions per tick`}
              />
              <NumInput
                label="Every (ms)"
                value={intervalMs}
                onChange={setIntervalMs}
                min={100} max={60000} step={100}
                sublabel={`${intervalMs}ms between ticks`}
              />
              <NumInput
                label="Max Sessions"
                value={maxSessions}
                onChange={setMaxSessions}
                min={1} max={10000} step={1}
                sublabel={`Stop at ${maxSessions} total`}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Roll button + seed controls */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, paddingBottom: 36 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-main" onClick={() => run()} disabled={running} style={{ opacity: running ? 0.4 : 1 }}>
            {autoRunCount > 1 ? `Run ${autoRunCount} Sessions` : session ? "New Session" : "Roll the Bones"}
          </button>
          <button
            onClick={running ? stopLoop : startLoop}
            style={{
              background: running ? "rgba(202,109,109,0.15)" : "rgba(109,202,109,0.1)",
              border: `1px solid ${running ? "rgba(202,109,109,0.5)" : "rgba(109,202,109,0.4)"}`,
              color: running ? "#ca6d6d" : "#6dca6d",
              fontFamily: "'Cinzel', serif", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.12em", padding: "12px 24px", cursor: "pointer",
              borderRadius: 2, textTransform: "uppercase", transition: "all 0.2s"
            }}
          >
            {running ? "Stop Loop" : "Start Loop"}
          </button>
        </div>
        {running && (
          <div style={{ fontFamily: "'Crimson Text', serif", fontSize: "0.88rem", color: "#8ab88a", fontStyle: "italic" }}>
            {history.length} / {maxSessions} sessions · {intervalMs}ms between ticks
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {/* Seed input */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px solid rgba(212,175,55,0.2)", borderRadius: 3, overflow: "hidden", background: "rgba(0,0,0,0.25)" }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.58rem", letterSpacing: "0.15em", color: "#5a7a5a", textTransform: "uppercase", padding: "0 10px", borderRight: "1px solid rgba(212,175,55,0.15)" }}>Seed</span>
            <input
              type="text"
              placeholder="random"
              value={seedInput}
              onChange={e => setSeedInput(e.target.value)}
              style={{
                width: 110, height: 32, background: "transparent", border: "none",
                color: "#d4af37", fontFamily: "monospace", fontSize: "0.82rem",
                padding: "0 10px", outline: "none"
              }}
            />
          </div>

          {/* Show active seed + copy after a session */}
          {lastSeed !== null && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#6a8a6a" }}>
                last: <span style={{ color: "#d4af37" }}>{lastSeed}</span>
              </span>
              <button
                onClick={() => { navigator.clipboard.writeText(String(lastSeed)); }}
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)", color: "#d4af37", fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.12em", padding: "4px 10px", cursor: "pointer", borderRadius: 2, textTransform: "uppercase", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.22)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.1)"}
              >Copy</button>
              <button
                onClick={() => { setSeedInput(String(lastSeed)); run(lastSeed); }}
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)", color: "#d4af37", fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.12em", padding: "4px 10px", cursor: "pointer", borderRadius: 2, textTransform: "uppercase", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.22)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.1)"}
              >Replay</button>
            </div>
          )}
        </div>
        <div style={{ fontFamily: "'Crimson Text', serif", fontSize: "0.76rem", color: "#3a5a3a", fontStyle: "italic" }}>
          Seeded via crypto.getRandomValues() · paste a seed to replay any session
        </div>
      </div>

      {/* Aggregate Summary */}
      {history.length > 0 && (() => {
        const nets = history.map(s => s.netResult);
        const total = nets.reduce((a, b) => a + b, 0);
        const wins = nets.filter(n => n > 0).length;
        const winRate = (wins / nets.length) * 100;
        const avg = total / nets.length;
        const sorted = [...nets].sort((a, b) => a - b);
        const median = sorted.length % 2 === 0
          ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
          : sorted[Math.floor(sorted.length / 2)];

        // Histogram buckets
        const min = Math.min(...nets);
        const max = Math.max(...nets);
        const bucketCount = 12;
        const bucketSize = Math.max(25, Math.ceil((max - min) / bucketCount / 25) * 25);
        const bucketStart = Math.floor(min / bucketSize) * bucketSize;
        const buckets = [];
        for (let i = bucketStart; buckets.length < bucketCount + 2; i += bucketSize) {
          buckets.push({ lo: i, hi: i + bucketSize, count: 0 });
        }
        nets.forEach(n => {
          const b = buckets.find(b => n >= b.lo && n < b.hi);
          if (b) b.count++;
        });
        const trimmed = buckets.filter((b, i) => {
          if (b.count > 0) return true;
          const prev = buckets[i - 1];
          const next = buckets[i + 1];
          return (prev && prev.count > 0) || (next && next.count > 0);
        });
        const maxCount = Math.max(...trimmed.map(b => b.count));

        return (
          <div style={{ padding: "28px 24px", borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#5a8a5a", textTransform: "uppercase" }}>Summary</div>
              <div style={{ flex: 1, height: 1, background: "rgba(212,175,55,0.12)" }} />
            </div>

            {/* Stat cards */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28, justifyContent: "center" }}>
              {[
                { label: "Win Rate", value: `${winRate.toFixed(1)}%`, color: winRate >= 50 ? "#6dca6d" : "#ca6d6d" },
                { label: "Avg Net", value: avg >= 0 ? `+$${fmt(avg)}` : `-$${fmt(Math.abs(avg))}`, color: avg >= 0 ? "#6dca6d" : "#ca6d6d" },
                { label: "Median Net", value: median >= 0 ? `+$${fmt(median)}` : `-$${fmt(Math.abs(median))}`, color: median >= 0 ? "#6dca6d" : "#ca6d6d" },
                { label: "Total Net", value: total >= 0 ? `+$${fmt(total)}` : `-$${fmt(Math.abs(total))}`, color: total >= 0 ? "#6dca6d" : "#ca6d6d" },
                { label: "Best", value: `+$${fmt(Math.max(...nets))}`, color: "#6dca6d" },
                { label: "Worst", value: `${Math.min(...nets) >= 0 ? "+" : "-"}$${fmt(Math.abs(Math.min(...nets)))}`, color: "#ca6d6d" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{
                  flex: "1 1 100px", minWidth: 100, maxWidth: 160,
                  background: "rgba(0,0,0,0.25)", border: "1px solid rgba(212,175,55,0.15)",
                  borderRadius: 3, padding: "14px 16px", textAlign: "center"
                }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700, color }}>{value}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.18em", color: "#4a7a4a", textTransform: "uppercase", marginTop: 5 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Distribution histogram */}
            {trimmed.length > 1 && (
              <div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.58rem", letterSpacing: "0.18em", color: "#4a7a4a", textTransform: "uppercase", marginBottom: 10 }}>Outcome Distribution</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 72 }}>
                  {trimmed.map((b, i) => {
                    const height = maxCount > 0 ? Math.max(2, (b.count / maxCount) * 72) : 2;
                    const isProfit = b.lo >= 0;
                    const isLoss = b.hi <= 0;
                    const barColor = isProfit ? "rgba(109,202,109,0.65)" : isLoss ? "rgba(202,109,109,0.65)" : "rgba(212,175,55,0.5)";
                    const borderColor = isProfit ? "#6dca6d" : isLoss ? "#ca6d6d" : "#d4af37";
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%", justifyContent: "flex-end" }}>
                        {b.count > 0 && (
                          <div style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#5a7a5a", lineHeight: 1 }}>{b.count}</div>
                        )}
                        <div style={{
                          width: "100%", height, background: barColor,
                          border: `1px solid ${borderColor}`, borderRadius: "2px 2px 0 0",
                          opacity: b.count === 0 ? 0.15 : 1
                        }} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                  {trimmed.map((b, i) => (
                    <div key={i} style={{ flex: 1, textAlign: "center", fontFamily: "monospace", fontSize: "0.52rem", color: "#3a5a3a", lineHeight: 1.2 }}>
                      {b.lo >= 0 ? `+${b.lo}` : b.lo}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Session History Leaderboard */}
      {history.length > 0 && (() => {
        const bestNet = Math.max(...history.map(s => s.netResult));
        const bestPeak = Math.max(...history.map(s => s.highWater));
        return (
          <div ref={historyRef} style={{ borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => setHistoryOpen(o => !o)}
                style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "16px 16px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#5a8a5a", textTransform: "uppercase" }}>Session History</div>
                  <div style={{ flex: 1, height: 1, background: "rgba(212,175,55,0.12)" }} />
                  <div style={{ fontFamily: "'Crimson Text', serif", fontSize: "0.82rem", color: "#4a7a4a", fontStyle: "italic" }}>{history.length} session{history.length !== 1 ? "s" : ""}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", color: "#5a7a5a", marginLeft: 4 }}>{historyOpen ? "▲" : "▼"}</div>
                </div>
              </button>
              <button
                onClick={() => { setHistory([]); setSession(null); sessionCountRef.current = 0; stopLoop(); }}
                style={{ background: "transparent", border: "1px solid rgba(202,109,109,0.3)", color: "#8a5a5a", fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.12em", padding: "4px 10px", cursor: "pointer", borderRadius: 2, textTransform: "uppercase", transition: "all 0.15s", marginRight: 16, flexShrink: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(202,109,109,0.7)"; e.currentTarget.style.color = "#ca6d6d"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(202,109,109,0.3)"; e.currentTarget.style.color = "#8a5a5a"; }}
              >Clear</button>
            </div>
            {historyOpen && <div style={{ padding: "0 16px 24px" }}>
              <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
                    {historyCols.map(({ key, label }) => {
                      const active = sortCol === key;
                      const sortable = key !== "Odds";
                      return (
                        <th
                          key={key}
                          onClick={() => onSort(key)}
                          style={{
                            fontFamily: "'Cinzel', serif", fontSize: "0.58rem", letterSpacing: "0.18em",
                            color: active ? "#d4af37" : "#4a7a4a", textTransform: "uppercase",
                            padding: "7px 10px", textAlign: key === "Num" ? "center" : "left",
                            fontWeight: active ? 700 : 400, cursor: sortable ? "pointer" : "default",
                            userSelect: "none", whiteSpace: "nowrap",
                            transition: "color 0.15s"
                          }}
                        >
                          {label}{active ? (sortDir === "asc" ? " ▲" : " ▼") : sortable ? " ·" : ""}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {sortedHistory.slice(0, 20).map((s, ri) => {
                    const isBestNet = s.netResult === bestNet;
                    const isBestPeak = s.highWater === bestPeak;
                    const isCurrent = s.sessionNum === session?.sessionNum;
                    return (
                      <tr key={s.sessionNum} onClick={() => { setSession(s); setView("all"); }} style={{
                        background: isCurrent ? "rgba(212,175,55,0.07)" : ri % 2 === 0 ? "rgba(255,255,255,0.012)" : "transparent",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        transition: "background 0.2s", cursor: "pointer"
                      }}>
                        <td style={{ padding: "8px 10px", textAlign: "center", fontFamily: "'Cinzel', serif", fontSize: "0.78rem", color: isCurrent ? "#d4af37" : "#4a7a4a" }}>
                          {isCurrent ? "▶" : ""}{s.sessionNum}
                        </td>
                        <td style={{ padding: "8px 10px", fontFamily: "'Crimson Text', serif", fontSize: "0.85rem", color: "#8ab88a" }}>${s.passBet}</td>
                        <td style={{ padding: "8px 10px", fontFamily: "'Crimson Text', serif", fontSize: "0.85rem", color: "#6a8a6a" }}>{s.odds410}/{s.odds59}/{s.odds68}×</td>
                        <td style={{ padding: "8px 10px", fontFamily: "'Crimson Text', serif", fontSize: "0.85rem", color: "#6a8a6a" }}>{s.totalRolls}</td>
                        <td style={{ padding: "8px 10px", fontFamily: "'Crimson Text', serif", fontSize: "0.85rem", color: "#8ab88a" }}>{s.pointsMade ?? "—"}</td>
                        <td style={{ padding: "8px 10px", fontFamily: "'Cinzel', serif", fontSize: "0.88rem", position: "relative" }}>
                          <span style={{ color: isBestPeak ? "#d4af37" : "#a0b890" }}>
                            ${s.highWater}
                          </span>
                          <span style={{ marginLeft: 6, fontFamily: "'Crimson Text', serif", fontSize: "0.76rem", color: "#5a7a5a", fontStyle: "italic" }}>r{s.highWaterRoll}</span>
                          {isBestPeak && <span style={{ marginLeft: 6, fontSize: "0.6rem", letterSpacing: "0.1em", color: "#d4af37", fontFamily: "'Cinzel', serif", verticalAlign: "middle" }}>★ BEST</span>}
                        </td>
                        <td style={{ padding: "8px 10px", fontFamily: "'Cinzel', serif", fontSize: "0.88rem", color: s.finalBankroll >= 500 ? "#c8dfa8" : "#bf8f7f" }}>${fmt(s.finalBankroll)}</td>
                        <td style={{ padding: "8px 10px", fontFamily: "'Crimson Text', serif", fontSize: "0.9rem", fontWeight: 600, position: "relative" }}>
                          <span style={{ color: isBestNet ? "#6dca6d" : s.netResult >= 0 ? "#5dba5d" : "#ca6d6d" }}>
                            {s.netResult >= 0 ? `+$${fmt(s.netResult)}` : `-$${fmt(Math.abs(s.netResult))}`}
                          </span>
                          {isBestNet && <span style={{ marginLeft: 6, fontSize: "0.6rem", letterSpacing: "0.1em", color: "#6dca6d", fontFamily: "'Cinzel', serif", verticalAlign: "middle" }}>★ BEST</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  {(() => {
                    const total = history.reduce((sum, s) => sum + s.netResult, 0);
                    const color = total > 0 ? "#6dca6d" : total < 0 ? "#ca6d6d" : "#5a7a5a";
                    return (
                      <tr style={{ borderTop: "1px solid rgba(212,175,55,0.25)" }}>
                        <td colSpan={7} style={{ padding: "10px 10px", fontFamily: "'Cinzel', serif", fontSize: "0.58rem", letterSpacing: "0.18em", color: "#5a8a5a", textTransform: "uppercase" }}>
                          All-time Total
                        </td>
                        <td style={{ padding: "10px 10px", fontFamily: "'Cinzel', serif", fontSize: "0.95rem", fontWeight: 700, color }}>
                          {total > 0 ? `+$${fmt(total)}` : total < 0 ? `-$${fmt(Math.abs(total))}` : "—"}
                        </td>
                      </tr>
                    );
                  })()}
                </tfoot>
              </table>
            </div>
            {history.length > 20 && (
              <div style={{ fontFamily: "'Crimson Text', serif", fontSize: "0.78rem", color: "#3a5a3a", fontStyle: "italic", textAlign: "center", paddingTop: 10 }}>
                showing 20 of {history.length} sessions
              </div>
            )}
            </div>}
          </div>
        );
      })()}

      {/* Results */}
      {session && (
        <>
          {/* Summary cards */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 1, borderTop: "1px solid rgba(212,175,55,0.15)", borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
            {[
              { label: "Buy-In", value: "$500", sub: "starting stack" },
              { label: "Peak Stack", value: `$${session.highWater}`, sub: `+$${session.highWater - 500} · roll #${session.highWaterRoll}`, highlight: true },
              { label: "Final Stack", value: `$${fmt(session.finalBankroll)}`, sub: session.netResult >= 0 ? `up $${fmt(session.netResult)}` : `down $${fmt(Math.abs(session.netResult))}`, win: session.netResult >= 0 },
              { label: "Rolls", value: session.totalRolls, sub: "total dice rolls" },
            ].map(({ label, value, sub, highlight, win }) => (
              <div key={label} style={{
                flex: "1 1 140px", padding: "26px 20px", textAlign: "center",
                background: highlight ? "rgba(212,175,55,0.07)" : "rgba(255,255,255,0.02)",
                borderRight: "1px solid rgba(212,175,55,0.1)", position: "relative"
              }}>
                {highlight && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "40%", height: "2px", background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />}
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.5rem", fontWeight: 700,
                  color: highlight ? "#d4af37" : win === true ? "#6dca6d" : win === false ? "#ca6d6d" : "#e8dfc8"
                }}>{value}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#5a8a5a", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
                <div style={{ fontFamily: "'Crimson Text', serif", fontSize: "0.8rem", color: "#6a8a6a", marginTop: 5, fontStyle: "italic" }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Sparkline */}
          <div style={{ padding: "18px 32px 14px", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
            <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: "#4a7a4a", textTransform: "uppercase", fontFamily: "'Cinzel', serif", marginBottom: 10 }}>Bankroll Arc</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 48, overflow: "hidden" }}>
              {session.rolls.map((r, i) => {
                const minB = Math.min(...session.rolls.map(x => x.bankroll));
                const maxB = Math.max(...session.rolls.map(x => x.bankroll));
                const range = maxB - minB || 1;
                const h = Math.max(4, ((r.bankroll - minB) / range) * 44);
                return <div key={i} className="sparkline-bar" style={{ height: h, background: r.bankroll >= 500 ? "#d4af37" : "#8b4444", opacity: 0.6 + (i / session.rolls.length) * 0.4 }} />;
              })}
            </div>
          </div>

          {/* Roll log */}
          <div ref={tableRef} style={{ padding: "24px 16px 60px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.2em", color: "#5a8a5a", textTransform: "uppercase" }}>Roll Log</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[["all","All Rolls"],["decisive","Key Moments"],["actions","Decisions"]].map(([v, label]) => (
                  <button key={v} className={`filter-btn ${view === v ? "active" : ""}`} onClick={() => setView(v)}>{label}</button>
                ))}
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.25)" }}>
                    {["#","Dice","Total","Phase","Event","Stack","Net"].map(h => (
                      <th key={h} style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.18em", color: "#5a8a5a", textTransform: "uppercase", padding: "8px 12px", textAlign: h === "#" ? "center" : "left", fontWeight: 400 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.reduce((acc, r, i) => {
                    const isWin = r.result === "WIN";
                    const isLoss = r.result === "LOSS";
                    const isPoint = r.result === "POINT";
                    const isFirstPastCap = r.pastCap && (i === 0 || !filtered[i - 1]?.pastCap);
                    const isPeak = r.roll === session.highWaterRoll;
                    const resultColor = isWin ? "#6dca6d" : isLoss ? "#ca6d6d" : isPoint ? "#d4af37" : "#7a9a7a";

                    if (isFirstPastCap) {
                      acc.push(
                        <tr key={`cap-${r.roll}`}>
                          <td colSpan={7} aria-label="Roll cap separator" style={{ padding: "10px 12px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #d4af37)" }} />
                              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.58rem", letterSpacing: "0.2em", color: "#d4af37", textTransform: "uppercase", whiteSpace: "nowrap" }}>⟡ Roll 100 — Riding to 7-Out ⟡</span>
                              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #d4af37, transparent)" }} />
                            </div>
                          </td>
                        </tr>
                      );
                    }

                    acc.push(
                      <tr key={r.roll} className="roll-row" style={{
                        background: isPeak ? "rgba(212,175,55,0.11)" : r.pastCap ? "rgba(212,175,55,0.04)" : i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                        borderBottom: isPeak ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(255,255,255,0.04)",
                        boxShadow: isPeak ? "inset 3px 0 0 #d4af37" : "none"
                      }}>
                        <td style={{ padding: "9px 12px", textAlign: "center", fontFamily: "'Crimson Text', serif", color: r.pastCap ? "#9a8a4a" : "#4a7a4a", fontSize: "0.85rem" }}>{r.roll}</td>
                        <td style={{ padding: "9px 12px" }}>
                          <div style={{ display: "flex", gap: 4 }}>
                            <Die value={r.dice.d1} dieColor={isWin ? "green" : isPoint ? "yellow" : (isLoss && r.phase === "point" && r.dice.total === 7) ? "red" : (isLoss && r.phase === "come-out") ? "orange" : "plain"} />
                            <Die value={r.dice.d2} dieColor={isWin ? "green" : isPoint ? "yellow" : (isLoss && r.phase === "point" && r.dice.total === 7) ? "red" : (isLoss && r.phase === "come-out") ? "orange" : "plain"} />
                          </div>
                        </td>
                        <td style={{ padding: "9px 12px", fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700,
                          color: r.dice.total === 7 && r.phase === "point" ? "#ca6d6d"
                               : (r.dice.total === 7 || r.dice.total === 11) && r.phase === "come-out" ? "#6dca6d"
                               : "#e8dfc8"
                        }}>{r.dice.total}</td>
                        <td style={{ padding: "9px 12px" }}>
                          <span style={{ fontFamily: "'Crimson Text', serif", fontSize: "0.76rem", letterSpacing: "0.08em", color: r.phase === "come-out" ? "#8ab88a" : "#8a9aba", textTransform: "uppercase" }}>
                            {r.phase === "come-out" ? "Come-Out" : r.point ? `Point: ${r.point}` : "—"}
                          </span>
                        </td>
                        <td style={{ padding: "9px 12px", fontFamily: "'Crimson Text', serif", color: resultColor, fontSize: "0.95rem" }}>
                          {r.detail}
                          {isPeak && <span style={{ marginLeft: 8, fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.15em", color: "#d4af37", verticalAlign: "middle", border: "1px solid rgba(212,175,55,0.5)", padding: "1px 5px", borderRadius: 2 }}>PEAK</span>}
                        </td>
                        <td style={{ padding: "9px 12px", fontFamily: "'Cinzel', serif", fontSize: "0.92rem", color: r.bankroll >= 500 ? "#c8dfa8" : "#bf8f7f" }}>${fmt(r.bankroll)}</td>
                        <td style={{ padding: "9px 12px", fontFamily: "'Crimson Text', serif", fontSize: "0.95rem",
                          color: r.net > 0 ? "#6dca6d" : r.net < 0 ? "#ca6d6d" : "#5a7a5a",
                          fontWeight: r.net !== 0 ? 600 : 400
                        }}>
                          {r.net > 0 ? `+$${fmt(r.net)}` : r.net < 0 ? `-$${fmt(Math.abs(r.net))}` : "—"}
                        </td>
                      </tr>
                    );
                    return acc;
                  }, [])}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
