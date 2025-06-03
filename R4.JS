document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const openInvitationBtn = document.getElementById("openInvitationBtn");
  const leftPanel = document.getElementById("leftpanel");
  const rightPanel = document.getElementById("rightpanel");
  const song = document.getElementById("song");
  const iconSymbol = document.getElementById("audioIconSymbol");
  const iconWrapper = document.getElementById("audioIcon");

  // Function to open the invitation
  function openInvitation() {
    // Check if it's mobile/tablet (768px and below)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      // Hide left panel with animation on mobile
      leftPanel.classList.add("hide-on-mobile");
      rightPanel.classList.add("expanded");
    } else {
      // On desktop, scroll to first content section
      const firstSection = rightPanel.querySelector(".content-section");
      firstSection.scrollIntoView({ behavior: "smooth" });
    }

    // Auto-play music when invitation is opened
    song
      .play()
      .then(() => {
        iconSymbol.classList.remove("bi-play-fill");
        iconSymbol.classList.add("bi-pause-fill");
        iconWrapper.classList.add("rotate");
      })
      .catch((error) => {
        console.log("Autoplay prevented by browser:", error);
      });
  }

  // Main invitation button
  openInvitationBtn.addEventListener("click", openInvitation);

  // Handle window resize
  window.addEventListener("resize", () => {
    const isDesktop = window.innerWidth > 768;

    if (isDesktop) {
      // Remove mobile classes when switching to desktop
      leftPanel.classList.remove("hide-on-mobile");
      rightPanel.classList.remove("expanded");
    }
  });
});

// Countdown Timer
function updateCountdown() {
  const weddingDate = new Date("2025-06-22T16:30:00").getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");

  if (distance < 0) {
    document.getElementById("countdown").innerHTML =
      '<div class="countdown-item"><h3 style="color: var(--sage);">Hari Bahagia Telah Tiba! 🎉</h3></div>';
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Fade in animation on scroll
function fadeInOnScroll() {
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", fadeInOnScroll);
fadeInOnScroll();

// Background Music Toggle
const song = document.getElementById("song");
const iconWrapper = document.getElementById("audioIcon");
const iconSymbol = document.getElementById("audioIconSymbol");

iconWrapper.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    iconSymbol.classList.remove("bi-play-fill");
    iconSymbol.classList.add("bi-pause-fill");
    iconWrapper.classList.add("rotate");
  } else {
    song.pause();
    iconSymbol.classList.remove("bi-pause-fill");
    iconSymbol.classList.add("bi-play-fill");
    iconWrapper.classList.remove("rotate");
  }
});

// RSVP Form Submission
document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  if (!data.firstName || !data.lastName || !data.email || !data.attendance) {
    alert("Mohon lengkapi semua field yang wajib diisi.");
    return;
  }

  alert(
    "Terima kasih atas konfirmasi kehadiran Anda! Kami tidak sabar menunggu kehadiran Anda! 🌸💕"
  );
  this.reset();
});

// Add stagger animation delays
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.1}s`;
  });
});

function buatBunga() {
  const bungaContainer = document.getElementById("bunga-container");
  const rightPanel = document.getElementById("rightpanel");

  const bunga = document.createElement("div");
  bunga.classList.add("bunga");

  // Posisi jatuh acak di dalam rightPanel
  const rightPanelRect = rightPanel.getBoundingClientRect();
  const maxX = rightPanel.clientWidth;
  const randomLeft = Math.random() * maxX;

  bunga.style.left = `${randomLeft}px`;
  bunga.style.animationDuration = `${3 + Math.random() * 5}s`;

  bungaContainer.appendChild(bunga);

  // Hapus bunga setelah animasi selesai
  setTimeout(() => {
    bunga.remove();
  }, 8000);
}
setInterval(buatBunga, 800);

