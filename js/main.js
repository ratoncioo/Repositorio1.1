/* La Cocina de Nilsa · interacciones
   Escrito en ES5 a propósito: funciona también en teléfonos y navegadores antiguos. */
(function () {
  'use strict';

  var OPEN_MIN = 7 * 60 + 30;  // 7:30
  var CLOSE_MIN = 22 * 60;     // 22:00

  /* ---------- menú móvil ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (open) nav.classList.add('is-open'); else nav.classList.remove('is-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 960) setMenu(false);
    });
  }

  /* ---------- filtros de la carta ---------- */
  var tabs = document.querySelectorAll('.tabs [role="tab"]');
  var items = document.querySelectorAll('#menu .item');

  function filter(cat) {
    for (var i = 0; i < items.length; i++) {
      items[i].hidden = !(cat === 'all' || items[i].getAttribute('data-cat') === cat);
    }
  }

  for (var t = 0; t < tabs.length; t++) {
    tabs[t].addEventListener('click', function () {
      for (var j = 0; j < tabs.length; j++) tabs[j].setAttribute('aria-selected', 'false');
      this.setAttribute('aria-selected', 'true');
      filter(this.getAttribute('data-filter'));
    });
  }

  /* ---------- abierto / cerrado (hora de Santiago) ---------- */
  function santiagoNow() {
    // Usa la zona horaria de Chile aunque el visitante esté en otro país.
    try {
      var parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Santiago', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
      }).formatToParts(new Date());
      var map = {};
      for (var i = 0; i < parts.length; i++) map[parts[i].type] = parts[i].value;
      var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { day: days[map.weekday], min: (parseInt(map.hour, 10) % 24) * 60 + parseInt(map.minute, 10) };
    } catch (err) {
      var d = new Date();
      return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function updateStatus() {
    var now = santiagoNow();
    var badge = document.getElementById('open-badge');
    if (badge) {
      var open = now.min >= OPEN_MIN && now.min < CLOSE_MIN;
      badge.setAttribute('data-state', open ? 'open' : 'closed');
      badge.textContent = open ? 'Abierto ahora · hasta las 22:00' : 'Cerrado · abrimos a las 7:30';
    }
    var rows = document.querySelectorAll('#hours tr');
    for (var i = 0; i < rows.length; i++) {
      if (parseInt(rows[i].getAttribute('data-day'), 10) === now.day) rows[i].classList.add('is-today');
      else rows[i].classList.remove('is-today');
    }
  }

  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* ---------- año del footer ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
