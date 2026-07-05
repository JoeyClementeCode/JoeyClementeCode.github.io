document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".scroll-animate-section");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px",
        }
    );
    // Hmmm
    sections.forEach((section) => observer.observe(section));
});
