document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Toggle Switch Logic ---
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const toggleBg = document.querySelector(".toggle-bg");
  const heroTitle = document.getElementById("hero-title");
  const heroSub = document.getElementById("hero-sub");

  // Data content for the two views
  const content = {
    agency: {
      title: "Expertise, on demand.",
      sub: "Access a vetted network of elite freelancers managed by experts. We handle the talent, you take the credit.",
      infoTitle: "Never say 'no' to a client project again.",
      infoDesc:
        "Stop turning away work because your internal team is at capacity. Bizimi provides 'plug-and-play' experts who integrate directly into your workflow.",
      infoBtn: "See how it works",
      infoImg: "imgs/handshake.svg",
    },
    freelancer: {
      title: "Work on your terms.",
      sub: "Join an elite network of top-tier clients. We handle the sales and management, you focus on the craft.",
      infoTitle: "Focus on the craft, not the sales.",
      infoDesc:
        "We handle the client acquisition, project management, and billing. You just show up and do what you do best.",
      infoBtn: "Apply to join",
      infoImg: "imgs/freelancer.svg",
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
      if (infoBtn) infoBtn.innerText = content[key].infoBtn;
      if (infoImg) infoImg.src = content[key].infoImg;

      // Update CTA Button Text
      const ctaBtn = document.getElementById("main-cta-btn");
      if (key === "freelancer") {
        ctaBtn.innerText = "Find Work";
      } else {
        ctaBtn.innerText = "Build your team";
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
  // --- 3. Password Toggle Logic ---
  const togglePassword = document.querySelector(".toggle-password");
  const passwordInput = document.querySelector("#password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Optional: Toggle icon styling if needed (e.g. changing the SVG)
      // For now, we just toggle visibility property
      if (type === "text") {
        togglePassword.style.color = "white";
      } else {
        togglePassword.style.color = ""; // Reset to default
      }
    });
  }
  // --- 4. Signup Page Logic (Role & Skills) ---
  const roleCards = document.querySelectorAll(".role-card");
  const roleInput = document.getElementById("selected-role");

  if (roleCards.length > 0) {
    // Elements to toggle
    const freelancerFields = document.querySelectorAll(".freelancer-only");
    const agencyFields = document.querySelectorAll(".agency-only");
    const usernameInput = document.getElementById("username");
    const companyNameInput = document.getElementById("company-name");
    const companySizeInput = document.getElementById("company-size");
    const submitBtn = document.getElementById("submit-btn");

    // Initialize transition classes for all fields
    const allToggleFields = [...freelancerFields, ...agencyFields];
    allToggleFields.forEach((el) => el.classList.add("fade-transition"));

    roleCards.forEach((card) => {
      card.addEventListener("click", () => {
        // Ignore if already active
        if (card.classList.contains("active")) return;

        // Remove active class from all
        roleCards.forEach((c) => c.classList.remove("active"));
        // Add to clicked
        card.classList.add("active");

        const role = card.getAttribute("data-role");
        if (roleInput) roleInput.value = role;

        // Define which sets to show/hide
        let showSet, hideSet;
        if (role === "agency") {
          showSet = agencyFields;
          hideSet = freelancerFields;

          // Update required attributes
          if (usernameInput) usernameInput.removeAttribute("required");
          if (companyNameInput)
            companyNameInput.setAttribute("required", "true");
          if (companySizeInput)
            companySizeInput.setAttribute("required", "true");

          if (submitBtn) submitBtn.innerText = "Create Agency Account";
        } else {
          showSet = freelancerFields;
          hideSet = agencyFields;

          // Update required attributes
          if (usernameInput) usernameInput.setAttribute("required", "true");
          if (companyNameInput) companyNameInput.removeAttribute("required");
          if (companySizeInput) companySizeInput.removeAttribute("required");

          if (submitBtn) submitBtn.innerText = "Create Freelancer Account";
        }

        // Animate Switch
        // 1. Fade out current
        hideSet.forEach((el) => el.classList.add("fade-out"));

        setTimeout(() => {
          // 2. Hide current, Show new (but keep invisible)
          hideSet.forEach((el) => el.classList.add("hidden"));
          showSet.forEach((el) => {
            el.classList.add("fade-out"); // Ensure it starts invisible
            el.classList.remove("hidden");
          });

          // 3. Trigger reflow / small delay to allow browser to render 'fade-out' state for new elements
          requestAnimationFrame(() => {
            // 4. Fade in new
            showSet.forEach((el) => el.classList.remove("fade-out"));
          });
        }, 300); // Wait for fade out
      });
    });
  }

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
});
