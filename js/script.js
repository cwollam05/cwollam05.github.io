/* ===========================================
   EXPLORLANDO GLOBAL SCRIPTS
   =========================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  initFilterDropdown();
  initNavigation();
});

/* ===========================================
   FILTER DROPDOWN FUNCTIONALITY
   =========================================== */
function initFilterDropdown() {
  const filterToggle = document.getElementById("filterToggle");
  const filterMenu = document.getElementById("filterMenu");

  if (filterToggle && filterMenu) {
    filterToggle.addEventListener("click", function(e) {
      e.stopPropagation();
      filterMenu.style.display = filterMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function(e) {
      if (!filterToggle.contains(e.target) && !filterMenu.contains(e.target)) {
        filterMenu.style.display = "none";
      }
    });
  }
}

// Legacy function for inline onclick handlers
function toggleFilter() {
  const menu = document.getElementById("filterMenu");
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}

/* ===========================================
   NAVIGATION FUNCTIONS
   =========================================== */
function initNavigation() {
  // Set active nav item based on current page
  const currentPage = window.location.pathname.split('/').pop();
  const navButtons = document.querySelectorAll('.nav-btn');

  navButtons.forEach(function(btn) {
    const href = btn.getAttribute('href');
    if (href && href.includes(currentPage)) {
      btn.classList.add('active');
    }
  });
}

// Navigation helper functions
function goToLogin() {
  window.location.href = "login.html";
}

function goToProfile() {
  window.location.href = "profile.html";
}

function goToCreateAccount1() {
  window.location.href = "create-account1.html";
}

function goToCreateAccount2() {
  window.location.href = "create-account2.html";
}

function goToEditProfile() {
  window.location.href = "edit-profile.html";
}

function goToHome() {
  window.location.href = "home.html";
}

function goToAttractions() {
  window.location.href = "attractions.html";
}

function goToOpenLobby() {
  window.location.href = "open-lobby.html";
}

function goToSettings() {
  window.location.href = "settings.html";
}

function goToSpotlight() {
  window.location.href = "spotlight.html";
}

function goToForBusiness() {
  window.location.href = "for_business.html";
}

function goToAboutUs() {
  window.location.href = "aboutus.html";
}

function goBack() {
  window.history.back();
}

/* ===========================================
   COPY CODE FUNCTIONALITY (Discounts)
   =========================================== */
function copyCode(code) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(function() {
      alert("Code copied: " + code);
    }).catch(function() {
      fallbackCopyCode(code);
    });
  } else {
    fallbackCopyCode(code);
  }
}

function fallbackCopyCode(code) {
  const textArea = document.createElement("textarea");
  textArea.value = code;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    alert("Code copied: " + code);
  } catch (err) {
    alert("Failed to copy code. Please copy manually: " + code);
  }
  document.body.removeChild(textArea);
}

/* ===========================================
   FORM HANDLING
   =========================================== */
function handleFormSubmit(event, redirectUrl) {
  event.preventDefault();
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
}

/* ===========================================
   UTILITY FUNCTIONS
   =========================================== */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
