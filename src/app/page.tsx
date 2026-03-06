'use client';
import { useEffect, useRef } from 'react';

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !containerRef.current) return;
    initialized.current = true;

    const style = document.createElement('style');
    style.setAttribute('data-v11', 'true');
    style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  :root{
    --coral:#D53842;--rose:#DF656E;--maroon:#7C0F11;--crimson:#C61F25;--cherry:#D22028;
    --bg:#140a0b;--text:#fff;--text-2:#d4b8b8;--text-3:#7a5555;--text-muted:#5a3838;
    --mono:'JetBrains Mono',monospace;--body:'Plus Jakarta Sans',sans-serif;--display:'Orbitron',sans-serif;
  }
  body{
    font-family:var(--body);background:var(--bg);color:var(--text);height:100vh;overflow:hidden;
    background-image:
      radial-gradient(ellipse at 20% 25%,rgba(213,56,66,.1) 0%,transparent 50%),
      radial-gradient(ellipse at 75% 55%,rgba(198,31,37,.08) 0%,transparent 45%),
      radial-gradient(ellipse at 50% 5%,rgba(223,101,110,.06) 0%,transparent 40%),
      radial-gradient(ellipse at 40% 85%,rgba(124,15,17,.08) 0%,transparent 40%),
      radial-gradient(ellipse at 90% 20%,rgba(223,101,110,.04) 0%,transparent 35%);
  }
  .icon{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;}
  .icon svg{fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}
  .icon-xs svg{width:13px;height:13px;}.icon-sm svg{width:15px;height:15px;}.icon-md svg{width:17px;height:17px;}

  .glass{
    position:relative;overflow:hidden;border-radius:14px;
    background:linear-gradient(135deg,rgba(213,56,66,.07),rgba(160,30,40,.05) 50%,rgba(210,32,40,.03));
    backdrop-filter:blur(40px) saturate(1.5);-webkit-backdrop-filter:blur(40px) saturate(1.5);
    border:1px solid rgba(223,101,110,.16);
    box-shadow:inset 0 1px 0 rgba(255,180,170,.12),inset 0 2px 10px rgba(223,101,110,.05),
      inset 0 -3px 14px rgba(0,0,0,.3),inset 0 -1px 0 rgba(0,0,0,.12),
      0 10px 40px rgba(0,0,0,.25),0 2px 8px rgba(80,10,12,.15);
  }
  .glass::before{content:'';position:absolute;top:0;left:8%;right:8%;height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,180,170,.2),rgba(223,101,110,.15),transparent);z-index:1;}
  .glass::after{content:'';position:absolute;top:0;left:0;right:0;height:45%;
    background:linear-gradient(180deg,rgba(255,180,170,.03),transparent);pointer-events:none;z-index:0;}
  .glass>*{position:relative;z-index:1;}
  .glass-elevated{
    background:linear-gradient(135deg,rgba(213,56,66,.1),rgba(180,30,40,.07) 50%,rgba(124,15,17,.05));
    border-color:rgba(223,101,110,.2);
    box-shadow:inset 0 1px 0 rgba(255,180,170,.15),inset 0 2px 14px rgba(223,101,110,.06),
      inset 0 -3px 18px rgba(0,0,0,.35),0 14px 48px rgba(0,0,0,.3),0 4px 14px rgba(80,10,12,.12);
  }
  .label{font-family:var(--display);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2.5px;color:var(--text-3);display:flex;align-items:center;gap:6px;}

  .shell{display:grid;grid-template-rows:48px 52px 1fr 40px;height:100vh;padding:12px;gap:8px;}

  /* TOP BAR */
  .topbar{display:flex;align-items:center;padding:0 16px;gap:12px;z-index:100;}
  .tb-brand{display:flex;align-items:center;gap:10px;flex-shrink:0;}
  .tb-logo{font-family:var(--display);font-size:20px;font-weight:900;color:#fff;letter-spacing:3px;}
  .tb-title{font-family:var(--display);font-size:8px;font-weight:600;text-transform:uppercase;letter-spacing:3px;color:var(--text-3);}
  .tb-div{width:1px;height:20px;background:rgba(223,101,110,.15);flex-shrink:0;}
  .tb-nav{display:flex;gap:2px;flex:1;background:rgba(124,15,17,.06);border:1px solid rgba(223,101,110,.06);border-radius:10px;padding:3px;}
  a.tb-nav-item{text-decoration:none;}
  .tb-nav-item{display:flex;align-items:center;gap:5px;padding:6px 12px;border-radius:8px;font-family:var(--body);font-size:12px;font-weight:600;color:var(--text-3);cursor:pointer;transition:all .2s;white-space:nowrap;flex-shrink:0;}
  .tb-nav-item:hover{color:var(--text-2);}
  .tb-nav-item.active{background:linear-gradient(135deg,rgba(213,56,66,.15),rgba(198,31,37,.1));color:#fff;border:1px solid rgba(223,101,110,.15);box-shadow:inset 0 1px 0 rgba(255,180,170,.08),0 2px 8px rgba(124,15,17,.1);}

  /* BTC TICKER */
  .btc-ticker{
    display:flex;align-items:center;gap:6px;flex-shrink:0;
    padding:4px 12px;border-radius:8px;
    background:rgba(124,15,17,.06);border:1px solid rgba(223,101,110,.06);
    font-family:var(--mono);font-size:11px;color:var(--text-2);
  }
  .btc-icon{color:#f7931a;font-weight:700;font-size:13px;}
  .btc-price{font-weight:700;color:#fff;}
  .btc-change{font-size:10px;}
  .btc-change.up{color:#3ecf8e;}
  .btc-change.down{color:var(--cherry);}
  .btc-chart{display:flex;align-items:flex-end;gap:1px;height:14px;}
  .btc-bar{width:2px;border-radius:1px;background:rgba(247,147,26,.4);transition:height .3s;}

  /* ANALYTICS BAR */
  .analytics-bar{display:flex;align-items:center;padding:0 24px;gap:0;justify-content:center;}
  .ab-stats{display:flex;align-items:center;gap:0;flex:1;}
  .ab-stat{display:flex;align-items:center;gap:12px;padding:0 22px;border-right:1px solid rgba(223,101,110,.08);}
  .ab-stat:last-child{border:none;}
  .ab-icon{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,rgba(213,56,66,.12),rgba(124,15,17,.08));border:1px solid rgba(223,101,110,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--cherry);}
  .ab-icon svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}
  .ab-val{font-family:var(--display);font-size:16px;font-weight:800;color:#fff;line-height:1;}
  .ab-lbl{font-family:var(--body);font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:var(--text-3);margin-top:4px;}
  .ab-controls{display:flex;gap:8px;align-items:center;flex-shrink:0;}
  .period-toggle{display:flex;border-radius:7px;overflow:hidden;border:1px solid rgba(223,101,110,.1);background:rgba(124,15,17,.04);}
  .period-btn{padding:6px 11px;font-family:var(--body);font-size:10px;font-weight:600;color:var(--text-3);cursor:pointer;transition:all .2s;border:none;background:none;}
  .period-btn.active{background:linear-gradient(135deg,rgba(213,56,66,.15),rgba(198,31,37,.1));color:#fff;}
  .panel[data-href]{cursor:pointer;transition:border-color .2s,box-shadow .2s;}
  .panel[data-href]:hover{border-color:rgba(223,101,110,.25);box-shadow:inset 0 1px 0 rgba(255,180,170,.18),0 14px 48px rgba(0,0,0,.35);}
  .cal-panel[data-href]{cursor:pointer;transition:border-color .2s;}
  .cal-panel[data-href]:hover{border-color:rgba(223,101,110,.25);}
  a.glass-btn{text-decoration:none;}
  .glass-btn{display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border-radius:7px;border:1px solid rgba(223,101,110,.12);background:linear-gradient(135deg,rgba(213,56,66,.08),rgba(198,31,37,.04));color:var(--cherry);font-family:var(--body);font-size:11px;font-weight:600;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,180,170,.06);transition:all .2s;white-space:nowrap;}

  /* MAIN */
  .main{display:grid;grid-template-columns:2fr 2fr 1.4fr;grid-template-rows:1fr 1fr 1.2fr;gap:8px;overflow:hidden;min-height:0;}
  .panel{padding:14px 16px;display:flex;flex-direction:column;min-height:0;}
  .panel-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}

  /* TASKS */
  .task-list{display:flex;flex-direction:column;gap:1px;flex:1;overflow:hidden;}
  .task-item{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(223,101,110,.04);font-size:13px;}
  .task-item:last-child{border:none;}
  .tc{width:16px;height:16px;border-radius:4px;border:1.5px solid rgba(223,101,110,.15);flex-shrink:0;display:flex;align-items:center;justify-content:center;}
  .tc.done{background:rgba(210,32,40,.15);border-color:var(--cherry);}
  .tc.done::after{content:'✓';font-size:10px;color:var(--cherry);}
  .tt{color:var(--text-2);flex:1;}.tt.done{text-decoration:line-through;color:var(--text-muted);}
  .ttag{font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:5px;font-weight:700;flex-shrink:0;}
  .ttag.u{background:rgba(210,32,40,.1);color:var(--cherry);border:1px solid rgba(210,32,40,.12);}
  .ttag.d{background:rgba(223,101,110,.06);color:var(--rose);border:1px solid rgba(223,101,110,.08);}
  .ttag.v{background:rgba(124,15,17,.08);color:var(--text-2);border:1px solid rgba(124,15,17,.12);}

  /* CLIENTS */
  .client-list{display:flex;flex-direction:column;gap:6px;flex:1;overflow:hidden;}
  .client-item{display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:8px;background:rgba(124,15,17,.04);border:1px solid rgba(223,101,110,.04);}
  .cl-logo{width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,rgba(213,56,66,.08),rgba(124,15,17,.05));border:1px solid rgba(223,101,110,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .cl-logo svg{width:20px;height:20px;}
  .cl-info{flex:1;}.cl-name{font-size:14px;font-weight:600;color:var(--text);}.cl-type{font-size:10px;color:var(--text-3);margin-top:2px;}.cl-service{font-size:9px;color:var(--rose);margin-top:1px;font-style:italic;}
  .cl-right{text-align:right;flex-shrink:0;}.cl-status{font-family:var(--mono);font-size:10px;}.cl-status.active{color:var(--cherry);}.cl-value{font-family:var(--mono);font-size:11px;color:var(--text-3);margin-top:2px;}

  /* LEADS */
  .lead-list{display:flex;flex-direction:column;gap:5px;flex:1;overflow:hidden;}
  .lead-item{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:8px;background:rgba(124,15,17,.04);border:1px solid rgba(223,101,110,.04);}
  .ld-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
  .ld-dot.hot{background:var(--cherry);box-shadow:0 0 6px rgba(210,32,40,.4);}
  .ld-dot.warm{background:var(--rose);}.ld-dot.cold{background:var(--text-3);}
  .ld-info{flex:1;}.ld-name{font-size:13px;font-weight:600;color:var(--text);}.ld-src{font-size:10px;color:var(--text-3);margin-top:1px;}
  .ld-val{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--text);flex-shrink:0;}

  /* DEADLINES */
  .dl-list{display:flex;flex-direction:column;gap:4px;flex:1;overflow:hidden;}
  .dl-item{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(223,101,110,.04);font-size:12px;}
  .dl-item:last-child{border:none;}
  .dl-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
  .dl-dot.soon{background:var(--cherry);box-shadow:0 0 6px rgba(210,32,40,.4);}.dl-dot.later{background:var(--text-3);}
  .dl-date{font-family:var(--mono);font-size:11px;color:var(--text-3);width:48px;flex-shrink:0;}.dl-date.soon{color:var(--cherry);}
  .dl-text{color:var(--text-2);flex:1;}.dl-proj{font-family:var(--mono);font-size:9px;color:var(--text-muted);flex-shrink:0;}

  /* CALENDAR — bigger, 50/50 */
  .cal-panel{grid-row:span 2;display:flex;flex-direction:column;}
  .cal-top{flex:1;display:flex;flex-direction:column;padding:14px 16px 0;}
  .cal-bottom{flex:1;display:flex;flex-direction:column;padding:0 16px 14px;border-top:1px solid rgba(223,101,110,.06);}
  .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;flex:1;align-content:center;}
  .cal-head{font-family:var(--display);font-size:9px;color:var(--text-muted);text-align:center;padding:4px 0;letter-spacing:1px;}
  .cal-day{display:flex;align-items:center;justify-content:center;border-radius:6px;font-family:var(--body);font-size:13px;font-weight:500;color:var(--text-3);cursor:pointer;position:relative;padding:6px 0;}
  .cal-day.today{background:linear-gradient(135deg,rgba(213,56,66,.18),rgba(198,31,37,.12));color:#fff;font-weight:700;border:1px solid rgba(223,101,110,.2);box-shadow:0 0 10px rgba(210,32,40,.12);}
  .cal-day.has-event{color:var(--text);font-weight:600;}
  .cal-day.has-event::after{content:'';position:absolute;bottom:2px;width:4px;height:4px;border-radius:50%;background:var(--cherry);}
  .cal-day.other{color:var(--text-muted);}
  .event-list{display:flex;flex-direction:column;gap:4px;flex:1;overflow-y:auto;}
  .event-item{display:flex;align-items:flex-start;gap:7px;padding:6px 8px;border-radius:7px;background:rgba(124,15,17,.04);border:1px solid rgba(223,101,110,.04);}
  .ev-dot{width:5px;height:5px;border-radius:50%;margin-top:5px;flex-shrink:0;}
  .ev-dot.hot{background:var(--cherry);box-shadow:0 0 6px rgba(210,32,40,.4);}.ev-dot.warm{background:var(--rose);}.ev-dot.cool{background:var(--text-3);}
  .ev-info{flex:1;}.ev-title{font-size:12px;font-weight:600;color:var(--text);}.ev-time{font-family:var(--mono);font-size:9px;color:var(--text-3);margin-top:1px;}
  .ev-date{font-family:var(--mono);font-size:9px;color:var(--text-muted);flex-shrink:0;}

  /* PIXEL OFFICE */
  .pixel-office{flex:1;border-radius:10px;overflow:hidden;background:#0d0607;border:1px solid rgba(223,101,110,.06);position:relative;}
  .pixel-office canvas{width:100%;height:100%;image-rendering:pixelated;image-rendering:crisp-edges;}

  /* CONTENT */
  .content-list{display:flex;flex-direction:column;gap:5px;flex:1;overflow:hidden;}
  .content-item{display:flex;align-items:center;gap:8px;padding:6px 9px;border-radius:7px;background:rgba(124,15,17,.04);border:1px solid rgba(223,101,110,.04);}
  .ci-type{width:26px;height:26px;border-radius:6px;background:linear-gradient(135deg,rgba(213,56,66,.1),rgba(124,15,17,.06));border:1px solid rgba(223,101,110,.08);display:flex;align-items:center;justify-content:center;color:var(--cherry);flex-shrink:0;}
  .ci-type svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}
  .ci-info{flex:1;}.ci-title{font-size:12px;font-weight:600;color:var(--text);}.ci-meta{font-size:9px;color:var(--text-3);margin-top:1px;}
  .ci-status{font-family:var(--mono);font-size:10px;color:var(--text-3);flex-shrink:0;}.ci-status.scheduled{color:var(--cherry);}

  /* BOTTOM */
  .bottom{display:flex;align-items:center;padding:0 18px;gap:0;font-family:var(--body);font-size:12px;overflow:hidden;}
  .bottom-section{display:flex;align-items:center;gap:14px;flex:1;min-width:0;padding:0 14px;}
  .bottom-section:first-child{border-right:1px solid rgba(223,101,110,.1);}
  .bottom-label{font-family:var(--display);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2.5px;color:var(--cherry);flex-shrink:0;display:flex;align-items:center;gap:6px;}
  .bottom-items{display:flex;gap:16px;overflow:hidden;flex:1;}
  .bottom-item{display:flex;align-items:center;gap:6px;white-space:nowrap;color:var(--text-2);}
  .bi-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
  .bi-dot.urgent{background:var(--cherry);box-shadow:0 0 6px rgba(210,32,40,.4);}
  .bi-dot.normal{background:var(--text-3);}
  .bi-dot.building{background:var(--cherry);box-shadow:0 0 8px rgba(210,32,40,.5);animation:bpulse 2s infinite;}
  @keyframes bpulse{0%,100%{opacity:1;}50%{opacity:.3;}}
  .bi-text{font-size:12px;}.bi-time{font-size:10px;color:var(--text-muted);}
  ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:rgba(223,101,110,.15);border-radius:3px;}
`;
    document.head.appendChild(style);

    // Hide layout chrome
    document.querySelectorAll('[data-layout-chrome]').forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
    const main = document.querySelector('main');
    if (main) { main.style.overflow = 'hidden'; }

    containerRef.current.innerHTML = `<div class="shell">
  <!-- TOP BAR + BTC -->
  <div class="topbar glass">
    <div class="tb-brand"><div class="tb-logo">937</div><div class="tb-title">Virtual Office</div></div>
    <div class="tb-div"></div>
    <div class="tb-nav">
      <a class="tb-nav-item active" href="/937-mission-control/"><span class="icon icon-xs"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>Dashboard</a>
      <a class="tb-nav-item" href="/937-mission-control/tasks"><span class="icon icon-xs"><svg viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></span>Tasks</a>
      <a class="tb-nav-item" href="/937-mission-control/calendar"><span class="icon icon-xs"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>Calendar</a>
      <a class="tb-nav-item" href="/937-mission-control/clients"><span class="icon icon-xs"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></span>Clients</a>
      <a class="tb-nav-item" href="/937-mission-control/docs"><span class="icon icon-xs"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>Docs</a>
      <a class="tb-nav-item" href="/937-mission-control/finance"><span class="icon icon-xs"><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></span>Finance</a>
      <a class="tb-nav-item" href="/937-mission-control/leads"><span class="icon icon-xs"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></span>Leads</a>
      <a class="tb-nav-item" href="/937-mission-control/analytics"><span class="icon icon-xs"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>Analytics</a>
      <a class="tb-nav-item" href="/937-mission-control/content-calendar"><span class="icon icon-xs"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></span>Content</a>
      <a class="tb-nav-item" href="/937-mission-control/virtual-office"><span class="icon icon-xs"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>Virtual Team</a>
    </div>
    <div class="tb-div"></div>
    <div class="btc-ticker" id="assetTicker">
      <span class="btc-icon" id="tickerIcon">₿</span>
      <span class="btc-price" id="tickerPrice">$91,247</span>
      <span class="btc-change up" id="tickerChange">+2.4%</span>
      <div class="btc-chart" id="tickerChart"></div>
    </div>
  </div>

  <!-- ANALYTICS BAR — 5 stats now, Monthly toggle between stats and See All -->
  <div class="analytics-bar glass">
    <div class="ab-stats">
      <div class="ab-stat">
        <div class="ab-icon"><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
        <div><div class="ab-val">$47K</div><div class="ab-lbl">Revenue</div></div>
      </div>
      <div class="ab-stat">
        <div class="ab-icon"><svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg></div>
        <div><div class="ab-val">7</div><div class="ab-lbl">Active Projects</div></div>
      </div>
      <div class="ab-stat">
        <div class="ab-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
        <div><div class="ab-val">12</div><div class="ab-lbl">Leads</div></div>
      </div>
      <div class="ab-stat">
        <div class="ab-icon"><svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
        <div><div class="ab-val">33%</div><div class="ab-lbl">Close Rate</div></div>
      </div>
      <div class="ab-stat">
        <div class="ab-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>
        <div><div class="ab-val">18</div><div class="ab-lbl">Sales Calls</div></div>
      </div>
    </div>
    <div class="ab-controls">
      <div class="period-toggle">
        <div class="period-btn active">Monthly</div>
        <div class="period-btn">Quarterly</div>
        <div class="period-btn">Yearly</div>
      </div>
      <a class="glass-btn" href="/937-mission-control/analytics"><span class="icon icon-xs"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>See All Analytics</a>
    </div>
  </div>

  <!-- MAIN -->
  <div class="main">
    <!-- R1C1: Tasks -->
    <div class="glass glass-elevated panel" data-href="/937-mission-control/tasks">
      <div class="panel-header">
        <span class="label"><span class="icon icon-sm" style="color:var(--cherry)"><svg viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></span> Today's Tasks</span>
        <div style="display:flex;gap:8px;align-items:center;"><span class="label" style="color:#fff;">6 / 9 active</span><a class="glass-btn" href="/937-mission-control/tasks">+ Task</a></div>
      </div>
      <div class="task-list">
        <div class="task-item"><div class="tc done"></div><span class="tt done">Nexus — finalize logo variations</span><span class="ttag d">Design</span></div>
        <div class="task-item"><div class="tc done"></div><span class="tt done">Orbital — wireframe review</span><span class="ttag d">Design</span></div>
        <div class="task-item"><div class="tc done"></div><span class="tt done">ChainMind — export deck PDF</span><span class="ttag d">Design</span></div>
        <div class="task-item"><div class="tc"></div><span class="tt">Vanta — dark mode toggle</span><span class="ttag v">Dev</span></div>
        <div class="task-item"><div class="tc"></div><span class="tt">Strata — motion storyboard v1</span><span class="ttag u">Urgent</span></div>
        <div class="task-item"><div class="tc"></div><span class="tt">Send proposal to Meridian DAO</span><span class="ttag u">Urgent</span></div>
        <div class="task-item"><div class="tc done"></div><span class="tt done">Invoice Nexus milestone 2</span><span class="ttag v">Ops</span></div>
        <div class="task-item"><div class="tc done"></div><span class="tt done">Portfolio — Vanta case study</span><span class="ttag d">Design</span></div>
      </div>
    </div>

    <!-- R1C2: Deadlines -->
    <div class="glass glass-elevated panel" data-href="/937-mission-control/calendar">
      <div class="panel-header"><span class="label"><span class="icon icon-sm" style="color:var(--cherry)"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span> Deadlines</span></div>
      <div class="dl-list">
        <div class="dl-item"><span class="dl-dot soon"></span><span class="dl-date soon">Mar 5</span><span class="dl-text">Strata — Storyboard v1</span><span class="dl-proj">STRATA</span></div>
        <div class="dl-item"><span class="dl-dot soon"></span><span class="dl-date soon">Mar 6</span><span class="dl-text">ChainMind — Final Deck</span><span class="dl-proj">CHAIN</span></div>
        <div class="dl-item"><span class="dl-dot later"></span><span class="dl-date">Mar 10</span><span class="dl-text">Vanta — Handoff</span><span class="dl-proj">VANTA</span></div>
        <div class="dl-item"><span class="dl-dot later"></span><span class="dl-date">Mar 14</span><span class="dl-text">Meridian DAO Proposal</span><span class="dl-proj">MERID</span></div>
        <div class="dl-item"><span class="dl-dot later"></span><span class="dl-date">Mar 20</span><span class="dl-text">Flux AI — Brand Kit</span><span class="dl-proj">FLUX</span></div>
        <div class="dl-item"><span class="dl-dot later"></span><span class="dl-date">Mar 28</span><span class="dl-text">Orbital — Site Launch</span><span class="dl-proj">ORBIT</span></div>
      </div>
    </div>

    <!-- R1-2 C3: Calendar 50/50 -->
    <div class="glass glass-elevated cal-panel" data-href="/937-mission-control/calendar">
      <div class="cal-top">
        <div class="panel-header"><span class="label"><span class="icon icon-sm" style="color:var(--cherry)"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span> March 2026</span><a class="glass-btn" href="/937-mission-control/calendar">+ Event</a></div>
        <div class="cal-grid">
          <div class="cal-head">Mo</div><div class="cal-head">Tu</div><div class="cal-head">We</div><div class="cal-head">Th</div><div class="cal-head">Fr</div><div class="cal-head">Sa</div><div class="cal-head">Su</div>
          <div class="cal-day other">23</div><div class="cal-day other">24</div><div class="cal-day other">25</div><div class="cal-day other">26</div><div class="cal-day other">27</div><div class="cal-day other">28</div><div class="cal-day">1</div>
          <div class="cal-day">2</div><div class="cal-day">3</div><div class="cal-day today">4</div><div class="cal-day has-event">5</div><div class="cal-day has-event">6</div><div class="cal-day">7</div><div class="cal-day">8</div>
          <div class="cal-day">9</div><div class="cal-day has-event">10</div><div class="cal-day">11</div><div class="cal-day">12</div><div class="cal-day">13</div><div class="cal-day has-event">14</div><div class="cal-day">15</div>
          <div class="cal-day">16</div><div class="cal-day">17</div><div class="cal-day">18</div><div class="cal-day">19</div><div class="cal-day has-event">20</div><div class="cal-day">21</div><div class="cal-day">22</div>
          <div class="cal-day">23</div><div class="cal-day">24</div><div class="cal-day">25</div><div class="cal-day">26</div><div class="cal-day">27</div><div class="cal-day">28</div><div class="cal-day">29</div>
          <div class="cal-day">30</div><div class="cal-day">31</div><div class="cal-day other">1</div><div class="cal-day other">2</div><div class="cal-day other">3</div><div class="cal-day other">4</div><div class="cal-day other">5</div>
        </div>
      </div>
      <div class="cal-bottom">
        <div class="label" style="margin:10px 0 8px;font-size:10px;"><span class="icon icon-sm" style="color:var(--cherry)"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span> Upcoming Events<span style="margin-left:auto;color:#fff;">5 active</span></div>
        <div class="event-list">
          <div class="event-item"><div class="ev-dot hot"></div><div class="ev-info"><div class="ev-title">Strata — Storyboard Due</div><div class="ev-time">All Day</div></div><div class="ev-date">Mar 5</div></div>
          <div class="event-item"><div class="ev-dot hot"></div><div class="ev-info"><div class="ev-title">ChainMind — Final Deck</div><div class="ev-time">2:00 PM</div></div><div class="ev-date">Mar 6</div></div>
          <div class="event-item"><div class="ev-dot warm"></div><div class="ev-info"><div class="ev-title">Nexus — Brand Review</div><div class="ev-time">10:00 AM</div></div><div class="ev-date">Mar 10</div></div>
          <div class="event-item"><div class="ev-dot warm"></div><div class="ev-info"><div class="ev-title">Meridian DAO Call</div><div class="ev-time">4:00 PM</div></div><div class="ev-date">Mar 14</div></div>
          <div class="event-item"><div class="ev-dot cool"></div><div class="ev-info"><div class="ev-title">Vanta — Handoff</div><div class="ev-time">11:00 AM</div></div><div class="ev-date">Mar 20</div></div>
        </div>
      </div>
    </div>

    <!-- R2C1: Clients -->
    <div class="glass glass-elevated panel" data-href="/937-mission-control/clients">
      <div class="panel-header"><span class="label"><span class="icon icon-sm" style="color:var(--cherry)"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></span> Clients</span><div style="display:flex;gap:8px;align-items:center;"><span class="label" style="color:#fff;">5 active</span><a class="glass-btn" href="/937-mission-control/clients">+ Client</a></div></div>
      <div class="client-list">
        <div class="client-item"><div class="cl-logo"><svg viewBox="0 0 24 24" fill="none"><polygon points="12,2 22,8 22,16 12,22 2,16 2,8" stroke="#D22028" stroke-width="1.5"/><circle cx="12" cy="12" r="3" stroke="#DF656E" stroke-width="1.2"/></svg></div><div class="cl-info"><div class="cl-name">Nexus Protocol</div><div class="cl-type">DeFi · Token Launch</div><div class="cl-service">Brand Identity & Token Launch Design</div></div><div class="cl-right"><div class="cl-status active">Active</div><div class="cl-value">$18K</div></div></div>
        <div class="client-item"><div class="cl-logo"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="#D22028" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="3" ry="8" stroke="#DF656E" stroke-width="1"/></svg></div><div class="cl-info"><div class="cl-name">Orbital Labs</div><div class="cl-type">AI Infra · Series A</div><div class="cl-service">Website Design & UI/UX</div></div><div class="cl-right"><div class="cl-status active">Active</div><div class="cl-value">$22K</div></div></div>
        <div class="client-item"><div class="cl-logo"><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#D22028" stroke-width="1.5"/><path d="M4 12h16" stroke="#DF656E" stroke-width="1"/><path d="M12 4v16" stroke="#DF656E" stroke-width="1"/></svg></div><div class="cl-info"><div class="cl-name">Vanta Finance</div><div class="cl-type">Fintech · B2B</div><div class="cl-service">Product Design & Dark Mode</div></div><div class="cl-right"><div class="cl-status active">Active</div><div class="cl-value">$15K</div></div></div>
        <div class="client-item"><div class="cl-logo"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7v10l10 5 10-5V7z" stroke="#D22028" stroke-width="1.5"/><path d="M12 12V22" stroke="#DF656E" stroke-width="1"/><path d="M2 7l10 5 10-5" stroke="#DF656E" stroke-width="1"/></svg></div><div class="cl-info"><div class="cl-name">ChainMind</div><div class="cl-type">AI × Crypto</div><div class="cl-service">Pitch Deck & Brand Strategy</div></div><div class="cl-right"><div class="cl-status active">Review</div><div class="cl-value">$8K</div></div></div>
        <div class="client-item"><div class="cl-logo"><svg viewBox="0 0 24 24" fill="none"><path d="M2 20L12 4l10 16z" stroke="#D22028" stroke-width="1.5"/><line x1="7" y1="14" x2="17" y2="14" stroke="#DF656E" stroke-width="1"/></svg></div><div class="cl-info"><div class="cl-name">Strata</div><div class="cl-type">L2 · Mainnet</div><div class="cl-service">Motion Design & Storyboards</div></div><div class="cl-right"><div class="cl-status active">Active</div><div class="cl-value">$12K</div></div></div>
      </div>
    </div>

    <!-- R2C2: Leads -->
    <div class="glass glass-elevated panel" data-href="/937-mission-control/leads">
      <div class="panel-header"><span class="label"><span class="icon icon-sm" style="color:var(--cherry)"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></span> Leads</span><div style="display:flex;gap:8px;align-items:center;"><span class="label" style="color:#fff;">5 active</span><a class="glass-btn" href="/937-mission-control/leads">+ Lead</a></div></div>
      <div class="lead-list">
        <div class="lead-item"><div class="ld-dot hot"></div><div class="ld-info"><div class="ld-name">Meridian DAO</div><div class="ld-src">Referral · Call scheduled</div></div><div class="ld-val">$15K</div></div>
        <div class="lead-item"><div class="ld-dot hot"></div><div class="ld-info"><div class="ld-name">Flux AI</div><div class="ld-src">Twitter DM · Brand kit</div></div><div class="ld-val">$12K</div></div>
        <div class="lead-item"><div class="ld-dot warm"></div><div class="ld-info"><div class="ld-name">Zenith Labs</div><div class="ld-src">Inbound · Website inquiry</div></div><div class="ld-val">$8K</div></div>
        <div class="lead-item"><div class="ld-dot warm"></div><div class="ld-info"><div class="ld-name">Prism Network</div><div class="ld-src">Conference · Follow-up</div></div><div class="ld-val">$20K</div></div>
        <div class="lead-item"><div class="ld-dot cold"></div><div class="ld-info"><div class="ld-name">Aether Protocol</div><div class="ld-src">Cold outreach</div></div><div class="ld-val">$10K</div></div>
      </div>
    </div>

    <!-- R3C1-2: Virtual Office (2x bigger agents) -->
    <div class="glass glass-elevated panel" data-href="/937-mission-control/virtual-office" style="grid-column:span 2;">
      <div class="panel-header"><span class="label"><span class="icon icon-sm" style="color:var(--cherry)"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span> Virtual Team</span><div style="display:flex;gap:8px;align-items:center;"><span class="label" style="color:#fff;">6 active</span><a class="glass-btn" href="/937-mission-control/team">+ Agent</a></div></div>
      <div class="pixel-office"><canvas id="officeCanvas"></canvas></div>
    </div>

    <!-- R3C3: Content -->
    <div class="glass glass-elevated panel" data-href="/937-mission-control/content-calendar">
      <div class="panel-header"><span class="label"><span class="icon icon-sm" style="color:var(--cherry)"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></span> Content</span><div style="display:flex;gap:8px;align-items:center;"><span class="label" style="color:#fff;">4 active</span><a class="glass-btn" href="/937-mission-control/content-calendar">+ New</a></div></div>
      <div class="content-list">
        <div class="content-item"><div class="ci-type"><svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83A7.72 7.72 0 0023 3z"/></svg></div><div class="ci-info"><div class="ci-title">Vanta case study</div><div class="ci-meta">X · 8 posts</div></div><div class="ci-status scheduled">Scheduled</div></div>
        <div class="content-item"><div class="ci-type"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></div><div class="ci-info"><div class="ci-title">Nexus brand reel</div><div class="ci-meta">Instagram · Video</div></div><div class="ci-status">Draft</div></div>
        <div class="content-item"><div class="ci-type"><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg></div><div class="ci-info"><div class="ci-title">March newsletter</div><div class="ci-meta">Email · 2.4K subs</div></div><div class="ci-status">Draft</div></div>
        <div class="content-item"><div class="ci-type"><svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg></div><div class="ci-info"><div class="ci-title">Design process blog</div><div class="ci-meta">Blog · Long-form</div></div><div class="ci-status scheduled">Mar 7</div></div>
      </div>
    </div>
  </div>

  <!-- BOTTOM -->
  <div class="bottom glass">
    <div class="bottom-section"><div class="bottom-label"><span class="icon icon-xs" style="color:var(--cherry)"><svg viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></span> TODO</div><div class="bottom-items"><div class="bottom-item"><span class="bi-dot urgent"></span><span class="bi-text">Strata storyboard v1</span><span class="bi-time">tmrw</span></div><div class="bottom-item"><span class="bi-dot urgent"></span><span class="bi-text">Meridian DAO proposal</span><span class="bi-time">2d</span></div><div class="bottom-item"><span class="bi-dot normal"></span><span class="bi-text">Vanta dark mode</span><span class="bi-time">Mar 8</span></div></div></div>
    <div class="bottom-section"><div class="bottom-label"><span class="icon icon-xs" style="color:var(--cherry)"><svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span> BUILDING</div><div class="bottom-items"><div class="bottom-item"><span class="bi-dot building"></span><span class="bi-text">937 Virtual Office UI</span><span class="bi-time">now</span></div><div class="bottom-item"><span class="bi-dot building"></span><span class="bi-text">Lead research pipeline</span><span class="bi-time">11pm</span></div></div></div>
  </div>
</div>`;

    const script = document.createElement('script');
    script.textContent = `// MULTI-ASSET TICKER — cycles through BTC, ETH, SOL, Gold, Silver
const assets = [
  { symbol: '₿', name: 'BTC', base: 91247, color: '#f7931a', volatility: 200 },
  { symbol: 'Ξ', name: 'ETH', base: 3412, color: '#627eea', volatility: 40 },
  { symbol: '◎', name: 'SOL', base: 145, color: '#9945ff', volatility: 5 },
  { symbol: '🥇', name: 'XAU', base: 2890, color: '#ffd700', volatility: 15 },
  { symbol: '🥈', name: 'XAG', base: 32, color: '#c0c0c0', volatility: 0.8 },
];
let currentAsset = 0;
const tickerChart = document.getElementById('tickerChart');
let tickerBars = [];
for(let i=0;i<12;i++){
  const bar = document.createElement('div');
  bar.className='btc-bar';
  bar.style.height = (3+Math.random()*11)+'px';
  tickerChart.appendChild(bar);
  tickerBars.push(bar);
}

function updateTicker(){
  const a = assets[currentAsset];
  // Update chart bar
  tickerBars.shift().remove();
  const bar = document.createElement('div');
  bar.className='btc-bar';
  bar.style.height = (3+Math.random()*11)+'px';
  bar.style.background = a.color+'99';
  tickerChart.appendChild(bar);
  tickerBars.push(bar);
  // Update price
  const delta = (Math.random()-0.48)*a.volatility;
  const price = a.base + delta;
  const priceStr = price >= 1000 ? '$'+Math.floor(price).toLocaleString() : '$'+price.toFixed(2);
  document.getElementById('tickerPrice').textContent = priceStr;
  document.getElementById('tickerIcon').textContent = a.symbol;
  document.getElementById('tickerIcon').style.color = a.color;
  const pct = ((delta/a.base)*100).toFixed(1);
  const chEl = document.getElementById('tickerChange');
  chEl.textContent = a.name+' '+(delta>=0?'+':'')+pct+'%';
  chEl.className = 'btc-change '+(delta>=0?'up':'down');
}
setInterval(updateTicker, 2000);
// Rotate asset every 4 seconds
setInterval(()=>{ currentAsset = (currentAsset+1) % assets.length; }, 4000);

// PIXEL OFFICE — 2x bigger agents
const canvas = document.getElementById('officeCanvas');
const ctx = canvas.getContext('2d');

function resize(){
  const r = canvas.parentElement.getBoundingClientRect();
  canvas.width = Math.floor(r.width/2);
  canvas.height = Math.floor(r.height/2);
  draw();
}

function px(x,y,c){ctx.fillStyle=c;ctx.fillRect(x,y,1,1);}
function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x,y,w,h);}

