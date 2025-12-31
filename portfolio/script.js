
// ==================== Main Script for Portfolio ====================
// Defensive: all DOM queries check existence before use

// Navigation & active link
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link') || [];
const sections = document.querySelectorAll('section') || [];

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }

    // active nav link
    let current = '';
    sections.forEach(section => {
        const id = section.getAttribute('id');
        const top = section.offsetTop;
        if (window.pageYOffset >= top - 200) current = id;
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href') || '';
        if (href.slice(1) === current) link.classList.add('active');
    });
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (navMenu) navMenu.classList.toggle('active');
    });
}
// close mobile menu on nav link click
navLinks.forEach(link => link.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
}));

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Typing effect (safe)
const typedTextSpan = document.querySelector('.typed-text');
const textArray = [
    'Spécialiste Réseaux',
    'Expert Cybersécurité',
    'Administrateur Systèmes',
    'Développeur Full-Stack',
    'Formateur IT'
];
const typingDelay = 100, erasingDelay = 50, newTextDelay = 2000;
let textArrayIndex = 0, charIndex = 0;

function type() {
    if (!typedTextSpan) return;
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}
function erase() {
    if (!typedTextSpan) return;
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, typingDelay + 500);
    }
}
if (typedTextSpan) document.addEventListener('DOMContentLoaded', () => setTimeout(type, newTextDelay + 250));

