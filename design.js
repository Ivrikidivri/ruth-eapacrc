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




document.addEventListener("DOMContentLoaded", () => {

  // === Load Navbar dynamically ===
  const navbarContainer = document.getElementById("navbar");
  if (navbarContainer) {
    fetch("navbar.html")
      .then(res => res.text())
      .then(data => {
        navbarContainer.innerHTML = data;

        // Hamburger toggle
        const toggleBtn = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.main-menu');
        if (toggleBtn && navMenu) {
          toggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
          });
        }

        // Mobile accordion submenus
        const submenuParents = document.querySelectorAll(".has-submenu > a");
        submenuParents.forEach(link => {
          link.addEventListener("click", e => {
            if (window.innerWidth <= 768) {
              e.preventDefault();
              link.parentElement.classList.toggle("active");
            }
          });
        });

      })
      .catch(err => console.error("Navbar load error:", err));
  }

  // === Google Translate z-index fix after async load ===
  function moveGoogleTranslate() {
    const widget = document.getElementById('google_translate_element');
    if (widget) {
      widget.style.top = '10px';
      widget.style.right = '10px';
      widget.style.zIndex = '100';
    }
  }

  // Slight delay to ensure widget loaded
  window.addEventListener('load', () => setTimeout(moveGoogleTranslate, 500));
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

document.addEventListener("DOMContentLoaded", () => {
  // Toggle main menu
  const menuToggle = document.querySelector(".menu-toggle");
  const mainMenu = document.querySelector("#main-menu");
  menuToggle.addEventListener("click", () => mainMenu.classList.toggle("show"));

  // Toggle top-level dropdowns
  document.querySelectorAll(".menu-item > a").forEach(link => {
    const parent = link.parentElement;
    const dropdown = parent.querySelector(".dropdown");
    if (dropdown) {
      link.addEventListener("click", e => {
        e.preventDefault();
        parent.classList.toggle("active"); // expands dropdown inside column
      });
    }
  });

  // Toggle nested submenus
  document.querySelectorAll(".has-submenu > a").forEach(link => {
    const parent = link.parentElement;
    link.addEventListener("click", e => {
      e.preventDefault();
      parent.classList.toggle("active"); // expands submenu inside dropdown
    });
  });
});