function drawDesk(x,y){
  rect(x,y,24,2,'#3a1a1c');
  rect(x,y+2,24,8,'#2a1214');
  rect(x+1,y+2,22,1,'#3a1a1c');
  // Dual monitors
  rect(x+4,y-8,8,6,'#1a0808');
  rect(x+5,y-7,6,4,'#2a3040');
  px(x+6,y-6,'#D22028');px(x+7,y-5,'#DF656E');px(x+8,y-6,'#4a5060');
  rect(x+8,y-2,2,2,'#2a1214');
  rect(x+14,y-8,8,6,'#1a0808');
  rect(x+15,y-7,6,4,'#2a3040');
  px(x+16,y-6,'#4a5060');px(x+17,y-5,'#D22028');px(x+18,y-6,'#3a4555');
  rect(x+17,y-2,2,2,'#2a1214');
  // Keyboard
  rect(x+8,y-1,8,1,'#1a1214');
}

function drawPerson(x,y,hair,shirt,working){
  // Head (bigger)
  rect(x,y-5,6,6,'#d4a574');
  rect(x,y-6,6,2,hair);
  px(x,y-4,hair);px(x+5,y-4,hair);
  // Eyes
  px(x+1,y-3,'#1a0808');px(x+4,y-3,'#1a0808');
  // Mouth
  px(x+2,y-1,'#b8876a');px(x+3,y-1,'#b8876a');
  // Body
  rect(x-1,y+1,8,6,shirt);
  // Arms
  if(working){
    rect(x-2,y+2,2,3,'#d4a574');
    rect(x+6,y+2,2,3,'#d4a574');
  } else {
    rect(x-3,y+3,2,4,'#d4a574');
    rect(x+7,y+3,2,4,'#d4a574');
  }
  // Legs
  rect(x+1,y+7,2,2,'#2a1a2a');
  rect(x+3,y+7,2,2,'#2a1a2a');
}

