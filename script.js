document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Toggle Switch Logic ---
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const toggleBg = document.querySelector(".toggle-bg");
  const heroTitle = document.getElementById("hero-title");
  const heroSub = document.getElementById("hero-sub");

  // Data content for the two views
  // Data content for the two views
  const content = {
    agency: {
      title: "Expertise, on demand.",
      sub: "Access a vetted network of elite freelancers managed by experts. We handle the talent, you take the credit.",
      infoTitle: "Never say 'no' to a client project again.",
      infoDesc:
        "Stop turning away work because your internal team is at capacity. Bizimi provides 'plug-and-play' experts who integrate directly into your workflow.",
      infoBtn: "See how it works",
      infoLink: "#how-it-works",
      infoImg: "imgs/handshake.svg",
      ctaBtn: "Build your team",
      ctaLink: "Signup.html?role=agency"
    },
    freelancer: {
      title: "Work on your terms.",
      sub: "Join an elite network of top-tier clients. We handle the sales and management, you focus on the craft.",
      infoTitle: "Focus on the craft, not the sales.",
      infoDesc:
        "We handle the client acquisition, project management, and billing. You just show up and do what you do best.",
      infoBtn: "Apply to join",
      infoLink: "Signup.html",
      infoImg: "imgs/freelancer.svg",
      ctaBtn: "Find Work",
      ctaLink: "Signup.html"
    },
  };

  toggleBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Update active state visuals
      toggleBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Move the background pill
      // If index is 0 (Agency), move left. If 1 (Freelancer), move right.
      toggleBg.style.transform =
        index === 0 ? "translateX(0)" : "translateX(100%)";

      // Toggle Body Class for Background Transition
      if (index === 1) {
        document.body.classList.add("freelancer-mode");
      } else {
        document.body.classList.remove("freelancer-mode");
      }

      // Change Text Content with a quick fade effect
      const targetKey = btn.getAttribute("data-target");
      animateTextChange(targetKey);
    });
  });

  function animateTextChange(key) {
    const heroContent = document.querySelector(".hero-content");
    const infoText = document.querySelector(".info-text"); // wrapper for info section text
    const infoImage = document.querySelector(".info-image"); // wrapper for info image

    // Fade out
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(10px)";

    if (infoText) {
      infoText.style.opacity = "0";
      infoText.style.transform = "translateY(10px)";
      infoText.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    }

    if (infoImage) {
      infoImage.style.opacity = "0";
      infoImage.style.transform = "translateY(10px)";
      infoImage.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    }

    heroContent.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    setTimeout(() => {
      // Update Hero Text
      heroTitle.innerText = content[key].title;
      heroSub.innerText = content[key].sub;

      // Update Info Section Text
      const infoTitle = document.getElementById("info-title");
      const infoDesc = document.getElementById("info-desc");
      const infoBtn = document.getElementById("info-btn");
      const infoImg = document.getElementById("info-img");

      if (infoTitle) infoTitle.innerText = content[key].infoTitle;
      if (infoDesc) infoDesc.innerText = content[key].infoDesc;
      if (infoBtn) {
          infoBtn.innerText = content[key].infoBtn;
          infoBtn.href = content[key].infoLink;
      }
      if (infoImg) infoImg.src = content[key].infoImg;

      // Update CTA Button Text
      const ctaBtn = document.getElementById("main-cta-btn");
      if (ctaBtn) {
          ctaBtn.innerText = content[key].ctaBtn;
          ctaBtn.href = content[key].ctaLink;
      }

      // Fade in
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";

      if (infoText) {
        infoText.style.opacity = "1";
        infoText.style.transform = "translateY(0)";
      }

      if (infoImage) {
        infoImage.style.opacity = "1";
        infoImage.style.transform = "translateY(0)";
      }
    }, 300);
  }

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

  // --- 4. Signup Page Logic (Role & Skills) ---
  const roleCards = document.querySelectorAll(".role-card");
  const roleInput = document.getElementById("selected-role");

  if (roleCards.length > 0) {
      const freelancerForm = document.getElementById('freelancer-form');
      const agencyForm = document.getElementById('agency-form');

      // Initialize transition classes for forms
      if (freelancerForm) freelancerForm.classList.add('fade-transition');
      if (agencyForm) agencyForm.classList.add('fade-transition');

      roleCards.forEach(card => {
          card.addEventListener('click', () => {
              // Ignore if already active
              if (card.classList.contains('active')) return;

              // Remove active class from all
              roleCards.forEach(c => c.classList.remove('active'));
              // Add to clicked
              card.classList.add('active');
              
              const role = card.getAttribute('data-role');
              // Update hidden inputs if needed (though now we have separate forms, checking role might be done via which form is submitted)
              if (roleInput) roleInput.value = role; // Keep this if the hidden input is still used for form submission

              let showForm, hideForm;
              if (role === 'agency') {
                  showForm = agencyForm;
                  hideForm = freelancerForm;
              } else {
                  showForm = freelancerForm;
                  hideForm = agencyForm;
              }

              if (showForm && hideForm) {
                  // Animate Switch
                  hideForm.classList.add('fade-out');

                  setTimeout(() => {
                      hideForm.style.display = 'none';
                      hideForm.classList.add('hidden-form'); // Ensure it stays hidden via class if needed
                      
                      showForm.classList.remove('hidden-form'); // Remove !important class
                      showForm.style.display = 'block';
                      
                      showForm.classList.add('fade-out'); // Ensure it starts invisible
                      
                      requestAnimationFrame(() => {
                          showForm.classList.remove('fade-out');
                      });
                  }, 300);
              }
          });
      });

      // Check URL parameters for pre-selection
      const urlParams = new URLSearchParams(window.location.search);
      const preSelectedRole = urlParams.get('role');
      if (preSelectedRole) {
          const targetCard = document.querySelector(`.role-card[data-role="${preSelectedRole}"]`);
          if (targetCard) {
              targetCard.click();
          }
      }
  }

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

  // Skills Logic
  const skillsData = [
    "Web Development",
    "Mobile App Development",
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",
    "UI/UX Design",
    "Software Development",
    "Game Development",
    "Blockchain Development",
    "Data Science",
    "Machine Learning",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "Digital Marketing",
    "Content Writing",
    "Graphic Design",
    "Video Editing",
  ];

  const skillSearch = document.getElementById("skill-search");
  const skillsDropdown = document.getElementById("skills-dropdown");
  const selectedSkillsList = document.getElementById("selected-skills-list");
  const otherSkillWrapper = document.getElementById("other-skill-wrapper");
  const otherSkillInput = document.getElementById("other-skill-input");
  const skillCountDisplay = document.getElementById("skill-count");

  let selectedSkills = [];
  const MAX_SKILLS = 10;

  if (skillSearch && skillsDropdown && selectedSkillsList) {
    // Toggle Dropdown
    skillSearch.addEventListener("focus", () => {
      renderDropdown(skillSearch.value);
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !skillSearch.contains(e.target) &&
        !skillsDropdown.contains(e.target)
      ) {
        skillsDropdown.classList.remove("visible");
      }
    });

    // Search Handler
    skillSearch.addEventListener("input", (e) => {
      renderDropdown(e.target.value);
    });

    // Render Dropdown
    function renderDropdown(filter = "") {
      skillsDropdown.innerHTML = "";
      const lowerFilter = filter.toLowerCase();

      let matches = skillsData.filter(
        (skill) =>
          skill.toLowerCase().includes(lowerFilter) &&
          !selectedSkills.includes(skill),
      );

      // Add "Others" option logic
      const othersOption = document.createElement("li");
      othersOption.textContent = "Others (Add Custom)";
      othersOption.style.color = "#f58025"; // Accent color for Others
      othersOption.addEventListener("click", () => {
        showOtherInput();
        skillsDropdown.classList.remove("visible");
        skillSearch.value = "";
      });

      if (matches.length > 0) {
        matches.forEach((skill) => {
          const li = document.createElement("li");
          li.textContent = skill;
          li.addEventListener("click", () => {
            addSkill(skill);
            skillsDropdown.classList.remove("visible");
            skillSearch.value = "";
          });
          skillsDropdown.appendChild(li);
        });
      } else if (filter.length > 0) {
        // No matches found, only show Others? Or show "No results"
        const noRes = document.createElement("li");
        noRes.textContent = "No matches found";
        noRes.style.color = "#555";
        noRes.style.cursor = "default";
        skillsDropdown.appendChild(noRes);
      }

      // Always append Others at the bottom
      skillsDropdown.appendChild(othersOption);
      skillsDropdown.classList.add("visible");
    }

    function showOtherInput() {
      if (otherSkillWrapper) {
        otherSkillWrapper.style.display = "block";
        if (otherSkillInput) otherSkillInput.focus();
      }
    }

    // Handle Other Input Enter Key
    if (otherSkillInput) {
      otherSkillInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent form submit
          const val = otherSkillInput.value.trim();
          if (val) {
            addSkill(val);
            otherSkillInput.value = "";
            otherSkillWrapper.style.display = "none";
          }
        }
      });
    }

    function addSkill(skill) {
      if (selectedSkills.length >= MAX_SKILLS) return;
      if (selectedSkills.includes(skill)) return;

      selectedSkills.push(skill);
      renderSelectedSkills();
      updateCount();
    }

    function removeSkill(skill) {
      selectedSkills = selectedSkills.filter((s) => s !== skill);
      renderSelectedSkills();
      updateCount();
    }

    function renderSelectedSkills() {
      selectedSkillsList.innerHTML = "";
      selectedSkills.forEach((skill) => {
        const pill = document.createElement("div");
        pill.className = "skill-pill-remove";
        pill.innerHTML = `${skill} <span class="skill-remove-btn">&times;</span>`;

        // Remove click handler
        pill
          .querySelector(".skill-remove-btn")
          .addEventListener("click", (e) => {
            e.stopPropagation();
            removeSkill(skill);
          });

        selectedSkillsList.appendChild(pill);
      });
    }

    function updateCount() {
      if (skillCountDisplay) {
        skillCountDisplay.innerText = selectedSkills.length;
      }
    }
  }

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
    { id: "freelancer-form", successMsg: "Freelancer account created successfully!" },
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
