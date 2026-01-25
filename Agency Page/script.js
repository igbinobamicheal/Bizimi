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
    },
    freelancer: {
      title: "Work on your terms.",
      sub: "Join an elite network of top-tier clients. We handle the sales and management, you focus on the craft.",
      infoTitle: "Focus on the craft, not the sales.",
      infoDesc:
        "We handle the client acquisition, project management, and billing. You just show up and do what you do best.",
      infoBtn: "Apply to join",
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

    // Fade out
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(10px)";

    if (infoText) {
      infoText.style.opacity = "0";
      infoText.style.transform = "translateY(10px)";
      infoText.style.transition = "opacity 0.3s ease, transform 0.3s ease";
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

      if (infoTitle) infoTitle.innerText = content[key].infoTitle;
      if (infoDesc) infoDesc.innerText = content[key].infoDesc;
      if (infoBtn) infoBtn.innerText = content[key].infoBtn;

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
});