function drawChair(x,y){
  rect(x,y,10,3,'#1a0c0d');
  rect(x+1,y-3,8,3,'#1a0c0d');
  rect(x+4,y+3,2,4,'#1a0c0d');
}

function drawTrashcan(x,y){
  rect(x,y,4,6,'#2a1a1c');
  rect(x-1,y,6,1,'#3a2224');
  rect(x+1,y+2,2,1,'#1a0c0d');
}

function drawWallScreen(x,y,w,h){
  rect(x,y,w,h,'#0a0505');
  rect(x+1,y+1,w-2,h-2,'#1a1a2a');
  // Graph on screen
  for(let i=0;i<w-4;i++){
    const bh = 1+Math.floor(Math.random()*(h-4));
    rect(x+2+i,y+h-2-bh,1,bh,'#D22028');
  }
}

function drawPacman(x,y){
  // Cabinet
  rect(x,y,8,14,'#1a1a2a');
  rect(x+1,y+1,6,8,'#0a0a14');
  rect(x,y-1,8,1,'#2a2a3a');
  // Pacman on screen
  rect(x+2,y+3,3,3,'#f7e020');
  px(x+5,y+4,'#0a0a14');
  // Dots
  px(x+6,y+4,'#fff');
  // Ghost
  rect(x+2,y+6,2,2,'#D22028');
  // Controls
  rect(x+3,y+10,2,2,'#3a3a4a');
  px(x+2,y+11,'#D22028');
}

