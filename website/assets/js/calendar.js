document.addEventListener("DOMContentLoaded", function () {
  const calendar = document.getElementById("calendar");
  const monthYear = document.getElementById("month-year");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

  let current = new Date(); // today's date
  let rawEvents = [];       // loaded from JSON

  // --- helpers ---
  const ISO = d => d.toISOString().slice(0,10);                  // 'YYYY-MM-DD'
  const toDate = iso => new Date(iso + "T00:00:00");
  const stripTime = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const DOW = ["SU","MO","TU","WE","TH","FR","SA"];              // JS: 0=Sun..6=Sat

  // Expand recurrence rules only for the visible range
  function expandEventsForView(events, viewStart, viewEnd) {
    const out = [];

    for (const ev of events) {
      // One-off (already dated) events
      if (ev.date) {
        const d = toDate(ev.date);
        if (d >= viewStart && d <= viewEnd) out.push({ ...ev, date: ISO(d) });
        continue;
      }

      // Recurring events
      const r = ev.recurrence;
      if (!r) continue;

      const start = r.start ? toDate(r.start) : viewStart;
      const end   = r.end   ? toDate(r.end)   : viewEnd;
      const exclude = new Set((r.exclude || []).map(x => x));
      const freq = r.freq || "WEEKLY";
      const interval = Math.max(1, r.interval || 1);

      if (freq === "WEEKLY") {
        const daysWanted = (r.byDay && r.byDay.length ? r.byDay : ["MO"]).map(code => DOW.indexOf(code));

        // scan day-by-day in visible range; fast enough for UI
        let cursor = new Date(Math.max(stripTime(viewStart), stripTime(start)));
        const limit = new Date(Math.min(stripTime(viewEnd), stripTime(end)));

        // week index baseline for interval skipping (every N weeks)
        const weekIndex = d => Math.floor((stripTime(d) - new Date(1970,0,4)) / (7*24*60*60*1000));
        const baseWeek = weekIndex(start);

        while (cursor <= limit) {
          const w = weekIndex(cursor);
          const onInterval = ((w - baseWeek) % interval) === 0;
          if (onInterval && daysWanted.includes(cursor.getDay())) {
            const iso = ISO(cursor);
            if (!exclude.has(iso)) out.push({ ...ev, date: iso });
          }
          cursor.setDate(cursor.getDate() + 1);
        }
      }

      // (Optional) Extend with MONTHLY/YEARLY patterns later if needed
    }

    return out;
  }

  function indexByDate(list) {
    const map = new Map();
    for (const e of list) {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date).push(e);
    }
    return map;
  }

  // Fetch events from external JSON
  fetch("assets/data/calendarEvents.json")
    .then((response) => response.json())
    .then((data) => {
      rawEvents = data;
      renderCalendar(current);
    });

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed
    const firstDay = new Date(year, month, 1).getDay();  // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Visible range for the month
    const viewStart = new Date(year, month, 1);
    const viewEnd   = new Date(year, month, daysInMonth);

    // Expand recurrences + keep any one-off events in range
    const expanded = [
      ...rawEvents.filter(e => e.date && toDate(e.date) >= viewStart && toDate(e.date) <= viewEnd),
      ...expandEventsForView(rawEvents, viewStart, viewEnd)
    ];
    const eventsByDate = indexByDate(expanded);

    // Header
    monthYear.textContent = `${date.toLocaleString("default", { month: "long" })} ${year}`;

    // Grid headers
    calendar.innerHTML = `
      <div class="calendar-header">Sun</div>
      <div class="calendar-header">Mon</div>
      <div class="calendar-header">Tue</div>
      <div class="calendar-header">Wed</div>
      <div class="calendar-header">Thu</div>
      <div class="calendar-header">Fri</div>
      <div class="calendar-header">Sat</div>
    `;

    // Leading blanks
    for (let i = 0; i < firstDay; i++) {
      calendar.innerHTML += `<div class="calendar-day empty"></div>`;
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayEvents = eventsByDate.get(fullDate) || [];

      const content = dayEvents.map(ev => `
        <p class="event-text">${ev.text}</p>
        ${ev.time ? `<p class="event-time">${ev.time}</p>` : ""}
      `).join("");

      calendar.innerHTML += `
        <div class="calendar-day">
          <strong>${day}</strong>
          ${content}
        </div>
      `;
    }
  }

  // Month navigation
  prevBtn.addEventListener("click", () => {
    current.setMonth(current.getMonth() - 1);
    renderCalendar(current);
  });

  nextBtn.addEventListener("click", () => {
    current.setMonth(current.getMonth() + 1);
    renderCalendar(current);
  });
});

  
  