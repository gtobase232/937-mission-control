(function() {
  'use strict';

  // =============================================
  // STYLES
  // =============================================
  const style = document.createElement('style');
  style.textContent = `
    /* Modal overlay */
    .mc-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(10, 5, 5, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .mc-overlay.active { opacity: 1; }

    /* Glass modal */
    .mc-modal {
      width: 92%;
      max-width: 480px;
      background: linear-gradient(135deg, rgba(213,56,66,0.08), rgba(160,30,40,0.04) 50%, rgba(210,32,40,0.02));
      backdrop-filter: blur(60px) saturate(1.6);
      -webkit-backdrop-filter: blur(60px) saturate(1.6);
      border: 1px solid rgba(223,101,110,0.18);
      border-radius: 18px;
      box-shadow:
        inset 0 1px 0 rgba(255,180,170,0.1),
        inset 0 0 30px rgba(223,101,110,0.03),
        0 32px 100px rgba(0,0,0,0.6),
        0 0 60px rgba(210,32,40,0.06);
      padding: 32px;
      transform: scale(0.92) translateY(16px);
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .mc-overlay.active .mc-modal {
      transform: scale(1) translateY(0);
    }

    .mc-modal-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      color: #fff;
      margin: 0 0 28px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .mc-modal-title::before {
      content: '';
      width: 3px;
      height: 18px;
      background: var(--cherry, #d22028);
      border-radius: 2px;
      box-shadow: 0 0 10px rgba(210,32,40,0.5);
    }

    .mc-field { margin-bottom: 18px; }
    .mc-field:last-of-type { margin-bottom: 24px; }

    .mc-label {
      display: block;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--text-3, #7a5555);
      margin-bottom: 7px;
    }

    .mc-input,
    .mc-select,
    .mc-textarea {
      width: 100%;
      background: linear-gradient(135deg, rgba(213,56,66,0.05), rgba(124,15,17,0.02));
      border: 1px solid rgba(223,101,110,0.12);
      border-radius: 10px;
      padding: 11px 14px;
      font-size: 13px;
      color: #fff;
      font-family: inherit;
      outline: none;
      transition: all 0.2s;
      box-sizing: border-box;
    }
    .mc-input:focus,
    .mc-select:focus,
    .mc-textarea:focus {
      border-color: rgba(223,101,110,0.35);
      box-shadow: 0 0 20px rgba(210,32,40,0.08), inset 0 0 12px rgba(210,32,40,0.03);
    }
    .mc-input::placeholder,
    .mc-textarea::placeholder {
      color: var(--text-muted, #5a3838);
    }
    .mc-textarea { resize: vertical; min-height: 76px; }
    .mc-select { appearance: none; cursor: pointer; }
    .mc-select option { background: #1a0a0b; color: #fff; }

    .mc-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    .mc-actions button {
      padding: 10px 24px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      font-family: inherit;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .mc-btn-cancel {
      background: rgba(124,15,17,0.06);
      border: 1px solid rgba(223,101,110,0.1) !important;
      color: var(--text-3, #7a5555);
    }
    .mc-btn-cancel:hover {
      background: rgba(124,15,17,0.15);
      color: var(--text-2, #d4b8b8);
    }
    .mc-btn-submit {
      background: linear-gradient(135deg, rgba(213,56,66,0.3), rgba(198,31,37,0.18));
      border: 1px solid rgba(223,101,110,0.25) !important;
      color: #fff;
      box-shadow: 0 4px 20px rgba(210,32,40,0.15);
    }
    .mc-btn-submit:hover {
      background: linear-gradient(135deg, rgba(213,56,66,0.45), rgba(198,31,37,0.3));
      box-shadow: 0 6px 28px rgba(210,32,40,0.25);
      transform: translateY(-1px);
    }

    /* Toast */
    .mc-toast {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 10000;
      background: linear-gradient(135deg, rgba(62,207,142,0.12), rgba(62,207,142,0.04));
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(62,207,142,0.2);
      border-radius: 12px;
      padding: 14px 22px;
      font-size: 12px;
      font-weight: 600;
      color: #3ecf8e;
      box-shadow: 0 12px 40px rgba(0,0,0,0.35);
      transform: translateY(24px);
      opacity: 0;
      transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .mc-toast.active { transform: translateY(0); opacity: 1; }

    /* Analytics strip clickable sections */
    [data-layout-chrome="analytics"] .mc-strip-click {
      cursor: pointer;
      transition: all 0.15s;
      border-radius: 8px;
      margin: -4px;
      padding: 4px;
    }
    [data-layout-chrome="analytics"] .mc-strip-click:hover {
      background: rgba(213,56,66,0.06);
    }

    /* Dashboard panels */
    .mc-dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
    }
    .mc-panel {
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .mc-panel:hover {
      transform: translateY(-2px) scale(1.01);
      box-shadow: 0 12px 40px rgba(210,32,40,0.1), inset 0 1px 0 rgba(255,180,170,0.1) !important;
    }
  `;
  document.head.appendChild(style);

  // =============================================
  // HELPERS
  // =============================================
  function showToast(msg) {
    var toast = document.createElement('div');
    toast.className = 'mc-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(function() {
      requestAnimationFrame(function() { toast.classList.add('active'); });
    });
    setTimeout(function() {
      toast.classList.remove('active');
      setTimeout(function() { toast.remove(); }, 350);
    }, 2500);
  }

  function closeModal(overlay) {
    overlay.classList.remove('active');
    setTimeout(function() { overlay.remove(); }, 250);
  }

  function showModal(config) {
    var overlay = document.createElement('div');
    overlay.className = 'mc-overlay';

    var fieldsHTML = '';
    for (var i = 0; i < config.fields.length; i++) {
      var f = config.fields[i];
      fieldsHTML += '<div class="mc-field">';
      fieldsHTML += '<label class="mc-label">' + f.label + '</label>';
      if (f.type === 'select') {
        fieldsHTML += '<select class="mc-select">';
        for (var j = 0; j < f.options.length; j++) {
          fieldsHTML += '<option value="' + f.options[j] + '">' + f.options[j] + '</option>';
        }
        fieldsHTML += '</select>';
      } else if (f.type === 'textarea') {
        fieldsHTML += '<textarea class="mc-textarea" placeholder="' + (f.placeholder || '') + '"></textarea>';
      } else {
        fieldsHTML += '<input class="mc-input" type="' + (f.type || 'text') + '" placeholder="' + (f.placeholder || '') + '">';
      }
      fieldsHTML += '</div>';
    }

    overlay.innerHTML =
      '<div class="mc-modal">' +
        '<div class="mc-modal-title">' + config.title + '</div>' +
        fieldsHTML +
        '<div class="mc-actions">' +
          '<button class="mc-btn-cancel">Cancel</button>' +
          '<button class="mc-btn-submit">' + (config.submitText || 'Create') + '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
    requestAnimationFrame(function() {
      requestAnimationFrame(function() { overlay.classList.add('active'); });
    });

    overlay.querySelector('.mc-btn-cancel').onclick = function() { closeModal(overlay); };
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal(overlay);
    });

    var escHandler = function(e) {
      if (e.key === 'Escape') {
        closeModal(overlay);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);

    overlay.querySelector('.mc-btn-submit').onclick = function() {
      closeModal(overlay);
      showToast(config.successMessage || 'Created successfully');
    };

    var firstInput = overlay.querySelector('.mc-input, .mc-textarea');
    if (firstInput) setTimeout(function() { firstInput.focus(); }, 150);
  }

  // =============================================
  // 1. GLASS MODALS FOR + BUTTONS
  // =============================================
  var allButtons = document.querySelectorAll('button.glass-btn');
  for (var b = 0; b < allButtons.length; b++) {
    (function(btn) {
      var text = btn.textContent.trim();

      if (text.indexOf('+ New Task') !== -1) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          showModal({
            title: 'New Task',
            fields: [
              { label: 'Task Name', type: 'text', placeholder: 'e.g. Nexus \u2014 logo revisions' },
              { label: 'Assignee', type: 'select', options: ['Trinkster', 'Check Rossi', 'Jade', 'Maya', 'Leo', 'Nico'] },
              { label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
              { label: 'Due Date', type: 'date' },
              { label: 'Description', type: 'textarea', placeholder: 'Task details...' }
            ],
            submitText: 'Create Task',
            successMessage: 'Task created'
          });
        });
      }

      if (text.indexOf('+ New Client') !== -1) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          showModal({
            title: 'New Client',
            fields: [
              { label: 'Company Name', type: 'text', placeholder: 'e.g. Nexus Protocol' },
              { label: 'Industry', type: 'text', placeholder: 'e.g. DeFi \u00b7 Token Launch' },
              { label: 'Service', type: 'select', options: ['Brand Identity', 'Web Design', 'UI/UX', 'Pitch Deck', 'Motion Design', 'Full Rebrand'] },
              { label: 'Deal Value ($)', type: 'number', placeholder: '15000' },
              { label: 'Contact Name', type: 'text', placeholder: 'e.g. Alex Rivera' }
            ],
            submitText: 'Add Client',
            successMessage: 'Client added'
          });
        });
      }

      if (text.indexOf('+ New Lead') !== -1) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          showModal({
            title: 'New Lead',
            fields: [
              { label: 'Company Name', type: 'text', placeholder: 'e.g. Polygon Labs' },
              { label: 'Contact Name', type: 'text', placeholder: 'e.g. Sarah Kim' },
              { label: 'Temperature', type: 'select', options: ['Hot', 'Warm', 'Cold'] },
              { label: 'Estimated Value ($)', type: 'number', placeholder: '20000' },
              { label: 'Source', type: 'select', options: ['Website', 'Referral', 'Twitter DM', 'LinkedIn', 'Conference', 'Cold Outreach'] }
            ],
            submitText: 'Add Lead',
            successMessage: 'Lead added to pipeline'
          });
        });
      }
    })(allButtons[b]);
  }

  // =============================================
  // 2. ANALYTICS PERIOD SWITCHING
  // =============================================
  var analyticsData = {
    month: {
      kpis: [
        { value: '$15K', color: 'var(--v-green)' },
        { value: '$48K', color: 'var(--v-amber)' },
        { value: '$7.5K', color: 'var(--rose)' },
        { value: '25%', color: 'var(--cherry)' },
        { value: '3', color: 'var(--v-green)' },
        { value: '2', color: 'var(--cherry)' }
      ],
      bars: [
        { label: 'Wk 1', value: 3, display: '$3K' },
        { label: 'Wk 2', value: 5, display: '$5K' },
        { label: 'Wk 3', value: 4, display: '$4K' },
        { label: 'Wk 4', value: 3, display: '$3K' }
      ],
      chartTitle: 'Weekly Revenue',
      strip: ['$15K', '3', '6', '25%', '8']
    },
    quarter: {
      kpis: [
        { value: '$42K', color: 'var(--v-green)' },
        { value: '$163K', color: 'var(--v-amber)' },
        { value: '$10.4K', color: 'var(--rose)' },
        { value: '33%', color: 'var(--cherry)' },
        { value: '4', color: 'var(--v-green)' },
        { value: '4', color: 'var(--cherry)' }
      ],
      bars: [
        { label: 'Jan', value: 0, display: '$0K' },
        { label: 'Feb', value: 37, display: '$37K' },
        { label: 'Mar', value: 5, display: '$5K' }
      ],
      chartTitle: 'Monthly Revenue',
      strip: ['$47K', '7', '12', '33%', '18']
    },
    year: {
      kpis: [
        { value: '$187K', color: 'var(--v-green)' },
        { value: '$420K', color: 'var(--v-amber)' },
        { value: '$14.2K', color: 'var(--rose)' },
        { value: '41%', color: 'var(--cherry)' },
        { value: '8', color: 'var(--v-green)' },
        { value: '6', color: 'var(--cherry)' }
      ],
      bars: [
        { label: 'Q1', value: 42, display: '$42K' },
        { label: 'Q2', value: 38, display: '$38K' },
        { label: 'Q3', value: 52, display: '$52K' },
        { label: 'Q4', value: 55, display: '$55K' }
      ],
      chartTitle: 'Quarterly Revenue',
      strip: ['$187K', '14', '32', '41%', '48']
    }
  };

  // Find period buttons on analytics page
  var headerRow = document.querySelector('main .flex.items-center.justify-between.mb-4');
  if (headerRow) {
    var periodBtns = headerRow.querySelectorAll('button');
    for (var p = 0; p < periodBtns.length; p++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var txt = this.textContent.trim().toLowerCase();
          var key = txt === 'month' ? 'month' : txt === 'quarter' ? 'quarter' : txt === 'year' ? 'year' : null;
          if (!key) return;

          // Toggle active button styles
          for (var k = 0; k < periodBtns.length; k++) {
            periodBtns[k].style.background = '';
            periodBtns[k].style.color = 'var(--text-3)';
            periodBtns[k].style.border = '1px solid transparent';
          }
          this.style.background = 'linear-gradient(135deg, rgba(213,56,66,.15), rgba(198,31,37,.1))';
          this.style.color = '#fff';
          this.style.border = '1px solid rgba(223,101,110,.15)';

          var data = analyticsData[key];

          // Update KPI cards
          var kpiGrid = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-3.lg\\:grid-cols-6');
          if (kpiGrid) {
            var cards = kpiGrid.querySelectorAll('.glass.glass-elevated');
            for (var c = 0; c < cards.length && c < data.kpis.length; c++) {
              var valEl = cards[c].querySelector('.font-display.text-xl');
              if (valEl) {
                valEl.textContent = data.kpis[c].value;
                valEl.style.color = data.kpis[c].color;
              }
            }
          }

          // Update bar chart
          var barContainer = document.querySelector('.flex.items-end.gap-4');
          if (barContainer) {
            var maxVal = 0;
            for (var m = 0; m < data.bars.length; m++) {
              if (data.bars[m].value > maxVal) maxVal = data.bars[m].value;
            }
            var barsHTML = '';
            for (var n = 0; n < data.bars.length; n++) {
              var h = maxVal > 0 ? Math.round((data.bars[n].value / maxVal) * 160) : 0;
              barsHTML +=
                '<div class="flex-1 flex flex-col items-center gap-1">' +
                  '<span class="font-mono text-[10px] font-bold">' + data.bars[n].display + '</span>' +
                  '<div class="w-full rounded-t-lg transition-all" style="height:' + h + 'px;background:linear-gradient(180deg, var(--cherry), var(--maroon));box-shadow:0 0 12px rgba(210,32,40,.3)"></div>' +
                  '<span class="label text-[8px]">' + data.bars[n].label + '</span>' +
                '</div>';
            }
            barContainer.innerHTML = barsHTML;
          }

          // Update chart title
          var chartPanel = barContainer ? barContainer.closest('.glass') : null;
          if (chartPanel) {
            var titleEl = chartPanel.querySelector('.label.mb-4');
            if (titleEl) titleEl.textContent = data.chartTitle;
          }

          // Update analytics strip
          var strip = document.querySelector('[data-layout-chrome="analytics"]');
          if (strip && data.strip) {
            var stripVals = strip.querySelectorAll('.font-display.text-base.font-extrabold');
            for (var s = 0; s < stripVals.length && s < data.strip.length; s++) {
              stripVals[s].textContent = data.strip[s];
            }
          }
        });
      })(periodBtns[p]);
    }
  }

  // =============================================
  // 3. ANALYTICS STRIP CLICK NAVIGATION
  // =============================================
  var stripEl = document.querySelector('[data-layout-chrome="analytics"]');
  if (stripEl) {
    var sections = stripEl.querySelectorAll('.flex.items-center.gap-3.px-5');
    var routes = [
      '/937-mission-control/finance',
      '/937-mission-control/tasks',
      '/937-mission-control/leads',
      '/937-mission-control/analytics',
      '/937-mission-control/calendar'
    ];
    for (var r = 0; r < sections.length; r++) {
      (function(section, route) {
        if (route) {
          section.classList.add('mc-strip-click');
          section.addEventListener('click', function() {
            window.location.href = route;
          });
        }
      })(sections[r], routes[r]);
    }
  }

  // =============================================
  // 4. DASHBOARD PANELS (only on index page)
  // =============================================
  var pathname = window.location.pathname;
  var isDash = pathname === '/937-mission-control/' ||
               pathname === '/937-mission-control' ||
               pathname === '/937-mission-control/index.html' ||
               pathname === '/';

  if (isDash) {
    var mainDiv = document.querySelector('main > div');
    if (mainDiv && mainDiv.innerHTML.trim().length < 10) {
      mainDiv.innerHTML =
        '<div style="padding:0">' +
          '<div class="mb-5 rounded-xl px-5 py-3 flex items-center gap-3 overflow-hidden" style="background:linear-gradient(135deg, rgba(213,56,66,.08), rgba(124,15,17,.04));border:1px solid rgba(223,101,110,.1)">' +
            '<div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-display text-xs font-black" style="background:linear-gradient(135deg, rgba(213,56,66,.2), rgba(198,31,37,.12));border:1px solid rgba(223,101,110,.15);color:var(--cherry)">937</div>' +
            '<div class="min-w-0">' +
              '<p class="text-[11px] font-semibold tracking-wide" style="color:var(--text-2)">Building the visual language of Web3.</p>' +
              '<p class="text-[9px] mt-0.5" style="color:var(--text-muted)">Mission Control \u00b7 CDMX</p>' +
            '</div>' +
            '<div class="ml-auto flex items-center gap-1.5 shrink-0">' +
              '<span class="w-[6px] h-[6px] rounded-full" style="background:var(--v-green);box-shadow:0 0 8px rgba(62,207,142,.4);animation:pulseDot 2s infinite"></span>' +
              '<span class="text-[10px] font-medium" style="color:var(--v-green)">Systems Online</span>' +
            '</div>' +
          '</div>' +
          '<div class="mc-dashboard-grid">' +
            '<div class="glass mc-panel p-5" data-navigate="/937-mission-control/tasks" style="border:1px solid rgba(223,101,110,.1)">' +
              '<div class="flex items-center gap-2 mb-4">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cherry)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path></svg>' +
                '<h3 class="font-display text-[10px] font-bold uppercase tracking-[2px]" style="color:var(--cherry)">Tasks</h3>' +
                '<span class="ml-auto text-[10px]" style="color:var(--text-muted)">\u2192</span>' +
              '</div>' +
              '<div class="grid grid-cols-3 gap-3">' +
                '<div><p class="font-mono text-lg font-bold">15</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Total</p></div>' +
                '<div><p class="font-mono text-lg font-bold" style="color:var(--v-amber)">2</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Active</p></div>' +
                '<div><p class="font-mono text-lg font-bold" style="color:var(--v-green)">5</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Done</p></div>' +
              '</div>' +
            '</div>' +
            '<div class="glass mc-panel p-5" data-navigate="/937-mission-control/clients" style="border:1px solid rgba(223,101,110,.1)">' +
              '<div class="flex items-center gap-2 mb-4">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cherry)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path></svg>' +
                '<h3 class="font-display text-[10px] font-bold uppercase tracking-[2px]" style="color:var(--cherry)">Clients</h3>' +
                '<span class="ml-auto text-[10px]" style="color:var(--text-muted)">\u2192</span>' +
              '</div>' +
              '<div class="grid grid-cols-3 gap-3">' +
                '<div><p class="font-mono text-lg font-bold">5</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Total</p></div>' +
                '<div><p class="font-mono text-lg font-bold" style="color:var(--v-green)">4</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Active</p></div>' +
                '<div><p class="font-mono text-lg font-bold" style="color:var(--v-green)">$75K</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Pipeline</p></div>' +
              '</div>' +
            '</div>' +
            '<div class="glass mc-panel p-5" data-navigate="/937-mission-control/leads" style="border:1px solid rgba(223,101,110,.1)">' +
              '<div class="flex items-center gap-2 mb-4">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cherry)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12m-10 0a10 10 0 1020 0 10 10 0 10-20 0M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0"></path></svg>' +
                '<h3 class="font-display text-[10px] font-bold uppercase tracking-[2px]" style="color:var(--cherry)">Leads</h3>' +
                '<span class="ml-auto text-[10px]" style="color:var(--text-muted)">\u2192</span>' +
              '</div>' +
              '<div class="grid grid-cols-3 gap-3">' +
                '<div><p class="font-mono text-lg font-bold">10</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Total</p></div>' +
                '<div><p class="font-mono text-lg font-bold" style="color:var(--cherry)">4</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Hot</p></div>' +
                '<div><p class="font-mono text-lg font-bold" style="color:var(--v-green)">$163K</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Pipeline</p></div>' +
              '</div>' +
            '</div>' +
            '<div class="glass mc-panel p-5" data-navigate="/937-mission-control/analytics" style="border:1px solid rgba(223,101,110,.1)">' +
              '<div class="flex items-center gap-2 mb-4">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cherry)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12l-4 0-3 9-6-18-3 9-4 0"></path></svg>' +
                '<h3 class="font-display text-[10px] font-bold uppercase tracking-[2px]" style="color:var(--cherry)">Analytics</h3>' +
                '<span class="ml-auto text-[10px]" style="color:var(--text-muted)">\u2192</span>' +
              '</div>' +
              '<div class="grid grid-cols-3 gap-3">' +
                '<div><p class="font-mono text-lg font-bold" style="color:var(--v-green)">$47K</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Revenue</p></div>' +
                '<div><p class="font-mono text-lg font-bold">33%</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Close</p></div>' +
                '<div><p class="font-mono text-lg font-bold" style="color:var(--v-amber)">$10.4K</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Avg Deal</p></div>' +
              '</div>' +
            '</div>' +
            '<div class="glass mc-panel p-5" data-navigate="/937-mission-control/finance" style="border:1px solid rgba(223,101,110,.1)">' +
              '<div class="flex items-center gap-2 mb-4">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cherry)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"></path></svg>' +
                '<h3 class="font-display text-[10px] font-bold uppercase tracking-[2px]" style="color:var(--cherry)">Finance</h3>' +
                '<span class="ml-auto text-[10px]" style="color:var(--text-muted)">\u2192</span>' +
              '</div>' +
              '<div class="grid grid-cols-3 gap-3">' +
                '<div><p class="font-mono text-lg font-bold" style="color:var(--v-green)">$47K</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Revenue</p></div>' +
                '<div><p class="font-mono text-lg font-bold">7</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Projects</p></div>' +
                '<div><p class="font-mono text-lg font-bold">18</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Calls</p></div>' +
              '</div>' +
            '</div>' +
            '<div class="glass mc-panel p-5" data-navigate="/937-mission-control/calendar" style="border:1px solid rgba(223,101,110,.1)">' +
              '<div class="flex items-center gap-2 mb-4">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cherry)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h18v18H3zM16 2v4M8 2v4M3 10h18"></path></svg>' +
                '<h3 class="font-display text-[10px] font-bold uppercase tracking-[2px]" style="color:var(--cherry)">Calendar</h3>' +
                '<span class="ml-auto text-[10px]" style="color:var(--text-muted)">\u2192</span>' +
              '</div>' +
              '<div class="grid grid-cols-3 gap-3">' +
                '<div><p class="font-mono text-lg font-bold" style="color:var(--cherry)">3</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Today</p></div>' +
                '<div><p class="font-mono text-lg font-bold" style="color:var(--v-amber)">8</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">This Week</p></div>' +
                '<div><p class="font-mono text-lg font-bold">2</p><p class="text-[9px] uppercase tracking-wider" style="color:var(--text-muted)">Deadlines</p></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    }
  }

  // Panel click navigation
  var panels = document.querySelectorAll('[data-navigate]');
  for (var pn = 0; pn < panels.length; pn++) {
    (function(panel) {
      panel.addEventListener('click', function() {
        window.location.href = panel.getAttribute('data-navigate');
      });
    })(panels[pn]);
  }

})();
