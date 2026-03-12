// Home Page 
// Review Button
(function () {
  var cards = Array.from(document.querySelectorAll(".review-item"));
  var countText = document.getElementById("reviewCountText");
  var loadBtn = document.getElementById("loadMoreReviews");
  var initialVisible = 6;
  var step = 3;
  var visibleCount = initialVisible;

  function renderReviews() {
    if (!countText || !loadBtn) return;

    var total = cards.length;
    cards.forEach(function (card, index) {
      card.classList.toggle("hidden-review", index >= visibleCount);
    });

    var shown = Math.min(visibleCount, total);
    countText.textContent = "Showing " + shown + " out of " + total;

    if (shown >= total) {
      loadBtn.style.display = "none";
    } else {
      loadBtn.style.display = "inline-flex";
    }
  }

  if (loadBtn) {
    loadBtn.addEventListener("click", function () {
      visibleCount += step;
      renderReviews();
    });
  }

  renderReviews();
})();


//    Interactive Scripts
const openMenuBtn = document.getElementById('openMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const bodyElement = document.body;

if (openMenuBtn && mobileMenu && bodyElement) {
  openMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    bodyElement.classList.add('menu-open');
  });
}

const closeMenu = () => {
  if (mobileMenu && bodyElement) {
    mobileMenu.classList.remove('active');
    bodyElement.classList.remove('menu-open');
  }
};

if (closeMenuBtn) {
  closeMenuBtn.addEventListener('click', closeMenu);
}

if (mobileMenu) {
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });
}

// Load More Reviews Logic
const contactLoadMoreBtn = document.getElementById('contactLoadMoreBtn');
const contactReviewsGrid = document.getElementById('contactReviewsGrid');
const contactShowingText = document.getElementById('contactShowingText');

if (contactLoadMoreBtn && contactReviewsGrid) {
  contactLoadMoreBtn.addEventListener('click', function () {
    contactReviewsGrid.classList.add('show-all');
    contactShowingText.textContent = 'Showing 18 out of 18';
    this.style.display = 'none';
  });
}

// Contact Form Submission Logic
const contactForm = document.getElementById('contactForm');
const contactStatusMessage = document.getElementById('contactStatusMessage');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      mobileNumber: document.getElementById('contactMobile').value,
      location: document.getElementById('contactLocation').value,
      subject: document.getElementById('contactSubject').value,
      message: document.getElementById('contactMessage').value
    };

    // Send the email to the backend
    fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        // Show success after successful fetch
        contactStatusMessage.style.color = 'white';
        contactStatusMessage.style.backgroundColor = '#cc0000'; // Red background
        contactStatusMessage.style.padding = '10px';
        contactStatusMessage.style.borderRadius = '5px';
        contactStatusMessage.style.textAlign = 'center';

        contactStatusMessage.textContent = 'Request Sent Successfully!';
        alert('Request Sent Successfully!');
        contactForm.reset();
      })
      .catch(error => {
        console.error('Error sending email in background:', error);
        contactStatusMessage.style.color = 'white';
        contactStatusMessage.style.backgroundColor = '#cc0000'; // Red background
        contactStatusMessage.style.padding = '10px';
        contactStatusMessage.style.borderRadius = '5px';
        contactStatusMessage.style.textAlign = 'center';
        contactStatusMessage.textContent = 'Failed to connect. Make sure Node server is running!';
        alert('Failed to send! Please ensure backend server is running.');
      });
  });
}