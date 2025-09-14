document.addEventListener("DOMContentLoaded", () => {
  // === Intersection Observer for animations ===
  (() => {
    const sections = document.querySelectorAll('section');
    if (!sections.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
  })();


  // === Index Slider ===
  (() => {
    const slides = document.querySelector('.slides');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    if (!slides || !prevBtn || !nextBtn) return;

    let index = 0;
    const totalSlides = slides.children.length; // auto-detect number of slides

    function showSlide(i) {
      index = (i + totalSlides) % totalSlides;
      slides.style.marginLeft = (-100 * index) + '%';
    }

    prevBtn.addEventListener('click', () => {
      showSlide(index - 1);
      resetAuto();
    });

    nextBtn.addEventListener('click', () => {
      showSlide(index + 1);
      resetAuto();
    });

    let auto = setInterval(() => showSlide(index + 1), 4000);

    function resetAuto() {
      clearInterval(auto);
      auto = setInterval(() => showSlide(index + 1), 4000);
    }
  })();


 // === Load Navbar ===
(() => {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  fetch("navbar.html")
    .then(res => {
      if (!res.ok) throw new Error("Navbar fetch failed: " + res.status);
      return res.text();
    })
    .then(data => {
      navbarContainer.innerHTML = data;

      // scope selectors to the injected navbar
      const toggleBtn = navbarContainer.querySelector('.menu-toggle');
      const navMenu = navbarContainer.querySelector('.main-menu');

      if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
          const isOpen = navMenu.classList.toggle('show');
          toggleBtn.setAttribute('aria-expanded', isOpen);
          console.log('[NAV] menu toggled:', isOpen);
        });
      } else {
        console.warn('[NAV] toggleBtn or navMenu not found', { toggleBtn: !!toggleBtn, navMenu: !!navMenu });
      }

      // Submenu toggles (mobile: click to open)
      const submenuLinks = navbarContainer.querySelectorAll('.has-submenu > a');
      submenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          // only intercept clicks on small screens
          if (window.innerWidth <= 768) {
            e.preventDefault();
            const submenu = link.nextElementSibling;
            if (!submenu) return;
            const opened = submenu.classList.toggle('show');
            link.classList.toggle('active', opened);
            console.log('[NAV] submenu toggled:', link.textContent.trim(), opened);
          }
        });
      });

      // Close mobile menu & submenus when clicking outside
      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          if (!navbarContainer.contains(e.target)) {
            if (navMenu) navMenu.classList.remove('show');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
            navbarContainer.querySelectorAll('.submenu.show').forEach(s => s.classList.remove('show'));
            navbarContainer.querySelectorAll('.has-submenu > a.active').forEach(a => a.classList.remove('active'));
          }
        }
      });

      // Reset mobile state on resize to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          if (navMenu) navMenu.classList.remove('show');
          if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
          navbarContainer.querySelectorAll('.submenu.show').forEach(s => s.classList.remove('show'));
          navbarContainer.querySelectorAll('.has-submenu > a.active').forEach(a => a.classList.remove('active'));
        }
      });

    })
    .catch(err => console.error("Navbar load error:", err));
})();
Quick checklist / debu
});




// === Gallery Slider ===
  document.querySelectorAll('.gallery-title, .img-gallery')
      .forEach(el => el.classList.add('show'));

      const fullImgBox = document.getElementById("fullImgBox");
      const fullImg = document.getElementById("fullImg");

      function openFullImg(pic){
        fullImgBox.style.display = "flex";
        fullImg.src = pic;
      }

      function closeFullImg(){
        fullImgBox.style.display = "none";
      }
     
     
      let currentIndex = 0;
      const images = [];
      const thumbnails = document.querySelectorAll('.img-gallery img');

      thumbnails.forEach((img, index) => {
      images.push(img.src);
      img.addEventListener('click', () => {
      openFullImg(index);
      });
      });

      function openFullImg(index) {
      currentIndex = index;
      fullImg.src = images[currentIndex];
      fullImgBox.style.display = 'flex';
      }

      function closeFullImg() {
      fullImgBox.style.display = 'none';
      }

      function nextImage() {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    fullImg.src = images[currentIndex];
    updateArrows();
  } else {
    // ✅ Already last image → close
    closeFullImg();
  }
}

function prevImage() {
  if (currentIndex > 0) {
    currentIndex--;
    fullImg.src = images[currentIndex];
    updateArrows();
  } else {
    // ✅ Already first image → close
    closeFullImg();
  }

}

