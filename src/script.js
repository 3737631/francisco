document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.header');

  /* ── Character split text animation ── */
  function splitText(el) {
    var text = el.textContent;
    el.textContent = '';
    var container = document.createElement('span');
    container.className = 'split-container';
    for (var i = 0; i < text.length; i++) {
      var ch = document.createElement('span');
      ch.className = 'split';
      ch.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      ch.style.transitionDelay = (i * 0.035) + 's';
      container.appendChild(ch);
    }
    el.appendChild(container);
  }

  var slides = document.querySelectorAll('.labeled-title > div');
  if (slides.length) {
    var firstSlide = slides[0];
    // First slide provides height - always visible
    firstSlide.classList.add('is-first');
    firstSlide.classList.add('is-visible');
    var firstWords = firstSlide.querySelectorAll('.title-word');
    firstWords.forEach(function (w, i) {
      splitText(w);
      setTimeout(function () {
        w.classList.add('is-visible');
      }, 200 + i * 150);
    });

    if (slides.length > 1) {
      var currentSlide = 0;
      var slideTimer = null;
      var isTransitioning = false;

      function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        var oldSlide = slides[currentSlide];
        var newSlide = slides[index];

        // reset new slide words
        var newWords = newSlide.querySelectorAll('.title-word');
        newWords.forEach(function (w) {
          w.classList.remove('is-visible');
          w.innerHTML = '';
        });

        // hide old
        oldSlide.classList.remove('is-visible');

        // show new
        newSlide.classList.add('is-visible');
        newWords.forEach(function (w, i) {
          splitText(w);
          setTimeout(function () {
            w.classList.add('is-visible');
          }, 100 + i * 120);
        });

        currentSlide = index;
        isTransitioning = false;

        clearTimeout(slideTimer);
        slideTimer = setTimeout(nextSlide, 4500);
      }

      function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
      }

      slideTimer = setTimeout(nextSlide, 4000);

      var labeledTitle = document.querySelector('.labeled-title');
      if (labeledTitle) {
        labeledTitle.addEventListener('mouseenter', function () {
          clearTimeout(slideTimer);
        });
        labeledTitle.addEventListener('mouseleave', function () {
          slideTimer = setTimeout(nextSlide, 4000);
        });
      }
    }
  }

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