function drawStatus(x,y,c){rect(x,y,3,3,c);}

function draw(){
  const w=canvas.width, h=canvas.height;
  rect(0,0,w,h,'#0d0607');

  // Floor grid
  ctx.globalAlpha=0.25;
  for(let i=0;i<w;i+=12) rect(i,0,1,h,'#120809');
  for(let j=0;j<h;j+=10) rect(0,j,w,1,'#120809');
  ctx.globalAlpha=1;

  // Back wall
  rect(0,0,w,14,'#110808');
  rect(0,13,w,1,'#2a1214');

  // 937 logo on wall (bigger) — FIXED: 9 now renders correctly
  const cx=Math.floor(w/2);
  const logoY=3;
  // 9 — top bar, left side, top-right side, middle bar, bottom-right side, bottom bar
  rect(cx-12,logoY,7,2,'#D22028');
  rect(cx-12,logoY+2,2,2,'#D22028');
  rect(cx-7,logoY+2,2,2,'#D22028');
  rect(cx-12,logoY+4,7,2,'#D22028');
  rect(cx-7,logoY+6,2,2,'#D22028');
  rect(cx-12,logoY+8,7,2,'#D22028');
  // 3
  rect(cx-3,logoY,6,2,'#D22028');rect(cx+1,logoY+2,2,2,'#D22028');
  rect(cx-3,logoY+4,6,2,'#D22028');rect(cx+1,logoY+6,2,2,'#D22028');
  rect(cx-3,logoY+8,6,2,'#D22028');
  // 7
  rect(cx+5,logoY,7,2,'#D22028');rect(cx+10,logoY+2,2,2,'#D22028');
  rect(cx+9,logoY+4,2,2,'#D22028');rect(cx+8,logoY+6,2,2,'#D22028');
  rect(cx+8,logoY+8,2,2,'#D22028');

  // Wall screens
  drawWallScreen(6,2,14,9);
  drawWallScreen(w-20,2,14,9);
  // Third screen center-left
  drawWallScreen(cx-32,2,12,9);

  // Windows
  rect(cx+18,1,16,10,'#1a1020');
  rect(cx+19,2,14,8,'#1a1525');
  rect(cx+26,2,1,8,'#2a1214');
  px(cx+21,3,'#3a2535');px(cx+30,5,'#3a2535');

  // Desks spread across width — more wall margin
  const dw=24;
  const wallMargin=Math.floor(w*0.12);
  const usableW=w-2*wallMargin;
  const gap=Math.floor((usableW-3*dw)/2);
  const r1=34, r2=h-18;
  const d1x=wallMargin,d2x=d1x+dw+gap,d3x=d2x+dw+gap;

  // Ambient glow
  [[d1x,r1],[d2x,r1],[d3x,r1],[d1x,r2],[d2x,r2],[d3x,r2]].forEach(([dx,dy])=>{
    ctx.globalAlpha=0.04;rect(dx-6,dy-4,dw+12,20,'#D22028');ctx.globalAlpha=1;
  });

  // Row 1
  drawChair(d1x+7,r1+8);drawDesk(d1x,r1);drawPerson(d1x+9,r1-9,'#1a0808','#D22028',true);drawStatus(d1x+dw+3,r1-12,'#3ecf8e');
  drawChair(d2x+7,r1+8);drawDesk(d2x,r1);drawPerson(d2x+9,r1-9,'#7C0F11','#4a2a2c',true);drawStatus(d2x+dw+3,r1-12,'#3ecf8e');
  drawChair(d3x+7,r1+8);drawDesk(d3x,r1);drawPerson(d3x+9,r1-9,'#2a1a14','#DF656E',true);drawStatus(d3x+dw+3,r1-12,'#3ecf8e');

  // Row 2
  drawChair(d1x+7,r2+8);drawDesk(d1x,r2);drawPerson(d1x+9,r2-9,'#3a2a14','#5a4a3a',false);drawStatus(d1x+dw+3,r2-12,'#f5a623');
  drawChair(d2x+7,r2+8);drawDesk(d2x,r2);drawPerson(d2x+9,r2-9,'#1a0808','#4a6a5a',true);drawStatus(d2x+dw+3,r2-12,'#3ecf8e');
  drawChair(d3x+7,r2+8);drawDesk(d3x,r2);drawStatus(d3x+dw+3,r2-12,'#5a3838');

  // Trashcans near desks
  drawTrashcan(d1x-7,r1+4);
  drawTrashcan(d3x+dw+3,r1+4);
  drawTrashcan(d1x-7,r2+4);
  drawTrashcan(d3x+dw+3,r2+4);

  // BIG Pac-Man machine (centered between rows)
  const pacX=Math.floor(w/2)-8;
  const pacY=Math.floor((r1+r2)/2)-10;
  // Cabinet body
  rect(pacX,pacY,16,24,'#1a1a2a');
  rect(pacX-1,pacY-1,18,1,'#2a2a3a');
  rect(pacX-1,pacY+24,18,2,'#1a1520');
  // Screen
  rect(pacX+1,pacY+1,14,14,'#0a0a14');
  // Pac-Man (bigger)
  rect(pacX+3,pacY+4,5,5,'#f7e020');
  px(pacX+8,pacY+6,'#0a0a14');// mouth
  // Dots
  px(pacX+9,pacY+6,'#fff');px(pacX+11,pacY+6,'#fff');
  // Ghost
  rect(pacX+10,pacY+9,4,4,'#D22028');
  rect(pacX+10,pacY+13,1,1,'#D22028');rect(pacX+13,pacY+13,1,1,'#D22028');
  // Another ghost
  rect(pacX+3,pacY+10,3,3,'#3ecf8e');
  // Score text line
  rect(pacX+2,pacY+2,4,1,'#D22028');
  // Controls area
  rect(pacX+2,pacY+16,12,6,'#121218');
  // Joystick
  rect(pacX+5,pacY+18,2,3,'#4a4a5a');
  rect(pacX+4,pacY+17,4,1,'#5a5a6a');
  // Buttons
  px(pacX+10,pacY+19,'#D22028');
  px(pacX+12,pacY+19,'#f7e020');
  // Side art
  rect(pacX,pacY+16,1,8,'#2a1a2a');
  rect(pacX+15,pacY+16,1,8,'#2a1a2a');

  // BEER FOUNTAIN — middle right of office
  const bfX=d3x+Math.floor(dw/2)-4;
  const bfY=Math.floor((r1+r2)/2)-6;
  // Base/barrel
  rect(bfX,bfY+6,10,8,'#3a2214');
  rect(bfX+1,bfY+7,8,6,'#5a3a1a');
  rect(bfX+1,bfY+6,8,1,'#6a4a2a');
  // Tap tower
  rect(bfX+3,bfY,4,6,'#c0c0c0');
  rect(bfX+2,bfY,6,1,'#d0d0d0');
  rect(bfX+4,bfY+1,2,1,'#e0e0e0');
  // Tap handle
  rect(bfX+2,bfY+2,2,3,'#8a6a2a');
  // Drip tray
  rect(bfX+1,bfY+14,8,2,'#2a1a14');
  // Beer stream (animated feel — amber pixels)
  px(bfX+3,bfY+5,'#f5a623');px(bfX+4,bfY+5,'#daa520');
  // Foam
  rect(bfX+2,bfY+4,6,1,'#fff8dc');
  // Glass on tray
  rect(bfX+6,bfY+11,3,3,'#ffffff');
  rect(bfX+7,bfY+12,1,1,'#f5a623');
  // Amber glow
  ctx.globalAlpha=0.06;rect(bfX-2,bfY-2,14,20,'#f5a623');ctx.globalAlpha=1;

  // WALL ARTWORK — abstract pixel art frames
  // Frame 1: abstract red/orange painting (left of logo)
  rect(cx-28,2,10,8,'#1a0808');rect(cx-27,3,8,6,'#0d0505');
  rect(cx-26,4,2,2,'#D22028');rect(cx-24,5,3,2,'#f5a623');rect(cx-23,4,2,1,'#DF656E');rect(cx-25,6,4,1,'#7C0F11');
  // Frame 2: abstract blue/purple painting (right of window)
  rect(w-wallMargin-14,2,10,8,'#1a0808');rect(w-wallMargin-13,3,8,6,'#0d0505');
  rect(w-wallMargin-12,4,3,2,'#4a3a6a');rect(w-wallMargin-10,5,2,2,'#6a4a8a');rect(w-wallMargin-8,4,2,3,'#3a2a5a');

  // Potted plants — corners with wall spacing
  rect(wallMargin-8,h-8,5,5,'#1a3a1a');rect(wallMargin-7,h-7,3,3,'#2a5a2a');rect(wallMargin-8,h-3,5,3,'#3a2214');
  rect(w-wallMargin+3,h-8,5,5,'#1a3a1a');rect(w-wallMargin+4,h-7,3,3,'#2a5a2a');rect(w-wallMargin+3,h-3,5,3,'#3a2214');
  rect(wallMargin-8,16,5,5,'#1a3a1a');rect(wallMargin-7,17,3,3,'#2a5a2a');rect(wallMargin-8,21,5,3,'#3a2214');

  // Coffee machine
  rect(w-wallMargin+3,16,6,8,'#2a1a1c');rect(w-wallMargin+4,17,4,3,'#4a2a2c');px(w-wallMargin+6,20,'#D22028');

  // Ceiling lights
  for(let i=0;i<4;i++){const lx=Math.floor(w*(i+1)/5);rect(lx-4,0,8,1,'#2a1214');rect(lx-2,1,4,1,'#D22028');}
}

