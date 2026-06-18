document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.header');

  /* ── Word stagger entrance ── */
  var words = document.querySelectorAll('.title-word');
  words.forEach(function (w, i) {
    setTimeout(function () {
      w.classList.add('visible');
    }, 300 + i * 150);
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

  /* ── Header scroll state ── */
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('has-scrolled');
    } else {
      header.classList.remove('has-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

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
  if (langBtn && langList) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      langBtn.classList.toggle('active');
      langList.classList.toggle('active');
    });
    document.addEventListener('click', function () {
      langBtn.classList.remove('active');
      langList.classList.remove('active');
    });
  }

  /* ── Draggable image scroll ── */
  var draggables = document.querySelectorAll('[data-draggable]');
  draggables.forEach(function (container) {
    var isDown = false;
    var startX, scrollLeft;

    container.addEventListener('mousedown', function (e) {
      isDown = true;
      container.classList.add('active');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      e.preventDefault();
    });

    container.addEventListener('mouseleave', function () {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mouseup', function () {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - container.offsetLeft;
      var walk = (x - startX) * 1;
      container.scrollLeft = scrollLeft - walk;
    });
  });
});
