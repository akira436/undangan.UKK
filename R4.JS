// saat dokumen dimuat
document.addEventListener("DOMContentLoaded", () => {
  // Mengambil elemen tombol pembuka undangan dan elemen panel
  const openInvitationBtn = document.getElementById("openInvitationBtn");
  const leftPanel = document.getElementById("leftpanel");
  const rightPanel = document.getElementById("rightpanel");
  const song = document.getElementById("song");
  const iconSymbol = document.getElementById("audioIconSymbol");
  const iconWrapper = document.getElementById("audioIcon");

  // Fungsi untuk membuka undangan
  function openInvitation() {
    // Cek apakah layar adalah mobile/tablet (<= 768px)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      // Jika mobile, sembunyikan panel kiri dan perluas panel kanan
      leftPanel.classList.add("hide-on-mobile");
      rightPanel.classList.add("expanded");
    } else {
      // Jika desktop, scroll ke bagian pertama dari konten undangan
      const firstSection = rightPanel.querySelector(".content-section");
      firstSection.scrollIntoView({ behavior: "smooth" });
    }

    // Tampilkan navbar setelah undangan dibuka
    showNavbar();

    // Putar musik secara otomatis saat undangan dibuka
    song
      .play()
      .then(() => {
        // Ubah ikon menjadi ikon pause dan mulai rotasi
        iconSymbol.classList.remove("bi-play-fill");
        iconSymbol.classList.add("bi-pause-fill");
        iconWrapper.classList.add("rotate");
      })
      .catch((error) => {
        // Jika autoplay gagal karena dicegah browser
        console.log("Autoplay prevented by browser:", error);
      });
  }

  // Event listener untuk tombol "Buka Undangan"
  openInvitationBtn.addEventListener("click", openInvitation);

  // Saat ukuran jendela berubah
  window.addEventListener("resize", () => {
    const isDesktop = window.innerWidth > 768;

    if (isDesktop) {
      // Jika berubah ke desktop, kembalikan layout ke semula
      leftPanel.classList.remove("hide-on-mobile");
      rightPanel.classList.remove("expanded");
      // Sesuaikan navbar untuk desktop
      const navbar = document.getElementById("navbar");
      if (navbar.classList.contains("visible")) {
        navbar.classList.remove("expanded");
      }
    } else {
      // Jika berubah ke mobile dan navbar terlihat, perluas navbar
      const navbar = document.getElementById("navbar");
      if (navbar.classList.contains("visible")) {
        navbar.classList.add("expanded");
      }
    }
  });
});

// Fungsi untuk menampilkan navbar setelah undangan dibuka
function showNavbar() {
  const navbar = document.getElementById("navbar");
  navbar.classList.add("visible");
  
  // Cek apakah mobile atau panel kanan diperluas
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const rightPanel = document.getElementById("rightpanel");
  
  if (isMobile || rightPanel.classList.contains("expanded")) {
    navbar.classList.add("expanded");
  }
}

// Fungsi navigasi navbar - menangani klik pada item navbar
document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.content-section');
  
  // Menangani klik pada item navbar
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault(); // Mencegah default link behavior
      
      // Ambil ID section target dari data-section attribute
      const targetId = this.getAttribute('data-section');
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Hapus class active dari semua item navbar
        navItems.forEach(nav => nav.classList.remove('active'));
        // Tambahkan class active ke item yang diklik
        this.classList.add('active');
        
        // Scroll smooth ke section target
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Fungsi untuk update item navbar aktif berdasarkan scroll position
  function updateActiveNavItem() {
    const navbar = document.getElementById("navbar");
    // Hanya jalankan jika navbar terlihat
    if (!navbar.classList.contains("visible")) return;
    
    let current = '';
    // Cek section mana yang sedang terlihat di viewport
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      
      // Jika section berada di area viewport (dengan offset 100px dari atas)
      if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
        current = section.getAttribute('id');
      }
    });
    
    // Update class active pada navbar items
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-section') === current) {
        item.classList.add('active');
      }
    });
  }
  
  // Listen untuk scroll events pada window dan right panel
  window.addEventListener('scroll', updateActiveNavItem);
  const rightPanel = document.getElementById('rightpanel');
  if (rightPanel) {
    rightPanel.addEventListener('scroll', updateActiveNavItem);
  }
});

// coutdown
function updateCountdown() {
  // Tentukan waktu pernikahan
  const weddingDate = new Date("2025-06-22T16:30:00").getTime();
  const now = new Date().getTime(); // Waktu saat ini
  const distance = weddingDate - now; // Selisih waktu

  // Hitung hari, jam, menit, detik
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Tampilkan ke HTML
  document.getElementById("days").textContent = days.toString().padStart(2, "0");
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");

  // Jika waktu telah lewat, tampilkan pesan
  if (distance < 0) {
    document.getElementById("countdown").innerHTML =
      '<div class="countdown-item"><h3 style="color: var(--sage);">Hari Bahagia Telah Tiba! 🎉</h3></div>';
  }
}

// Perbarui countdown setiap detik
setInterval(updateCountdown, 1000);
updateCountdown(); // Jalankan sekali saat awal

// Animasi saat scroll muncul
function fadeInOnScroll() {
  const elements = document.querySelectorAll(".fade-in");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    // Jika elemen masuk area tampilan, beri class 'visible'
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// Jalankan saat scroll dan saat awal load
window.addEventListener("scroll", fadeInOnScroll);
fadeInOnScroll();

// Kontrol Musik Background 
const song = document.getElementById("song");
const iconWrapper = document.getElementById("audioIcon");
const iconSymbol = document.getElementById("audioIconSymbol");

// Ketika ikon musik diklik
iconWrapper.addEventListener("click", () => {
  if (song.paused) {
    // Jika lagu sedang berhenti, putar
    song.play();
    iconSymbol.classList.remove("bi-play-fill");
    iconSymbol.classList.add("bi-pause-fill");
    iconWrapper.classList.add("rotate");
  } else {
    // Jika lagu sedang bermain, pause
    song.pause();
    iconSymbol.classList.remove("bi-pause-fill");
    iconSymbol.classList.add("bi-play-fill");
    iconWrapper.classList.remove("rotate");
  }
});

// bagian Form RSVP
document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Mencegah form dikirim secara default

  const formData = new FormData(this); // Ambil data dari form
  const data = Object.fromEntries(formData); // Konversi ke objek

  // Validasi field wajib
  if (!data.firstName || !data.lastName || !data.email || !data.attendance) {
    alert("Mohon lengkapi semua field yang wajib diisi.");
    return;
  }

  // Jika berhasil
  alert("Terima kasih atas konfirmasi kehadiran Anda! Kami tidak sabar menunggu kehadiran Anda! 🌸💕");
  this.reset(); // Reset form
});

// delay efek animasi
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in");

  // Tambahkan delay transisi berdasarkan urutan elemen
  fadeElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.1}s`;
  });
});