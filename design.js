document.addEventListener("DOMContentLoaded", () => {

  // === Load Navbar dynamically ===
  const navbarContainer = document.getElementById("navbar");
  if (navbarContainer) {
    fetch("navbar.html")
      .then(res => res.text())
      .then(data => {
        navbarContainer.innerHTML = data;

        // Hamburger toggle
        const toggleBtn = navbarContainer.querySelector('.menu-toggle');
        const navMenu = navbarContainer.querySelector('.main-menu');
        if (toggleBtn && navMenu) {
          toggleBtn.addEventListener('click', () => navMenu.classList.toggle('show'));
        }

        // Mobile accordion submenus
        const submenuParents = navbarContainer.querySelectorAll(".has-submenu > a");
        submenuParents.forEach(link => {
          link.addEventListener("click", e => {
            if (window.innerWidth <= 768) {
              e.preventDefault();
              link.parentElement.classList.toggle("active");
            }
          });
        });

        // Top-level dropdowns (mobile)
        const topLinks = navbarContainer.querySelectorAll(".menu-item > a");
        topLinks.forEach(link => {
          const parent = link.parentElement;
          const dropdown = parent.querySelector(".dropdown");
          if (dropdown) {
            link.addEventListener("click", e => {
              if (window.innerWidth <= 768) {
                e.preventDefault();
                parent.classList.toggle("active");
              }
            });
          }
        });
      })
      .catch(err => console.error("Navbar load error:", err));
  }

  // === Load Footer dynamically ===
  const footerContainer = document.getElementById("footer");
  if (footerContainer) {
    fetch("footer.html")
      .then(res => res.text())
      .then(data => footerContainer.innerHTML = data)
      .catch(err => console.error("Footer load error:", err));
  }


});


  // === Index Slider ===
  const slides = document.querySelector('.slides');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  if (slides && prevBtn && nextBtn) {
    let index = 0;
    const totalSlides = slides.children.length;

    function showSlide(i) {
      index = (i + totalSlides) % totalSlides;
      slides.style.marginLeft = (-100 * index) + '%';
    }

    prevBtn.addEventListener('click', () => { showSlide(index - 1); resetAuto(); });
    nextBtn.addEventListener('click', () => { showSlide(index + 1); resetAuto(); });

    let auto = setInterval(() => showSlide(index + 1), 4000);
    function resetAuto() { clearInterval(auto); auto = setInterval(() => showSlide(index + 1), 4000); }
  }

  // === Gallery Slider / Lightbox ===
  document.querySelectorAll('.gallery-title, .img-gallery').forEach(el => el.classList.add('show'));

  const fullImgBox = document.getElementById("fullImgBox");
  const fullImg = document.getElementById("fullImg");
  let currentIndex = 0;
  const images = [];
  const thumbnails = document.querySelectorAll('.img-gallery img');

  thumbnails.forEach((img, i) => {
    images.push(img.src);
    img.addEventListener('click', () => openFullImg(i));
  });

  function openFullImg(i) {
    currentIndex = i;
    fullImg.src = images[currentIndex];
    fullImgBox.style.display = 'flex';
  }

  function closeFullImg() { fullImgBox.style.display = 'none'; }

  function nextImage() {
    if (currentIndex < images.length - 1) currentIndex++, fullImg.src = images[currentIndex];
    else closeFullImg();
  }
  function prevImage() {
    if (currentIndex > 0) currentIndex--, fullImg.src = images[currentIndex];
    else closeFullImg();
  }


document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const closeBtn = document.querySelector(".close-btn");
  const mainMenu = document.getElementById("main-menu");
  const menuItems = document.querySelectorAll(".menu-item > a");
  const subMenus = document.querySelectorAll(".has-submenu > a");

  // Open menu
  toggleBtn.addEventListener("click", () => {
    mainMenu.classList.add("show");
    toggleBtn.setAttribute("aria-expanded", "true");
  });

  // Close menu
  closeBtn.addEventListener("click", () => {
    mainMenu.classList.remove("show");
    toggleBtn.setAttribute("aria-expanded", "false");
  });

  // Close overlay when clicking outside (optional)
  document.addEventListener("click", (e) => {
    if (
      mainMenu.classList.contains("show") &&
      !mainMenu.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      mainMenu.classList.remove("show");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Mobile dropdown toggle (accordion style)
  subMenus.forEach((submenuLink) => {
    submenuLink.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // stop navigation
        const parent = submenuLink.parentElement;
        parent.classList.toggle("active");
      }
    });
  });

  // Prevent desktop hover dropdowns from breaking accordion
  menuItems.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        const parent = link.parentElement;
        if (parent.querySelector(".dropdown")) {
          e.preventDefault(); // prevent navigation
          parent.classList.toggle("active");
        }
      }
    });
  });
});
