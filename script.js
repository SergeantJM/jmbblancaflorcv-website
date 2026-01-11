// ================= NAVIGATION: Resume <-> Portfolio =================
// If you have nav links, you can still use them, but they won't hide/show pages anymore
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetPage = link.dataset.target;

    // Update nav active class
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Do NOT hide other pages anymore
    pages.forEach(page => {
      page.style.display = "block"; // always visible
      page.classList.remove("active"); // remove CSS conflicts if needed
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ================= PORTFOLIO SLIDESHOW =================
const portfolioImages = Array.from(document.querySelectorAll(".portfolio-grid img"));
let currentIndex = 0;

// Create overlay container
const overlay = document.createElement("div");
overlay.id = "portfolioOverlay";
overlay.style.cssText = `
  position: fixed;
  top:0; left:0; right:0; bottom:0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 999;
`;
document.body.appendChild(overlay);

// Create image element
const overlayImg = document.createElement("img");
overlayImg.style.maxWidth = "90%";
overlayImg.style.maxHeight = "90%";
overlayImg.style.borderRadius = "6px";
overlay.appendChild(overlayImg);

// Create left/right arrows
const leftArrow = document.createElement("div");
const rightArrow = document.createElement("div");
[leftArrow, rightArrow].forEach(arrow => {
  arrow.style.cssText = `
    position: absolute;
    top: 50%;
    font-size: 3rem;
    color: #ffffff;
    cursor: pointer;
    user-select: none;
    transform: translateY(-50%);
    padding: 0 1rem;
    font-weight: bold;
  `;
  overlay.appendChild(arrow);
});
leftArrow.style.left = "0";
leftArrow.innerHTML = "&#10094;"; // left arrow
rightArrow.style.right = "0";
rightArrow.innerHTML = "&#10095;"; // right arrow

// Close overlay on background click
overlay.addEventListener("click", e => {
  if (e.target === overlay) closeOverlay();
});

function openOverlay(index) {
  currentIndex = index;
  overlayImg.src = portfolioImages[currentIndex].src;
  overlay.style.visibility = "visible";
  overlay.style.opacity = "1";
}

function closeOverlay() {
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.visibility = "hidden";
  }, 300);
}

function showNext() {
  currentIndex = (currentIndex + 1) % portfolioImages.length;
  overlayImg.src = portfolioImages[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
  overlayImg.src = portfolioImages[currentIndex].src;
}

// Arrow click events
leftArrow.addEventListener("click", e => {
  e.stopPropagation();
  showPrev();
});
rightArrow.addEventListener("click", e => {
  e.stopPropagation();
  showNext();
});

// Portfolio image click events
portfolioImages.forEach((img, index) => {
  img.addEventListener("click", () => openOverlay(index));
});

// Keyboard navigation
document.addEventListener("keydown", e => {
  if (overlay.style.visibility === "visible") {
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") closeOverlay();
  }
});

// ================= INITIAL STATE =================
// Show both Resume and Portfolio by default
pages.forEach(page => {
  page.style.display = "block"; // always visible
  page.classList.remove("active"); // remove CSS conflicts if needed
});
