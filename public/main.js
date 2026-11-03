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

  const howSection = document.getElementById("how");
  const howVideo = howSection?.querySelector(".how-video__player");
  if (howSection && howVideo && "IntersectionObserver" in window) {
    howVideo.muted = true;
    howVideo.loop = true;
    howVideo.setAttribute("playsinline", "");
    howVideo.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      const playPromise = howVideo.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            howVideo.pause();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(howSection);
  }
})();