window.addEventListener('resize',resize);
setTimeout(resize,60);

// Screen flicker
setInterval(()=>{
  const w=canvas.width,h=canvas.height;
  const dw=24,wm=Math.floor(w*0.12),uw=w-2*wm,gap=Math.floor((uw-3*dw)/2);
  const r1=34,r2=h-18;
  const xs=[wm,wm+dw+gap,wm+2*(dw+gap)];
  xs.forEach(dx=>{
    [r1,r2].forEach(dy=>{
      if(Math.random()>0.6){
        const sx=dx+5+Math.floor(Math.random()*6);
        const sy=dy-7+Math.floor(Math.random()*3);
        const cs=['#D22028','#DF656E','#7C0F11','#2a3040','#4a5060'];
        px(sx,sy,cs[Math.floor(Math.random()*cs.length)]);
      }
    });
  });
},300);

// Panel click navigation
document.querySelectorAll('[data-href]').forEach(el => {
  el.addEventListener('click', (e) => {
    // Don't navigate if clicking a button/link inside the panel
    if (e.target.closest('a.glass-btn') || e.target.closest('a.tb-nav-item')) return;
    window.location.href = el.getAttribute('data-href');
  });
});`;
    document.body.appendChild(script);

    return () => {
      const v11Style = document.querySelector('style[data-v11]');
      if (v11Style) v11Style.remove();
      document.querySelectorAll('[data-layout-chrome]').forEach(el => {
        (el as HTMLElement).style.display = '';
      });
      if (main) { main.style.overflow = ''; }
    };
  }, []);

  return <div ref={containerRef} />;
}
