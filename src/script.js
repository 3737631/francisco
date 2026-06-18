document.addEventListener('DOMContentLoaded', function () {
  /* ── Word stagger entrance ── */
  var words = document.querySelectorAll('.title__word');
  words.forEach(function (w, i) {
    setTimeout(function () {
      w.classList.add('visible');
    }, 200 + i * 120);
  });

  /* ── Scroll reveal ── */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── Stagger children reveal ── */
  document.querySelectorAll('[data-stagger]').forEach(function (parent) {
    var children = parent.children;
    var delay = parseFloat(parent.getAttribute('data-stagger-delay')) || 0.12;
    var base = parseFloat(parent.getAttribute('data-stagger-base')) || 0;
    Array.from(children).forEach(function (child, i) {
      child.style.setProperty('--stagger-delay', (base + i * delay) + 's');
    });
  });

  /* ── Mega menu ── */
  var trigger = document.getElementById('menu-trigger');
  var menu = document.getElementById('mega-menu');
  if (trigger && menu) {
    trigger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      trigger.classList.toggle('active');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.addEventListener('click', function (e) {
      if (e.target === menu) {
        menu.classList.remove('open');
        trigger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Language switcher ── */
  var langBtn = document.getElementById('lang-btn');
  var langList = document.getElementById('lang-list');
  var langArrow = document.getElementById('lang-arrow');
  if (langBtn && langList) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = langList.classList.toggle('open');
      if (langArrow) langArrow.classList.toggle('open');
    });
    document.addEventListener('click', function () {
      langList.classList.remove('open');
      if (langArrow) langArrow.classList.remove('open');
    });
  }

  /* ── Polaroid tilt on hover ── */
  document.querySelectorAll('.polaroid-float').forEach(function (p) {
    p.addEventListener('mousemove', function (e) {
      var rect = p.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = (y - centerY) / 20;
      var rotateY = (centerX - x) / 20;
      p.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.03)';
    });
    p.addEventListener('mouseleave', function () {
      p.style.transform = '';
    });
  });
});
