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
    .then(res => res.text())
    .then(data => {
      navbarContainer.innerHTML = data;

      const toggleBtn = document.querySelector('.menu-toggle');
      const navMenu = document.querySelector('.main-menu');
      if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
          navMenu.classList.toggle('show');
        });
      }

      /*// === Load Footer dynamically ===
      (() => {
      const footerContainer = document.getElementById("footer");
      if (!footerContainer) return;

    footerContainer.innerHTML = `
    <footer>
      <p>&copy; ${new Date().getFullYear()} EAPacRC Secretariat. All rights reserved.</p>
    </footer>
  `;
  })();*/

      // === Mobile collapsible submenus ===
      const submenuParents = document.querySelectorAll(".has-submenu > a");
      submenuParents.forEach(link => {
        link.addEventListener("click", e => {
          if (window.innerWidth <= 768) {
            e.preventDefault(); // stop navigation
            const submenu = link.nextElementSibling;
            submenu.classList.toggle("open");

            // Smooth toggle
            if (submenu.classList.contains("open")) {
              submenu.style.display = "flex";
            } else {
              submenu.style.display = "none";
            }
          }
        });
      });
    })
    .catch(err => console.error("Navbar load error:", err));
})();


// === Load Footer dynamically ===
  (() => {
    const footerContainer = document.getElementById("footer");
    if (!footerContainer) return;

    fetch("footer.html")
      .then(res => res.text())
      .then(data => {
        footerContainer.innerHTML = data;
      })
      .catch(err => {
        console.error("Footer load error:", err);
        // Fallback if footer.html fails
        footerContainer.innerHTML = `
          <footer>
            <p>&copy; ${new Date().getFullYear()} EAPacRC Secretariat. All rights reserved.</p>
          </footer>
        `;
      });
  })();
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






