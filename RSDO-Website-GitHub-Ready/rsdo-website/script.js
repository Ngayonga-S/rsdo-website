const preloader = document.getElementById("preloader");
window.addEventListener("load", () => setTimeout(() => preloader.classList.add("hide"), 450));

const header = document.getElementById("header");
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menu-toggle");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
});

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("mobile-open");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => navbar.classList.remove("mobile-open"));
});

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-link");

function updateActiveNav() {
    const position = window.scrollY + 180;
    sections.forEach(section => {
        if (position >= section.offsetTop && position < section.offsetTop + section.offsetHeight) {
            links.forEach(link => link.classList.remove("active"));
            const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (active) active.classList.add("active");
        }
    });
}
window.addEventListener("scroll", updateActiveNav);

const backTop = document.getElementById("back-top");
window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 500);
});
backTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

document.getElementById("year").textContent = new Date().getFullYear();

const counters = document.querySelectorAll("[data-target]");
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;
    const impact = document.getElementById("impact");
    if (impact.getBoundingClientRect().top < window.innerHeight * .8) {
        countersStarted = true;
        counters.forEach(counter => {
            const target = Number(counter.dataset.target);
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 45));
            const run = () => {
                current += step;
                counter.textContent = current >= target ? target : current;
                if (current < target) requestAnimationFrame(run);
            };
            run();
        });
    }
}
window.addEventListener("scroll", startCounters);

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {threshold: .12});
revealItems.forEach(item => observer.observe(item));

const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");

form.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        note.textContent = "Please complete the required fields.";
        note.style.color = "#b33a32";
        note.classList.add("show");
        return;
    }

    const mailSubject = encodeURIComponent(subject || "Website Enquiry - RSDO");
    const mailBody = encodeURIComponent(
`Name: ${name}

Email: ${email}

Message:
${message}`
    );

    note.textContent = "Opening your email application...";
    note.style.color = "#21864b";
    note.classList.add("show");

    window.location.href =
        `mailto:rsdo.official@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    setTimeout(() => form.reset(), 300);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") navbar.classList.remove("mobile-open");
});
