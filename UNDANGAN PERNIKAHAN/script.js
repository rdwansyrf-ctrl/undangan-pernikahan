document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // 1. HELPER: TOAST NOTIFICATION
  // ===============================
  function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  // ===============================
  // 2. QUERY PARAMS (NAMA TAMU)
  // ===============================
  const params = new URLSearchParams(window.location.search);
  const guestParam = params.get("to");
  const guestElem = document.getElementById("guest");

  if (guestParam && guestElem) {
    guestElem.innerHTML = decodeURIComponent(guestParam);
  }

  // ===============================
  // 3. LOADING SCREEN
  // ===============================
  const loading = document.getElementById("loading");
  if (loading) {
    setTimeout(() => {
      loading.style.opacity = "0";
      setTimeout(() => {
        loading.style.display = "none";
      }, 1000);
    }, 1000);
  }

  // ===============================
  // 4. BUKA UNDANGAN & AUDIO
  // ===============================
  const openButton = document.getElementById("openInvitation");
  const opening = document.getElementById("opening");
  const music = document.getElementById("music");
  const musicBtn = document.getElementById("musicControl");
  const equalizer = document.getElementById("equalizer");

  if (openButton && opening) {
    openButton.addEventListener("click", () => {
      opening.style.opacity = "0";
      setTimeout(() => {
        opening.style.display = "none";
      }, 700);

      // Play Audio
      if (music) {
        music.play().catch(() => console.log("Autoplay ditolak oleh browser."));
        if (musicBtn) musicBtn.classList.add("playing");
      }

      // Triggers Confetti
      confetti();
    });
  }

  // Equalizer & Music Controls
  if (music) {
    if (equalizer) equalizer.style.display = "none";

    music.addEventListener("play", () => {
      if (equalizer) equalizer.style.display = "flex";
      if (musicBtn) musicBtn.classList.add("playing");
    });

    music.addEventListener("pause", () => {
      if (equalizer) equalizer.style.display = "none";
      if (musicBtn) musicBtn.classList.remove("playing");
    });
  }

  if (musicBtn && music) {
    musicBtn.onclick = () => {
      if (music.paused) {
        music.play();
      } else {
        music.pause();
      }
    };
  }

  // ===============================
  // 5. COUNTDOWN TIMER
  // ===============================
  const targetDate = new Date("December 31, 2026 08:00:00").getTime();
  const dayElem = document.getElementById("day");
  const hourElem = document.getElementById("hour");
  const minuteElem = document.getElementById("minute");
  const secondElem = document.getElementById("second");

  if (dayElem && hourElem && minuteElem && secondElem) {
    setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) return;

      const day = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const second = Math.floor((distance % (1000 * 60)) / 1000);

      dayElem.innerHTML = day;
      hourElem.innerHTML = hour;
      minuteElem.innerHTML = minute;
      secondElem.innerHTML = second;
    }, 1000);
  }

  // ===============================
  // 6. HERO SLIDER
  // ===============================
  const slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 5000);
  }

  // ===============================
  // 7. LIGHTBOX GALLERY
  // ===============================
  const gallery = document.querySelectorAll(".gallery-grid img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeLightbox = document.getElementById("closeLightbox");
  const nextPhoto = document.getElementById("nextPhoto");
  const prevPhoto = document.getElementById("prevPhoto");
  let currentPhoto = 0;

  if (gallery.length > 0 && lightbox && lightboxImg) {
    gallery.forEach((img, index) => {
      img.onclick = () => {
        currentPhoto = index;
        showPhoto();
        lightbox.classList.add("active");
      };
    });

    function showPhoto() {
      lightboxImg.src = gallery[currentPhoto].src;
    }

    if (nextPhoto) {
      nextPhoto.onclick = () => {
        currentPhoto = (currentPhoto + 1) % gallery.length;
        showPhoto();
      };
    }

    if (prevPhoto) {
      prevPhoto.onclick = () => {
        currentPhoto = (currentPhoto - 1 + gallery.length) % gallery.length;
        showPhoto();
      };
    }

    if (closeLightbox) {
      closeLightbox.onclick = () => lightbox.classList.remove("active");
    }

    lightbox.onclick = (e) => {
      if (e.target === lightbox) lightbox.classList.remove("active");
    };

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "ArrowRight" && nextPhoto) nextPhoto.click();
      if (e.key === "ArrowLeft" && prevPhoto) prevPhoto.click();
      if (e.key === "Escape" && closeLightbox) closeLightbox.click();
    });
  }

  // ===============================
  // 8. REVEAL & NAVIGATION SCROLL
  // ===============================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#bottomNav a");

  function handleScroll() {
    const trigger = window.innerHeight * 0.85;
    let currentSection = "";

    sections.forEach((sec) => {
      const top = sec.getBoundingClientRect().top;
      if (top < trigger) {
        sec.classList.add("reveal", "active");
      }

      if (window.pageYOffset >= sec.offsetTop - 200) {
        currentSection = sec.getAttribute("id");
      }
    });

    if (navLinks.length > 0) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // ===============================
  // 9. ENVELOPE & COPY BUTTONS
  // ===============================
  const envelope = document.querySelector(".envelope-card");
  if (envelope) {
    envelope.onclick = () => envelope.classList.toggle("open");
  }

  // Copy buttons
  document.querySelectorAll(".copy-btn, #copyRek").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const textToCopy = btn.dataset.copy || "1234567890";
      navigator.clipboard.writeText(textToCopy);
      showToast("Nomor rekening berhasil disalin!");
    };
  });

  // Share button
  const shareBtn = document.getElementById("shareInvitation");
  if (shareBtn) {
    shareBtn.onclick = () => {
      if (navigator.share) {
        navigator.share({
          title: "Wedding Invitation",
          text: "Ridwan & Charisma Wedding",
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        showToast("Link undangan berhasil disalin!");
      }
    };
  }

  // ===============================
  // 10. WISHES FORM
  // ===============================
  const wishForm = document.getElementById("wishForm");
  const wishList = document.getElementById("wishList");

  if (wishForm && wishList) {
    wishForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("wishName");
      const msgInput = document.getElementById("wishMessage");

      if (!nameInput.value.trim() || !msgInput.value.trim()) return;

      const item = document.createElement("div");
      item.className = "wish-item";
      item.innerHTML = `
        <h4>${nameInput.value}</h4>
        <p>${msgInput.value}</p>
      `;

      wishList.prepend(item);
      wishForm.reset();
      showToast("Ucapan terkirim, terima kasih!");
    });
  }

  // ===============================
  // 11. VISUAL EFFECTS & ANIMATIONS
  // ===============================

  // Falling Flowers Effect
  for (let i = 0; i < 25; i++) {
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.innerHTML = "🌸";
    flower.style.left = Math.random() * 100 + "%";
    flower.style.fontSize = 15 + Math.random() * 20 + "px";
    flower.style.animationDuration = 8 + Math.random() * 8 + "s";
    flower.style.animationDelay = Math.random() * 5 + "s";
    document.body.appendChild(flower);
  }

  // Confetti Effect
  function confetti() {
    const colors = ["#C89B67", "#E7CFA8", "#F9E8C9", "#FFFFFF", "#FFD86E"];
    for (let i = 0; i < 80; i++) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "%";
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDuration = 3 + Math.random() * 4 + "s";
      c.style.animationDelay = Math.random() * 2 + "s";
      document.body.appendChild(c);

      setTimeout(() => c.remove(), 7000);
    }
  }

  // Float Love
  setInterval(() => {
    const love = document.createElement("div");
    love.innerHTML = "❤";
    love.className = "loveFloat";
    love.style.left = Math.random() * 100 + "%";
    document.body.appendChild(love);

    setTimeout(() => love.remove(), 8000);
  }, 1500);

  // Sparkle on mousemove
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.8) {
      const s = document.createElement("div");
      s.className = "sparkle";
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      document.body.appendChild(s);

      setTimeout(() => s.remove(), 1000);
    }
  });

  // Ripple Effect
  document.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 800);
  });

  // Auto Night Mode
  const hour = new Date().getHours();
  if (hour >= 18 || hour <= 5) {
    document.body.classList.add("night");
  }
});

// ===============================
// 12. SERVICE WORKER REGISTRATION
// ===============================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch((err) => {
      console.log("SW registration failed: ", err);
    });
  });
}