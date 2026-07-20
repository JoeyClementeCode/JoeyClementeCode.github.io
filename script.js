document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimateSections();
    initScrollNearVideoAudio();
});

function initScrollAnimateSections() {
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

    sections.forEach((section) => observer.observe(section));
}

function initScrollNearVideoAudio() {
    const videos = [...document.querySelectorAll("#info video")];
    if (!videos.length) return;

    let activeVideo = null;
    const visibility = new Map();

    const updateActiveVideo = () => {
        let bestVideo = null;
        let bestRatio = 0;

        videos.forEach((video) => {
            const ratio = visibility.get(video) || 0;
            if (ratio >= 0.35 && ratio > bestRatio) {
                bestRatio = ratio;
                bestVideo = video;
            }
        });

        if (bestVideo === activeVideo) return;

        if (activeVideo) {
            activeVideo.muted = true;
        }

        activeVideo = bestVideo;

        if (activeVideo) {
            activeVideo.muted = false;
            activeVideo.play().catch(() => {
                activeVideo.muted = true;
            });
        }
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                visibility.set(
                    entry.target,
                    entry.isIntersecting ? entry.intersectionRatio : 0
                );
            });
            updateActiveVideo();
        },
        {
            threshold: [0, 0.25, 0.35, 0.5, 0.75, 1],
        }
    );

    videos.forEach((video) => {
        video.muted = true;
        video.playsInline = true;
        observer.observe(video);
    });
}
