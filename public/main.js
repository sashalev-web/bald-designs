(() => {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector("[data-nav-toggle]");
  const cartCount = document.querySelector("[data-cart-count]");
  const cartBtn = document.querySelector("[data-cart-btn]");
  const year = document.querySelector("[data-year]");

  let itemsInCart = 0;

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const bumpCart = () => {
    if (!cartCount || !cartBtn) return;
    cartCount.hidden = itemsInCart === 0;
    cartCount.textContent = String(itemsInCart);
    cartBtn.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.12)" },
        { transform: "scale(1)" },
      ],
      { duration: 280, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );
  };

  document.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      itemsInCart += 1;
      bumpCart();
      btn.classList.add("is-added");
      const name = btn.getAttribute("data-name") || "Design";
      btn.textContent = "Added";
      window.setTimeout(() => {
        btn.textContent = `Add ${name}`;
        btn.classList.remove("is-added");
        btn.textContent = "Add to cart";
      }, 1200);
    });
  });

  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      cartBtn.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(-8deg)" },
          { transform: "rotate(8deg)" },
          { transform: "rotate(0deg)" },
        ],
        { duration: 320, easing: "ease-out" }
      );
    });
  }

  const morphRoot = document.querySelector("[data-hero-morph]");
  if (morphRoot) {
    const frames = Array.from(morphRoot.querySelectorAll("[data-hero-frame]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const HOLD_MS = 2200;
    const TRANSITION_MS = 900;
    let activeIndex = Math.max(
      0,
      frames.findIndex((frame) => frame.classList.contains("is-active"))
    );
    let holdTimer = 0;
    let clearTimer = 0;

    const setActive = (nextIndex) => {
      frames.forEach((frame, index) => {
        const active = index === nextIndex;
        frame.classList.toggle("is-active", active);
        frame.classList.remove("is-exiting");
        frame.setAttribute("aria-hidden", active ? "false" : "true");
      });
      activeIndex = nextIndex;
    };

    const stopLoop = () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(clearTimer);
      holdTimer = 0;
      clearTimer = 0;
      morphRoot.classList.remove("is-morphing");
      frames.forEach((frame) => frame.classList.remove("is-exiting"));
    };

    const advance = () => {
      if (frames.length < 2 || reduceMotion.matches) return;

      const outgoing = frames[activeIndex];
      const nextIndex = (activeIndex + 1) % frames.length;
      const incoming = frames[nextIndex];

      morphRoot.classList.add("is-morphing");
      outgoing.classList.add("is-exiting");
      outgoing.classList.remove("is-active");
      incoming.classList.add("is-active");
      outgoing.setAttribute("aria-hidden", "true");
      incoming.setAttribute("aria-hidden", "false");
      activeIndex = nextIndex;

      clearTimer = window.setTimeout(() => {
        outgoing.classList.remove("is-exiting");
        morphRoot.classList.remove("is-morphing");
        scheduleNext();
      }, TRANSITION_MS);
    };

    const scheduleNext = () => {
      window.clearTimeout(holdTimer);
      if (reduceMotion.matches || frames.length < 2) return;
      holdTimer = window.setTimeout(advance, HOLD_MS);
    };

    const syncMotionPreference = () => {
      stopLoop();
      setActive(0);
      if (!reduceMotion.matches) scheduleNext();
    };

    if (typeof reduceMotion.addEventListener === "function") {
      reduceMotion.addEventListener("change", syncMotionPreference);
    } else if (typeof reduceMotion.addListener === "function") {
      reduceMotion.addListener(syncMotionPreference);
    }

    syncMotionPreference();
  }
})();