// Particles (optional)
(function() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.5)`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        return particle;
    }

    for (let i = 0; i < 30; i++) heroParticles.appendChild(createParticle());

    const style = document.createElement('style');
    style.textContent = `@keyframes float {0%,100%{transform:translate(0,0) scale(1);opacity:0}25%{opacity:0.3}50%{opacity:0.5}75%{opacity:0.3}}`;
    document.head.appendChild(style);
})();

// Intersection observer for reveal + progress bars
const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList && entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress') || '0';
                    setTimeout(() => progressBar.style.width = progress + '%', 300);
                }
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .skill-card, .project-card, .fade-in').forEach(el => observer.observe(el));

// Scroll progress
(function(){
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = 'position:fixed;top:0;left:0;height:4px;background:linear-gradient(135deg,#4158D0 0%,#C850C0 100%);z-index:9999;transition:width 0.1s ease-out;width:0%';
    document.body.appendChild(scrollProgress);
    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const pct = h ? (window.pageYOffset / h) * 100 : 0;
        scrollProgress.style.width = pct + '%';
    }, { passive: true });
})();

// Mouse follower (desktop)
(function(){
    const mouseFollower = document.createElement('div');
    mouseFollower.style.cssText = 'position:fixed;width:20px;height:20px;border-radius:50%;background:rgba(65,88,208,0.3);pointer-events:none;z-index:9999;transition:transform 0.2s ease-out;display:none';
    document.body.appendChild(mouseFollower);
    let mouseX=0, mouseY=0, fX=0, fY=0;
    document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
    function animateFollower(){ const dx = mouseX - fX, dy = mouseY - fY; fX += dx * 0.1; fY += dy * 0.1; mouseFollower.style.left = fX + 'px'; mouseFollower.style.top = fY + 'px'; requestAnimationFrame(animateFollower); }
    if (window.innerWidth > 768) { mouseFollower.style.display = 'block'; animateFollower(); }
})();

// Interactive hover tilt for cards
(function(){
    const cards = document.querySelectorAll('.skill-card, .project-card, .timeline-content');
    if (!cards) return;
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px) scale(1.02)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const rotateX = (y - rect.height/2) / 20;
            const rotateY = (rect.width/2 - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
    });
})();

// Parallax hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.hero-image, .hero-text').forEach((el, i) => el.style.transform = `translateY(${scrolled * ((i+1)*0.03)}px)`);
});

// Contact form handler (safe)
(function(){
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const successMessage = document.createElement('div');
        successMessage.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#4158D0 0%,#C850C0 100%);color:#fff;padding:2rem 3rem;border-radius:15px;z-index:10000;text-align:center;';
        successMessage.innerHTML = '<i class="fas fa-check-circle" style="font-size:3rem;margin-bottom:1rem"></i><h3 style="margin-bottom:.5rem">Message envoyé avec succès!</h3><p>Je vous répondrai dans les plus brefs délais.</p>';
        document.body.appendChild(successMessage);
        contactForm.reset();
        setTimeout(()=>{ successMessage.style.opacity = '0'; setTimeout(()=> successMessage.remove(), 500); }, 3000);
    });
})();

// Skill tags hover
(function(){
    const tags = document.querySelectorAll('.skill-tag, .project-tags span');
    tags.forEach((tag, i) => {
        tag.style.animationDelay = `${i*0.1}s`;
        tag.addEventListener('mouseenter', function(){ this.style.transform='scale(1.1) rotate(3deg)'; this.style.background='linear-gradient(135deg,#4158D0 0%,#C850C0 100%)'; this.style.color='white'; });
        tag.addEventListener('mouseleave', function(){ this.style.transform='scale(1) rotate(0deg)'; this.style.background='linear-gradient(135deg, rgba(65, 88, 208, 0.1), rgba(200, 80, 192, 0.1))'; this.style.color='var(--primary-color)'; });
    });
})();

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0; const increment = target / (duration / 16);
    const timer = setInterval(() => { start += increment; if (start >= target) { element.textContent = target; clearInterval(timer); } else element.textContent = Math.floor(start); }, 16);
}

// Lazy load images
(function(){
    const imgs = document.querySelectorAll('img');
    if (!imgs) return;
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target; img.src = img.dataset.src || img.src; img.classList.add('loaded'); imageObserver.unobserve(img);
            }
        });
    });
    imgs.forEach(img => imageObserver.observe(img));
})();

// Dynamic background hover (safe)
(function(){
    const sectionList = document.querySelectorAll('section');
    if (!sectionList) return;
    sectionList.forEach(section => section.addEventListener('mouseenter', function(){ if (!this.style.backgroundImage) this.style.transition = 'background 0.5s ease'; }));
})();

// Ripple effect on buttons
(function(){
    const buttons = document.querySelectorAll('.btn, .social-link, .project-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e){
            const ripple = document.createElement('span');
            ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.6);width:0;height:0;transform:translate(-50%,-50%);animation:ripple 0.6s ease-out;pointer-events:none;';
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px'; ripple.style.top = (e.clientY - rect.top) + 'px';
            this.style.position = this.style.position || 'relative'; this.style.overflow = 'hidden'; this.appendChild(ripple);
            setTimeout(()=> ripple.remove(), 600);
        });
    });
    const rippleStyle = document.createElement('style'); rippleStyle.textContent = '@keyframes ripple{to{width:300px;height:300px;opacity:0}}'; document.head.appendChild(rippleStyle);
})();

// Skill cards: accordion toggle + keyboard support
(function(){
    const interactiveSkills = document.querySelectorAll('.skill-card[role="button"]');
    if (!interactiveSkills || interactiveSkills.length === 0) return;

    interactiveSkills.forEach(card => {
        const details = card.querySelector('.skill-details');

        function toggle(expand) {
            const shouldExpand = typeof expand === 'boolean' ? expand : !card.classList.contains('expanded');
            if (shouldExpand) {
                // close others
                interactiveSkills.forEach(other => {
                    if (other !== card) {
                        other.classList.remove('expanded');
                        other.setAttribute('aria-expanded', 'false');
                        const d = other.querySelector('.skill-details'); if (d) d.setAttribute('aria-hidden', 'true');
                    }
                });
                card.classList.add('expanded'); card.setAttribute('aria-expanded', 'true'); if (details) details.setAttribute('aria-hidden', 'false');
            } else {
                card.classList.remove('expanded'); card.setAttribute('aria-expanded', 'false'); if (details) details.setAttribute('aria-hidden', 'true');
            }
        }

        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return; toggle();
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    });
})();

// Tooltip on hover for skill cards
(function(){
    const skillCards = document.querySelectorAll('.skill-card');
    if (!skillCards || skillCards.length === 0) return;

    skillCards.forEach(card => {
        const details = card.querySelector('.skill-details');
        const tooltip = document.createElement('div'); tooltip.className = 'skill-tooltip';
        let text = details && details.textContent.trim() ? details.textContent.trim() : (card.querySelector('p') ? card.querySelector('p').textContent.trim() : '');
        tooltip.textContent = text.split('\n').join(' ').slice(0, 160);
        document.body.appendChild(tooltip);

        function show() {
            const rect = card.getBoundingClientRect();
            const top = rect.top + window.scrollY - 10;
            const left = rect.left + window.scrollX + rect.width + 12;
            tooltip.style.left = left + 'px'; tooltip.style.top = top + 'px'; tooltip.classList.add('visible');
        }
        function hide() { tooltip.classList.remove('visible'); }

        card.addEventListener('mouseenter', show); card.addEventListener('mouseleave', hide);
        card.addEventListener('focus', show); card.addEventListener('blur', hide);
        window.addEventListener('scroll', hide, { passive: true });
    });
})();