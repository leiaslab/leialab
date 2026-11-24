// Run during HTML parsing; mobile browsers can restore scroll after pageshow.
export const START_AT_TOP_SCRIPT = `(() => {
  let interacted = false;
  let deadline = 0;
  let frame = 0;
  let timer = 0;
  let poll = 0;

  const prepareVisit = () => {
    try {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
    } catch (_) {}
  };

  const resetNow = () => {
    const root = document.documentElement;
    const value = root.style.getPropertyValue("scroll-behavior");
    const priority = root.style.getPropertyPriority("scroll-behavior");
    root.style.setProperty("scroll-behavior", "auto", "important");
    // The numeric overload also works on browsers without behavior: "instant".
    window.scrollTo(0, 0);
    root.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    if (value) root.style.setProperty("scroll-behavior", value, priority);
    else root.style.removeProperty("scroll-behavior");
  };

  const stop = () => {
    deadline = 0;
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    clearTimeout(poll);
    window.removeEventListener("scroll", onScroll);
  };

  const onScroll = () => {
    if (!interacted && Date.now() < deadline && window.scrollY !== 0) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(resetNow);
    }
  };

  const checkPosition = () => {
    if (interacted || Date.now() >= deadline) {
      stop();
      return;
    }
    // WebKit can restore the position before scroll events or frames resume.
    if (window.scrollY !== 0) resetNow();
    poll = setTimeout(checkPosition, 100);
  };

  const start = () => {
    if (interacted) return;
    stop();
    prepareVisit();
    deadline = Date.now() + 2000;
    window.addEventListener("scroll", onScroll, { passive: true });
    resetNow();
    frame = requestAnimationFrame(() => {
      resetNow();
      frame = requestAnimationFrame(resetNow);
    });
    poll = setTimeout(checkPosition, 100);
    timer = setTimeout(stop, 2000);
  };

  const userIntent = () => {
    interacted = true;
    stop();
  };
  ["pointerdown", "touchstart", "wheel", "keydown", "click"].forEach(type => {
    window.addEventListener(type, userIntent, { passive: true, capture: true });
  });
  window.addEventListener("load", start);
  window.addEventListener("leia:page-ready", start);
  window.addEventListener("pageshow", event => {
    if (event.persisted) interacted = false;
    start();
  });
  window.addEventListener("pagehide", () => {
    stop();
    resetNow();
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
  start();
})();`;
