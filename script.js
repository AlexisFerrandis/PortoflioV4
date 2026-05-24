const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
	my = 0,
	rx = 0,
	ry = 0;

document.addEventListener("mousemove", (e) => {
	mx = e.clientX;
	my = e.clientY;
	cursor.style.left = mx + "px";
	cursor.style.top = my + "px";
});

(function animRing() {
	rx += (mx - rx) * 0.12;
	ry += (my - ry) * 0.12;
	ring.style.left = rx + "px";
	ring.style.top = ry + "px";
	requestAnimationFrame(animRing);
})();

const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
	nav.classList.toggle("scrolled", window.scrollY > 60);
});

const particlesEl = document.getElementById("particles");
for (let i = 0; i < 24; i++) {
	const p = document.createElement("div");
	p.className = "particle";
	p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${Math.random() * 2 + 1}px;
    height: ${Math.random() * 2 + 1}px;
    animation-duration: ${Math.random() * 20 + 15}s;
    animation-delay: ${Math.random() * 15}s;
  `;
	particlesEl.appendChild(p);
}

const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
	(entries) => {
		entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("visible");
				if (e.target.classList.contains("expertise-card")) {
					e.target.classList.add("visible");
				}
				io.unobserve(e.target);
			}
		});
	},
	{ threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
);

reveals.forEach((el) => io.observe(el));

const expertiseCards = document.querySelectorAll(".expertise-card");
const ioExp = new IntersectionObserver(
	(entries) => {
		entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("visible");
			}
		});
	},
	{ threshold: 0.2 },
);
expertiseCards.forEach((c) => ioExp.observe(c));

document.querySelectorAll('a[href^="#"]').forEach((a) => {
	a.addEventListener("click", (e) => {
		const target = document.querySelector(a.getAttribute("href"));
		if (target) {
			e.preventDefault();
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	});
});
