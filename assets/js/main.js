/* Blooming Iqra · main.js
   Progressive enhancement:
   - With JS off, or reduced motion, everything is visible and static.
   - html.anim (hidden start states) is added only after this file runs, and
     only when motion is allowed.
   - GSAP / ScrollTrigger / Lenis are optional: if any fails to load, the page
     falls back to IntersectionObserver reveals.
   - A watchdog reveals anything that should already be on screen. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var isDesktop = function () { return window.matchMedia('(min-width: 900px)').matches; };
  var hasGSAP = !!(window.gsap && window.ScrollTrigger);
  var motion = !reduceMotion;

  if (motion) doc.classList.add('anim');
  window.__bloomReady = true;
  // Always start at the Hero (the inline <head> script already disabled scroll restoration and removed any #hash)
  var lenis = null, introReleased = false;
  function toTop() {
    window.scrollTo(0, 0);
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  }
  function releaseIntro() {
    if (introReleased) return; introReleased = true;
    toTop(); if (typeof holdTop === 'function') holdTop(600);
    doc.classList.add('intro-done'); doc.classList.remove('is-loading');
    if (lenis) lenis.start();
  }
  setTimeout(releaseIntro, motion ? 1500 : 0); // loader + scroll lock end at 1.5s, released at the top
  // A #hash typed into the URL of an open page (no reload): clean it and stay on the Hero too
  // Hold the Hero for a moment after a load or a typed #hash, so nothing that lands late (the browser's
  // own anchor jump, a layout refresh restoring an old position) can move the page. Any real user input
  // (wheel, touch, keys, pointer) ends the hold immediately.
  var userMoved = false;
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function (ev) {
    window.addEventListener(ev, function () { userMoved = true; }, { passive: true, capture: true });
  });
  function holdTop(ms) {
    userMoved = false;
    var until = Date.now() + ms;
    (function check() {
      if (userMoved) return;
      if (window.scrollY > 0) toTop();
      if (Date.now() < until) setTimeout(check, 50);
    })();
  }
  window.addEventListener('hashchange', function () {
    if (!location.hash) return;
    history.replaceState(null, '', location.pathname + location.search);
    toTop(); holdTop(800);
  });

  /* ==================================================================
     1. LANGUAGE (EN | বাংলা)
  ================================================================== */
  var BN = {
    'skip': 'মূল অংশে যান',
    'nav.about': 'পরিচয়', 'nav.ideas': 'ভাবনা', 'nav.journey': 'যাত্রা',
    'nav.impact': 'প্রভাব', 'nav.values': 'মূল্যবোধ', 'nav.connect': 'যোগাযোগ',
    'cta.connect': 'চলুন যুক্ত হই', 'menu.open': 'মেনু খুলুন',

    // Hero: title 'Blooming Iqra' stays English (brand); only the subtitle + line translate
    'hero.sub': 'ভাবনা, মানুষ ও <em>দৃষ্টিভঙ্গির</em> বিকাশ।',
    'hero.line': 'ভাবনা খুঁজে দেখার, মানুষকে বিকশিত করার আর পৃথিবীকে ভিন্নভাবে দেখার একটি জায়গা।',
    'hero.cta1': 'আমার যাত্রা দেখুন', 'hero.cta2': 'একসঙ্গে কাজের আমন্ত্রণ জানান',
    'hero.alt': 'উষ্ণ আলোয় আলোকিত একটি খিলানের সামনে গালে হাত রেখে মৃদু হাসিমুখে দাঁড়িয়ে সাবেকুননাহার ইকরা',

    'about.alt': 'চোখ নামিয়ে একটি সূর্যমুখী ফুল কাছে ধরে আছেন সাবেকুননাহার ইকরা, ভাবনামগ্ন মুহূর্তে',
    'about.eyebrow': 'পরিচয়',
    'about.title': 'হ্যালো, আমি <em>ইকরা।</em>',
    'about.p': 'আমি সাবেকুননাহার ইকরা, বরিশাল বিশ্ববিদ্যালয় থেকে রাষ্ট্রবিজ্ঞানে স্নাতক (MSS চলমান)। তরুণদের সেশন পরিচালনা, প্রশিক্ষণ ও মেন্টরিং করি, আর বরিশালে কমিউনিটি ও নারী ক্ষমতায়নের কাজে নেতৃত্ব দিই।',
    'about.quote': 'অর্থবহ পরিবর্তনের শুরু অর্থবহ বিকাশ থেকে।',
    'role.explorer': 'অন্বেষক', 'role.connector': 'সংযোগকারী', 'role.reflector': 'চিন্তক', 'role.advocate': 'অ্যাডভোকেট',

    'terr.eyebrow': 'তিনটি ক্ষেত্র',
    'terr.title': 'যেখানে আলোচনা <em>বিকশিত হয়।</em>',
    'terr.ideas': 'ভাবনা', 'terr.ideasL': 'আমরা যা সৃষ্টি করি, খুঁজি ও কল্পনা করি।',
    'terr.ideasT': '<li class="tag">সৃজনশীলতা</li><li class="tag">আর্ট মেডিটেশন</li><li class="tag">গল্প</li>',
    'terr.people': 'মানুষ', 'terr.peopleL': 'যাদের সঙ্গে বেড়ে উঠি, যাদের কাছে শিখি, যাদের পাশে দাঁড়াই।',
    'terr.peopleT': '<li class="tag">তরুণ</li><li class="tag">নারী</li><li class="tag">নেতৃত্ব</li>',
    'terr.persp': 'দৃষ্টিভঙ্গি', 'terr.perspL': 'আমরা কীভাবে পৃথিবীকে বুঝি, প্রশ্ন করি ও তার সঙ্গে যুক্ত হই।',
    'terr.perspT': '<li class="tag">নাগরিক সম্পৃক্ততা</li><li class="tag">মানবাধিকার</li><li class="tag">নীতি</li>',

    'phil.eyebrow': 'বিকাশের দর্শন',
    'phil.title': 'একটি ভাবনা থেকে সম্মিলিত পরিবর্তন',
    'phil.n1': 'ভাবনা', 'phil.d1': 'নতুন চিন্তা, প্রশ্ন ও সম্ভাবনা।',
    'phil.n2': 'মানুষ', 'phil.d2': 'ভাবনা যুক্ত হয় মানুষের অভিজ্ঞতা, প্রয়োজন ও বাস্তবতার সঙ্গে।',
    'phil.n3': 'দৃষ্টিভঙ্গি', 'phil.d3': 'বোঝাপড়া গভীর হয়, আমরা ভিন্নভাবে দেখতে শুরু করি।',
    'phil.n4': 'অংশগ্রহণ', 'phil.d4': 'মানুষ যুক্ত হয় আলোচনায়, কমিউনিটিতে, নাগরিক জীবনে ও অর্থবহ কাজে।',
    'phil.n5': 'পরিবর্তন', 'phil.d5': 'এই সম্পৃক্ততা থেকেই জন্ম নেয় পরিবর্তনের সম্ভাবনা।',

    'impact.eyebrow': 'প্রভাব',
    'impact.title': 'যে বিকাশ <em>গোনা যায়।</em>',
    'impact.s1': 'অনলাইনে পৌঁছানো মানুষ',
    'impact.s2': 'সরাসরি অংশগ্রহণ',
    'impact.s3': 'নারী প্রশিক্ষিত · ReCraft',
    'impact.of': '<span>১২১</span>টির মধ্যে',
    'impact.s4': 'Solution Hunt 2.0',
    'impact.s5': '২০২২ থেকে প্রশিক্ষণে অংশগ্রহণ',

    'journey.eyebrow': 'যাত্রা',
    'journey.title': 'শেখা, নেতৃত্ব <em>আর শোনা।</em>',
    'journey.hint': 'বিস্তারিত দেখতে ভূমিকায় ট্যাপ করুন',
    'j1.role': 'ফ্যাসিলিটেটর', 'j1.date': '২০২৩–২০২৬', 'j1.l': 'যুব নেতৃত্ব নিয়ে ইন্টারঅ্যাকটিভ সেশন।',
    'j1.d': 'সামাজিক বিষয়, যুব নেতৃত্ব ও উন্নয়ন নিয়ে ইন্টারঅ্যাকটিভ সেশন পরিচালনা; বৈচিত্র্যময় অংশগ্রহণকারীদের সক্রিয় অংশগ্রহণে উৎসাহিত করা।',
    'j2.role': 'মাস্টার ট্রেইনার', 'j2.date': '২০২৪–২০২৬', 'j2.l': 'নেতৃত্ব ও টিমওয়ার্ক প্রশিক্ষণ।',
    'j2.d': 'নেতৃত্ব, টিমওয়ার্ক ও সামাজিক সচেতনতা বিষয়ে প্রশিক্ষণ; তরুণ অংশগ্রহণকারীদের আত্মবিশ্বাস ও যোগাযোগ দক্ষতা গড়তে মেন্টরিং।',
    'j3.role': 'অ্যাম্বাসেডর কো-অর্ডিনেটর', 'j3.date': '২০২১–বর্তমান', 'j3.l': 'যুব সম্পৃক্ততায় অ্যাম্বাসেডর টিমের নেতৃত্ব।',
    'j3.d': 'যুব সম্পৃক্ততা কার্যক্রমে অ্যাম্বাসেডর টিমের নেতৃত্ব ও সমন্বয়; দিকনির্দেশনা ও অনুপ্রেরণার মাধ্যমে টিমের কাজের মান শক্তিশালী করা।',
    'j4.role': 'প্রজেক্ট লিড', 'j4.date': '২০২৪–বর্তমান', 'j4.l': 'রিসাইক্লিং প্রকল্প; ১৫ জন নারীকে প্রশিক্ষণ।',
    'j4.d': 'তরুণদের নেতৃত্বে একটি টেকসই ও রিসাইক্লিং প্রকল্প; স্বেচ্ছাসেবকদের সমন্বয়; বরিশালের বস্তি এলাকায় বসবাসরত ১৫ জন নারীকে প্রশিক্ষণ।',
    'j5.role': 'প্রজেক্ট লিড', 'j5.date': '২০২৪', 'j5.l': 'নারী নেতৃত্ব ক্যাম্পেইন; ২,৫০০+ মানুষের কাছে পৌঁছানো।',
    'j5.d': 'নারী নেতৃত্ব সচেতনতা ক্যাম্পেইনের পরিকল্পনা; বরিশাল বিশ্ববিদ্যালয়ের ১০টি ক্লাবের নারী নেতাদের মধ্যে জরিপ; নারী ক্ষমতায়ন নিয়ে চিত্রাঙ্কন প্রতিযোগিতার আয়োজন, যা সরাসরি ১৫০ জন ও অনলাইনে ২,৫০০+ মানুষকে যুক্ত করেছে।',

    'lr.eyebrow': 'নেতৃত্ব ও স্বীকৃতি',
    'lr.title': 'নেতৃত্বের <em>আস্থা</em>, শেখার আমন্ত্রণ।',
    'lr.roles': '<li>সহ-সভাপতি · Madonna BU Art Society</li><li>সাধারণ সম্পাদক · SAVE Youth, বরিশাল বিশ্ববিদ্যালয়</li><li>সমন্বয়ক · Youth Ending Hunger, বরিশাল বিশ্ববিদ্যালয় জেলা</li><li>প্রকাশনা সম্পাদক · Youth Ending Hunger, বরিশাল অঞ্চল</li><li>যুগ্ম সমন্বয়ক · FoRB Youth Network বরিশাল</li>',
    'lr.hl': '<li><b>বিজয়ী · Solution Hunt 2.0</b></li><li>EGALE Fellowship</li><li>A360 Fellowship</li><li>Democracy: From Theory to Practice</li><li>National Policy Camp · BYLC</li><li>National Youth Conference</li><li>Youth Democracy Summit</li><li>Policy Hackathon 2024 · আগামীর আমি</li><li>SAVE Youth Promise Leadership Summit</li><li>প্যানেলিস্ট · Non-violent Youth Engagement</li><li>যুব নাগরিক সম্পৃক্ততা কর্মশালা · American Center Dhaka</li>',

    'focus.eyebrow': 'কাজের ক্ষেত্র',
    'focus.title': 'আমি যা <em>নিয়ে আসি।</em>',
    'focus.legend': '<li class="lg-core">মূল দক্ষতা</li><li class="lg-grow">বিকাশমান চিন্তার নেতৃত্ব</li><li class="lg-creative">সৃজনশীল</li><li class="lg-skill">দক্ষতা</li>',
    'focus.cloud': '<li class="tg core">যুব সম্পৃক্ততা</li><li class="tg skill">কর্মশালা পরিচালনা</li><li class="tg grow">নীতি</li><li class="tg creative">আর্ট মেডিটেশন</li>' +
      '<li class="tg core">নেতৃত্ব</li><li class="tg skill">জনসমক্ষে বক্তৃতা</li><li class="tg grow">অ্যাডভোকেসি</li><li class="tg core">কমিউনিটি ডেভেলপমেন্ট</li>' +
      '<li class="tg creative">গল্প বলা</li><li class="tg skill">বিতর্ক</li><li class="tg core">নারী ক্ষমতায়ন</li><li class="tg grow">নাগরিক সম্পৃক্ততা</li>' +
      '<li class="tg skill">প্যানেল মডারেশন</li><li class="tg core">ফ্যাসিলিটেশন</li><li class="tg creative">সৃজনশীল প্রতিফলন</li><li class="tg skill">পলিসি অ্যাডভোকেসি</li>' +
      '<li class="tg grow">গণতন্ত্র</li><li class="tg core">মেন্টরশিপ</li><li class="tg skill">প্রজেক্ট ডিজাইন</li><li class="tg grow">মানবাধিকার</li>' +
      '<li class="tg skill">ইভেন্ট ও প্রোগ্রাম সমন্বয়</li><li class="tg core">সামাজিক প্রভাব</li><li class="tg creative">শিল্প ও আত্মপ্রকাশ</li><li class="tg skill">যোগাযোগ ও জনসংযোগ</li>' +
      '<li class="tg skill">ভার্চুয়াল ফ্যাসিলিটেশন</li><li class="tg skill">গবেষণায় AI</li><li class="tg skill">বেসিক গ্রাফিক ডিজাইন</li>',

    'values.eyebrow': 'মূল মূল্যবোধ',
    'values.title': 'যা আমাকে <em>বেড়ে উঠতে শেখায়।</em>',
    'v1.t': 'উদ্দেশ্যপূর্ণ বিকাশ', 'v1.d': 'বিকাশের একটি অর্থ থাকা উচিত।',
    'v2.t': 'কৌতূহল ও বিশ্লেষণী চিন্তা', 'v2.d': 'আরও প্রশ্ন। আরও গভীরে। আরও ভালো ভাবনা।',
    'v3.t': 'মানুষই প্রথম', 'v3.d': 'অগ্রগতির কেন্দ্রে মানুষ।',
    'v4.t': 'প্রতিক্রিয়ার আগে ভাবনা', 'v4.d': 'থামি। ভাবি। সাড়া দিই।',
    'v5.t': 'সাহসী ও দায়িত্বশীল কণ্ঠ', 'v5.d': 'প্রয়োজনে কথা বলি, দায়িত্ব নিয়ে।',
    'v6.t': 'দৃষ্টিভঙ্গি সম্ভাবনা তৈরি করে', 'v6.d': 'ভিন্নভাবে দেখি, ভিন্নভাবে করি।',

    'm1': 'গভীরভাবে ভাবি।', 'm2': 'আন্তরিকভাবে যত্ন নিই।', 'm3': 'অর্থবহভাবে সৃষ্টি করি।', 'm4': 'দায়িত্ব নিয়ে বলি।',

    'edu.eyebrow': 'শিক্ষা', 'edu.title': 'শিক্ষা',
    'edu.1': 'রাষ্ট্রবিজ্ঞানে MSS', 'edu.1d': 'বরিশাল বিশ্ববিদ্যালয় · চলমান',
    'edu.2': 'রাষ্ট্রবিজ্ঞানে BSS', 'edu.2d': 'বরিশাল বিশ্ববিদ্যালয় · সিজিপিএ ৩.৩৫/৪',
    'edu.3': 'এইচএসসি (বিজ্ঞান)', 'edu.3d': 'বাবুগঞ্জ ডিগ্রি কলেজ · জিপিএ ৫/৫',
    'edu.4': 'এসএসসি (বিজ্ঞান)', 'edu.4d': 'বাবুগঞ্জ সরকারি উচ্চ বিদ্যালয় · জিপিএ ৫/৫',

    'connect.eyebrow': 'যোগাযোগ',
    'connect.title': 'চলুন, একসঙ্গে <em>অর্থবহ</em> কিছু গড়ে তুলি।',
    'connect.invite': 'যেসব কাজে আমন্ত্রণ জানাতে পারেন',
    'connect.chips': '<li>কর্মশালা পরিচালনা</li><li>যুব নেতৃত্ব প্রশিক্ষণ</li><li>প্যানেল ও মডারেশন</li><li>নারী ক্ষমতায়ন উদ্যোগ</li><li>কমিউনিটি প্রকল্প</li><li>যৌথ কাজ</li>',
    'connect.phone': '০১৬২১ ৫২১৪২১',
    'connect.resume': 'রিজিউমে ডাউনলোড',

    'footer.slogan': 'ভাবনা, মানুষ ও দৃষ্টিভঙ্গির বিকাশ।',
    'footer.copy': '© ২০২৬ Blooming Iqra · সাবেকুননাহার ইকরা',
    'footer.credit': 'ব্র্যান্ড: Captain · Creative Captain7',
    'footer.top': 'উপরে ফিরে যান'
  };

  var EN = {};
  var i18nEls = document.querySelectorAll('[data-i18n]');
  var altEls = document.querySelectorAll('[data-i18n-alt]');
  var ariaEls = document.querySelectorAll('[data-i18n-aria]');
  i18nEls.forEach(function (el) { var k = el.getAttribute('data-i18n'); if (!(k in EN)) EN[k] = el.innerHTML; });
  altEls.forEach(function (el) { EN[el.getAttribute('data-i18n-alt')] = el.getAttribute('alt'); });
  ariaEls.forEach(function (el) { EN[el.getAttribute('data-i18n-aria')] = el.getAttribute('aria-label'); });

  var lang = 'en';
  function t(key) { var d = lang === 'bn' ? BN : EN; return d[key] != null ? d[key] : EN[key]; }
  var BN_DIGITS = '০১২৩৪৫৬৭৮৯';
  function fmt(n, sep) {
    var s = sep ? Math.round(n).toLocaleString('en-US') : String(Math.round(n));
    return lang === 'bn' ? s.replace(/\d/g, function (d) { return BN_DIGITS[d]; }) : s;
  }

  function applyLang(next) {
    lang = next === 'bn' ? 'bn' : 'en';
    doc.setAttribute('lang', lang);
    i18nEls.forEach(function (el) { var v = t(el.getAttribute('data-i18n')); if (v != null) el.innerHTML = v; });
    altEls.forEach(function (el) { el.setAttribute('alt', t(el.getAttribute('data-i18n-alt'))); });
    ariaEls.forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      if (el.dataset.done || !motion) el.textContent = fmt(+el.dataset.count, el.dataset.sep);
    });
    try { localStorage.setItem('bi-lang', lang); } catch (e) { /* storage unavailable */ }
  }

  /* ==================================================================
     2. TEXT SPLITTING (words in masks; line index for line reveals)
  ================================================================== */
  function splitWords(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (!node.textContent.trim()) return;
      var frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function (tok) {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
        var w = document.createElement('span'); w.className = 'w';
        var wi = document.createElement('span'); wi.className = 'wi'; wi.textContent = tok;
        w.appendChild(wi); frag.appendChild(w);
      });
      node.parentNode.replaceChild(frag, node);
    });
    assignLines(el);
  }
  function assignLines(el) {
    var words = el.querySelectorAll('.w');
    if (el.dataset.split === 'words') {
      words.forEach(function (w, i) { w.firstChild.style.setProperty('--l', (i * 0.7).toFixed(2)); });
      return;
    }
    var line = -1, last = null;
    words.forEach(function (w) {
      var top = w.offsetTop;
      if (last === null || top > last + 4) { line++; last = top; }
      w.firstChild.style.setProperty('--l', line);
    });
  }
  function splitPlain(el) { // manifesto: word spans without masks (opacity scrub)
    el.innerHTML = el.textContent.trim().split(/\s+/).map(function (w) { return '<span class="mw">' + w + '</span>'; }).join(' ');
  }

  /* ==================================================================
     3. REVEALS + WATCHDOG
  ================================================================== */
  var pending = new Set();
  function reveal(el) {
    if (!el || el.classList.contains('is-in')) { pending.delete(el); return; }
    el.classList.add('is-in'); pending.delete(el);
    if (el.__onReveal) el.__onReveal();
  }
  function whenVisible(el, fn, start) {
    pending.add(el); el.__onReveal = fn || null;
    if (hasGSAP) {
      ScrollTrigger.create({ trigger: el, start: start || 'top 88%', once: true, onEnter: function () { reveal(el); } });
    } else if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -10% 0px' });
      io.observe(el);
    } else { reveal(el); }
  }
  /* Anything whose top is already inside (or above) the viewport but still hidden
     gets revealed. Covers jumps, fast scrolls and observers that never fired. */
  function watchdog() {
    var vh = window.innerHeight;
    pending.forEach(function (el) { if (el.getBoundingClientRect().top < vh) reveal(el); });
  }

  /* ==================================================================
     4. HEADER, MENU, NAV
  ================================================================== */
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');

  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    if (lenis) { open ? lenis.stop() : lenis.start(); }
    if (open) setTimeout(function () { var a = mobileMenu.querySelector('a'); if (a) a.focus(); }, 80);
  }
  menuBtn.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
  });

  function scrollToHash(hash) {
    var target = hash === '#top' ? 0 : document.querySelector(hash);
    if (target === null) return;
    // Reveal everything up to the destination now, so it is already in place when the
    // scroll lands (no dependence on scroll speed or frame rate).
    if (target !== 0) {
      var limit = target.getBoundingClientRect().top + window.innerHeight;
      pending.forEach(function (el) { if (el.getBoundingClientRect().top < limit) reveal(el); });
    }
    var offset = -((header && header.offsetHeight) || 70) + 1;
    if (lenis) lenis.scrollTo(target, { offset: target === 0 ? 0 : offset, duration: 1.4 });
    else if (target === 0) window.scrollTo({ top: 0, behavior: motion ? 'smooth' : 'auto' });
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: motion ? 'smooth' : 'auto' });
    if (target !== 0) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
    setTimeout(watchdog, 1600);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var hash = a.getAttribute('href');
    if (hash.length < 2) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) setMenu(false);
    scrollToHash(hash);
    // Never leave a #hash in the URL, so a refresh always starts at the Hero
    if (history.replaceState) history.replaceState(null, '', location.pathname);
  });

  var navLinks = document.querySelectorAll('.nav a');
  var navTargets = Array.prototype.map.call(navLinks, function (a) { return document.querySelector(a.getAttribute('href')); });
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
    var y = window.innerHeight * 0.35, current = -1;
    navTargets.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= y) current = i; });
    navLinks.forEach(function (a, i) {
      a.classList.toggle('is-active', i === current);
      if (i === current) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  /* ==================================================================
     5. INTERACTIONS (work with or without motion)
  ================================================================== */
  // Philosophy words: description on tap / Enter
  document.querySelectorAll('.pw').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') !== 'true';
      document.querySelectorAll('.pw').forEach(function (o) { o.setAttribute('aria-expanded', 'false'); });
      b.setAttribute('aria-expanded', String(open));
    });
  });
  // Value cards: tap / Enter flips
  document.querySelectorAll('.vcard').forEach(function (c) {
    c.addEventListener('click', function () { c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true')); });
  });
  // Back to top
  document.querySelector('.to-top').addEventListener('click', function () {
    scrollToHash('#top');
    var brand = document.querySelector('.site-header .brand'); if (brand) brand.focus({ preventScroll: true });
  });

  /* ==================================================================
     6. BUILDERS that depend on current language content
  ================================================================== */
  function buildMarquees() {
    if (!motion) return;
    document.querySelectorAll('.marquee-track').forEach(function (track) {
      track.querySelectorAll('[data-clone]').forEach(function (c) { c.remove(); });
      Array.prototype.slice.call(track.children).forEach(function (li) {
        var c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.setAttribute('data-clone', ''); track.appendChild(c);
      });
    });
  }
  function indexCloud() {
    document.querySelectorAll('.cloud .tg').forEach(function (tg, i) { tg.style.setProperty('--i', i); });
  }
  function splitAll() {
    // Elements without data-i18n (e.g. the hero title) are split once and never re-split on language change
    document.querySelectorAll('.split').forEach(function (el) { if (el.querySelector('.w')) assignLines(el); else splitWords(el); });
    document.querySelectorAll('.manifesto .ml').forEach(splitPlain);
  }

  /* ==================================================================
     7. MOTION LAYER
  ================================================================== */
  var manifestoTweens = [];
  function buildManifestoScrub() {
    manifestoTweens.forEach(function (t) { t.scrollTrigger && t.scrollTrigger.kill(); t.kill(); });
    manifestoTweens = [];
    if (!motion || !hasGSAP) return;
    var words = document.querySelectorAll('.manifesto .mw');
    var tw = gsap.fromTo(words, { opacity: 0.35 }, {
      opacity: 1, ease: 'none', stagger: 0.12,
      scrollTrigger: { trigger: '.manifesto', start: 'top 85%', end: 'center 62%', scrub: 0.6 }
    });
    manifestoTweens.push(tw);
  }

  function countUp(el) {
    var target = +el.dataset.count, sep = el.dataset.sep;
    el.dataset.done = '1';
    if (!motion || target < 2) { el.textContent = fmt(target, sep); return; }
    var obj = { v: 0 };
    if (hasGSAP) {
      gsap.to(obj, { v: target, duration: 1.8, ease: 'power3.out', onUpdate: function () { el.textContent = fmt(obj.v, sep); } });
    } else { el.textContent = fmt(target, sep); }
  }

  function initPetals() {
    var canvas = document.querySelector('.petal-canvas');
    if (!canvas || !motion) return;
    var ctx = canvas.getContext('2d'), hero = canvas.parentElement;
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W, H, running = true, visible = true;
    var count = isDesktop() ? 26 : 10;
    var colors = ['rgba(104,40,58,0.16)', 'rgba(156,168,148,0.38)', 'rgba(104,40,58,0.1)'];
    var P = [];
    function size() { W = hero.offsetWidth; H = hero.offsetHeight; canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function spawn(p, initial) {
      p.x = Math.random() * W; p.y = initial ? Math.random() * H : -20;
      p.s = 5 + Math.random() * 9; p.vy = 0.15 + Math.random() * 0.35; p.sw = Math.random() * Math.PI * 2;
      p.r = Math.random() * Math.PI; p.vr = (Math.random() - 0.5) * 0.01; p.c = colors[(Math.random() * colors.length) | 0];
      return p;
    }
    size(); for (var i = 0; i < count; i++) P.push(spawn({}, true));
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < P.length; i++) {
        var p = P[i]; p.y += p.vy; p.sw += 0.012; p.x += Math.sin(p.sw) * 0.35; p.r += p.vr;
        if (p.y > H + 20) spawn(p, false);
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.ellipse(0, 0, p.s * 0.45, p.s, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
      requestAnimationFrame(draw);
    }
    function setRun(v) { var was = running; running = v && visible && !document.hidden; if (running && !was) requestAnimationFrame(draw); }
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; setRun(true); }).observe(hero);
    document.addEventListener('visibilitychange', function () { setRun(true); });
    window.addEventListener('resize', size);
    requestAnimationFrame(draw);
  }

  function initCursor() {
    if (!motion || !finePointer || !isDesktop()) return;
    doc.classList.add('has-cursor');
    var cur = document.querySelector('.cursor'), dot = cur.querySelector('.cursor-dot'), bloom = cur.querySelector('.cursor-bloom');
    var use = bloom.querySelector('use');
    var mx = -100, my = -100, bx = -100, by = -100;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      var el = e.target;
      cur.classList.toggle('is-hover', !!el.closest('a, button, summary, .tg, .invite li'));
      var light = !!el.closest('.on-wine, .site-footer, .stat.lead-stat, .tg.core, .vc-back');
      if (light !== cur.classList.contains('is-light')) {
        cur.classList.toggle('is-light', light);
        use.setAttribute('href', light ? '#bloom-light' : '#bloom');
      }
    }, { passive: true });
    document.addEventListener('mouseleave', function () { mx = my = -100; });
    (function loop() {
      bx += (mx - bx) * 0.18; by += (my - by) * 0.18;
      dot.style.translate = mx + 'px ' + my + 'px';
      bloom.style.translate = bx + 'px ' + by + 'px';
      requestAnimationFrame(loop);
    })();
  }

  function initMagnetic() {
    if (!motion || !finePointer || !hasGSAP) return;
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      var xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      var yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.3); yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      btn.addEventListener('mouseleave', function () { xTo(0); yTo(0); });
    });
  }

  function initScrollMotion() {
    var stem = document.querySelector('.progress-stem'), stemLine = stem.querySelector('.ps-line');
    var philFill = document.querySelector('.phil-fill');
    var pws = Array.prototype.slice.call(document.querySelectorAll('.pw'));
    var timeline = document.querySelector('.timeline');
    var tStem = document.createElement('span'); tStem.className = 't-stem'; tStem.setAttribute('aria-hidden', 'true');
    timeline.insertBefore(tStem, timeline.firstChild);

    // The line reaches the last word at 85% progress, then holds (so 'Change' is never left dim)
    var DONE = 0.85;
    function lightUpTo(p) { var q = Math.min(1, p / DONE); pws.forEach(function (b, i) { b.classList.toggle('is-lit', q >= i / (pws.length - 1) - 0.001); }); }
    function fillAt(p) { return Math.min(1, p / DONE); }

    if (!hasGSAP) { // fallback: plain scroll math
      var update = function () {
        var max = document.documentElement.scrollHeight - innerHeight;
        var p = max > 0 ? scrollY / max : 1;
        stemLine.style.transform = 'scaleY(' + p.toFixed(4) + ')'; stem.classList.toggle('is-full', p > 0.995);
      };
      window.addEventListener('scroll', update, { passive: true }); update();
      philFill.style.transform = 'none'; tStem.style.transform = 'none'; lightUpTo(1);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    if (ScrollTrigger.clearScrollMemory) ScrollTrigger.clearScrollMemory('manual');
    // No re-measure on tab visibility changes (Philosophy is CSS sticky, not GSAP-pinned): avoids late scroll restores
    ScrollTrigger.config({ autoRefreshEvents: 'DOMContentLoaded,load,resize' });

    // Lenis smooth scroll driven by GSAP's ticker
    if (window.Lenis) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      if (!introReleased) lenis.stop(); // no scrolling while the loader plays
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    // Progress stem + bloom at 100%
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: function (self) {
        stemLine.style.transform = 'scaleY(' + self.progress.toFixed(4) + ')';
        stem.classList.toggle('is-full', self.progress > 0.995);
      }
    });

    // Hero portrait parallax
    // ±3% of the picture (= ±3.5% of the arch) stays inside the 8% overscan: no edge can ever show
    gsap.fromTo('.arch-mask picture', { yPercent: -3 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    var mm = gsap.matchMedia();
    // Philosophy: pinned on desktop; scrubbed (no pin) on mobile
    mm.add('(min-width: 900px)', function () {
      gsap.set(philFill, { scaleX: 0, scaleY: 1, transformOrigin: 'left center' });
      var syncD = function (self) { gsap.set(philFill, { scaleX: fillAt(self.progress) }); lightUpTo(self.progress); };
      var stD = ScrollTrigger.create({
        trigger: '.philosophy', start: 'top top', end: 'bottom bottom', scrub: 0.5,
        onUpdate: syncD, onRefresh: syncD,
        onLeave: function () { gsap.set(philFill, { scaleX: 1 }); lightUpTo(1); }
      });
      syncD(stD);
    });
    mm.add('(max-width: 899px)', function () {
      gsap.set(philFill, { scaleY: 0, scaleX: 1, transformOrigin: 'center top' });
      var syncM = function (self) { gsap.set(philFill, { scaleY: fillAt(self.progress) }); lightUpTo(self.progress); };
      var stM = ScrollTrigger.create({
        trigger: '.phil-words', start: 'top 75%', end: 'bottom 55%', scrub: 0.4,
        onUpdate: syncM, onRefresh: syncM,
        onLeave: function () { gsap.set(philFill, { scaleY: 1 }); lightUpTo(1); }
      });
      syncM(stM);
    });

    // Journey stem draws, nodes pop
    gsap.fromTo(tStem, { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'center top', scrollTrigger: { trigger: timeline, start: 'top 75%', end: 'bottom 60%', scrub: 0.5 } });

    buildManifestoScrub();
  }

  /* ==================================================================
     8. INIT
  ================================================================== */
  var saved = null;
  try { saved = localStorage.getItem('bi-lang'); } catch (e) { /* ignore */ }
  if (saved === 'bn') applyLang('bn');

  splitAll();
  buildMarquees();
  indexCloud();
  document.querySelectorAll('.rise').forEach(function (el) {
    el.style.setProperty('--i', Array.prototype.indexOf.call(el.parentNode.children, el));
  });

  document.querySelectorAll('.lang-toggle button').forEach(function (b) {
    b.addEventListener('click', function () {
      applyLang(b.getAttribute('data-lang'));
      splitAll(); buildMarquees(); indexCloud(); buildManifestoScrub();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  });

  if (!motion) {
    document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = fmt(+el.dataset.count, el.dataset.sep); });
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return; // reduced motion: static page, all content already visible
  }

  initScrollMotion();

  // Register reveals (hero handled by the intro below)
  var heroEls = document.querySelectorAll('.hero .reveal, .hero .split, .hero .draw');
  document.querySelectorAll('.reveal, .split, .draw, .cloud').forEach(function (el) {
    if (Array.prototype.indexOf.call(heroEls, el) === -1) whenVisible(el);
  });
  document.querySelectorAll('.t-item').forEach(function (it) { whenVisible(it, null, 'top 78%'); });
  // Rise groups: reveal all children together (stagger comes from --i)
  var groups = new Set();
  document.querySelectorAll('.rise').forEach(function (el) { groups.add(el.parentNode); });
  groups.forEach(function (g) {
    whenVisible(g, function () {
      g.querySelectorAll('.rise').forEach(function (r) { r.classList.add('is-in'); });
      g.querySelectorAll('[data-count]').forEach(countUp);
    }, 'top 85%');
  });
  document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = fmt(0, el.dataset.sep); });

  // Intro: loader runs 0 → ~1.45s in CSS; hero reveals as it lifts
  var introAt = 1050;
  setTimeout(function () {
    heroEls.forEach(function (el) { el.classList.add('is-in'); });
  }, introAt);

  initPetals();
  initCursor();
  initMagnetic();

  // Scroll listeners (Lenis emits native scroll events too)
  var lastWd = 0;
  window.addEventListener('scroll', function () {
    onScroll();
    var now = Date.now(); if (now - lastWd > 200) { lastWd = now; watchdog(); }
  }, { passive: true });
  onScroll();

  // Watchdog: 3s after start, then whenever scrolling settles
  setTimeout(watchdog, 3000);
  var idle; window.addEventListener('scroll', function () { clearTimeout(idle); idle = setTimeout(watchdog, 250); }, { passive: true });

  // Re-measure line splits once web fonts are ready / on width change
  // Measure only once fonts AND images are in, so section heights (incl. the sticky Philosophy) are final
  var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  var imagesReady = new Promise(function (r) { if (document.readyState === 'complete') r(); else window.addEventListener('load', r, { once: true }); });
  Promise.all([fontsReady, imagesReady]).then(function () {
    document.querySelectorAll('.split').forEach(assignLines);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    if (!introReleased || window.scrollY < 2) toTop(); // never yank a visitor who has already started scrolling
  });
  var lastW = innerWidth, rT;
  window.addEventListener('resize', function () {
    clearTimeout(rT); rT = setTimeout(function () {
      if (innerWidth === lastW) return; lastW = innerWidth;
      document.querySelectorAll('.split').forEach(assignLines);
    }, 200);
  });

})();
