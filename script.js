document.addEventListener("DOMContentLoaded", () => {


  // --- 2. Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Select elements to animate
  const animatedElements = document.querySelectorAll(".fade-up, .fade-in");
  animatedElements.forEach((el) => observer.observe(el));



  // --- Password Toggle Logic (Generalized) ---
  const toggleButtons = document.querySelectorAll('.toggle-password');
  toggleButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          // Find the closest parent that contains the input, then query for inputs within it
          const inputContainer = this.closest('.password-input-wrapper') || this.parentElement;
          const inputValues = inputContainer ? inputContainer.querySelectorAll('input[type="password"], input[type="text"]') : [];
          
          inputValues.forEach(input => {
             const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
             input.setAttribute('type', type);
             
             // Apply color change to the toggle button itself
             if (type === 'text') {
                 this.style.color = 'white';
             } else {
                 this.style.color = ''; 
             }
          });
      });
  });



  // --- 5. Mobile Menu Logic ---
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.getElementById("nav-menu");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenuBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        mobileMenuBtn.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });

    // Close menu when any interaction element inside corresponds to a specific action
    const menuItems = navMenu.querySelectorAll("a, button.toggle-btn");
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Close menu to allow user to see the content change or navigate
        mobileMenuBtn.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // --- 6. Toast Notification System ---
  function showToast(message, type = "success") {
    // Create container if it doesn't exist
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    // Create Toast Element
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    // Icon based on type
    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-message">${message}</div>
    `;

    // Append to container
    container.appendChild(toast);

    // Trigger Animation
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      }, 400); // Wait for transition out
    }, 4000);
  }

  // Handle Form Submissions with Toasts
  const forms = [
    { id: "agency-form", successMsg: "Agency account created successfully!" },
    { id: "login-form", successMsg: "Logged in successfully! Redirecting..." }
  ];

  forms.forEach(formData => {
    const form = document.getElementById(formData.id);
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Simulate loading state if needed
        const btn = form.querySelector("button[type='submit']");
        const originalText = btn ? btn.innerText : "Submit";
        
        if (btn) {
           btn.innerText = "Processing...";
           btn.disabled = true;
        }

        // Simulate API call
        setTimeout(() => {
            showToast(formData.successMsg, "success");
            
            if (btn) {
                btn.innerText = originalText;
                btn.disabled = false;
            }

            if (formData.id === "login-form") {
                setTimeout(() => {
                    // Redirect logic here if needed, for now just reload or go to index
                    window.location.href = "index.html"; 
                }, 1500);
            } else {
                form.reset();
            }

        }, 1500);
      });
    }
  });

});
