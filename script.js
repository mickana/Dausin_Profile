// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');

            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation links on scroll + scroll progress
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const progressBar = document.querySelector('.scroll-progress-bar');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const id = section.getAttribute('id');

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Update scroll progress bar
    if (progressBar) {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Scroll reveal – animations for every content block
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '50px',
    duration: 800,
    delay: 150,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    reset: false
});

// Hero
sr.reveal('.hero-content', { duration: 1000, delay: 200 });

// Section headers (every section)
sr.reveal('.section-header', { origin: 'top', distance: '40px', duration: 700, delay: 100 });

// Biography / About
sr.reveal('.about-image', { origin: 'left', distance: '60px', duration: 900 });
sr.reveal('.personal-info', { origin: 'right', distance: '60px', duration: 900, delay: 150 });
sr.reveal('.bio-description', { origin: 'right', distance: '60px', duration: 900, delay: 250 });
sr.reveal('.info-item', { interval: 80, duration: 600 });
sr.reveal('.bio-pill', { interval: 100, duration: 500 });

// Education
sr.reveal('.education-card', { interval: 180, duration: 800 });

// Skills
sr.reveal('.skill-category', { interval: 200, duration: 850 });
sr.reveal('.skill-item', { interval: 60, duration: 500 });

// Projects
sr.reveal('.project-card', { interval: 160, duration: 800 });

// Get in Touch
sr.reveal('.contact-info .info-card', { interval: 150, duration: 700 });
sr.reveal('.contact-form', { origin: 'right', distance: '50px', duration: 850 });

// Footer
sr.reveal('.footer-content', { origin: 'bottom', distance: '40px', duration: 700 });
sr.reveal('.footer-links', { origin: 'bottom', distance: '40px', duration: 700, delay: 100 });
sr.reveal('.footer-contact', { origin: 'bottom', distance: '40px', duration: 700, delay: 150 });
sr.reveal('.footer-bottom', { duration: 600, delay: 200 });

// Dividers
sr.reveal('.section-divider', { duration: 800, opacity: 0.3, scale: 0.98 });

// Resume Modal Functions
function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById('resumeModal');
    if (event.target === modal) {
        closeResumeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeResumeModal();
    }
});

// Typewriter effect in hero subtitle
(function () {
    const roleElement = document.getElementById('hero-role');
    if (!roleElement) return;

    const roles = [
        'Web Developer',
        'IT Student',
        'Frontend Enthusiast',
        'UI/UX Explorer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let typing = true;

    function tick() {
        const current = roles[roleIndex];

        if (typing) {
            charIndex++;
            if (charIndex === current.length) {
                typing = false;
                setTimeout(tick, 1000);
            } else {
                setTimeout(tick, 80);
            }
        } else {
            charIndex--;
            if (charIndex === 0) {
                typing = true;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(tick, 200);
            } else {
                setTimeout(tick, 40);
            }
        }

        roleElement.textContent = current.slice(0, charIndex);
    }

    tick();
})();

// Interactive particle background (Three.js with 2D fallback)
(function () {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    // Fallback: 2D interactive particles if Three.js not loaded
    if (typeof THREE === 'undefined') {
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const mouse = { x: width / 2, y: height / 2, active: false };
        const particles = [];
        const baseCount = Math.min(180, Math.max(90, Math.floor((width * height) / 22000)));

        function createParticle() {
            const speed = 0.4 + Math.random() * 0.9;
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                size: 1.4 + Math.random() * 2.4,
            };
        }

        function initParticles() {
            particles.length = 0;
            for (let i = 0; i < baseCount; i++) {
                particles.push(createParticle());
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            // Draw connecting lines to mouse
            particles.forEach(p => {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 170;
                if (mouse.active && dist < maxDist) {
                    const alpha = 1 - dist / maxDist;
                    ctx.strokeStyle = `rgba(34,197,94,${alpha * 0.7})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            });

            ctx.fillStyle = 'rgba(34,197,94,0.85)';
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function update() {
            const influenceRadius = 170;

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (mouse.active) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

                    if (dist < influenceRadius) {
                        const force = (influenceRadius - dist) / influenceRadius;
                        const accel = force * 0.2;
                        p.vx += (dx / dist) * accel;
                        p.vy += (dy / dist) * accel;
                    }
                }

                if (p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50) {
                    Object.assign(p, createParticle());
                }

                p.vx *= 0.97;
                p.vy *= 0.97;
            });
        }

        function animate2D() {
            update();
            draw();
            requestAnimationFrame(animate2D);
        }

        window.addEventListener('resize', () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        });

        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        });

        window.addEventListener('mouseleave', () => {
            mouse.active = false;
        });

        initParticles();
        animate2D();
        return;
    }

    // 3D particle field with Three.js
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
    });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.z = 90;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color = new THREE.Color();
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = 55 + Math.random() * 35;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        color.setHSL(0.33 + Math.random() * 0.08, 0.85, 0.55 + Math.random() * 0.25);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 2.6,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    function onResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }

    window.addEventListener('resize', onResize);

    window.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        targetRotation.y = mouse.x * 0.9;
        targetRotation.x = mouse.y * 0.6;
    });

    function animate3D() {
        requestAnimationFrame(animate3D);

        // Base slow spin
        points.rotation.y += 0.0007;
        points.rotation.x += 0.00035;

        // Mouse-responsive rotation
        points.rotation.y += (targetRotation.y - points.rotation.y) * 0.06;
        points.rotation.x += (targetRotation.x - points.rotation.x) * 0.06;

        // Parallax based on mouse
        camera.position.x += (mouse.x * 22 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 14 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate3D();
})();

// Magnetic hover for primary buttons
(function () {
    const magneticButtons = document.querySelectorAll('.cta-button, .resume-button, .submit-button');

    magneticButtons.forEach(btn => {
        const strength = 0.25;

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            btn.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.03)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });
})();

// Subtle parallax tilt on key cards/sections
(function () {
    const parallaxSelectors = [
        '.about-image',
        '.personal-info',
        '.education-card',
        '.skill-category',
        '.project-card',
        '.info-card',
        '.contact-form'
    ];

    const items = document.querySelectorAll(parallaxSelectors.join(','));

    items.forEach(el => {
        const maxRotate = 6;
        const maxTranslate = 6;

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;

            const rotateX = (-relY * maxRotate).toFixed(2);
            const rotateY = (relX * maxRotate).toFixed(2);
            const translateX = (relX * maxTranslate).toFixed(2);
            const translateY = (relY * maxTranslate).toFixed(2);

            el.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0) rotateX(0deg) rotateY(0deg)';
        });
    });
})();

// Expand/collapse project cards on click
(function () {
    const cards = document.querySelectorAll('.project-card.interactive');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Ignore clicks on inner links
            if (e.target.closest('a')) return;
            card.classList.toggle('expanded');
        });
    });
    
})();

// Enhanced Skills Animation
(function() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;

    const skillBars = document.querySelectorAll('.skill-progress');
    const skillItems = document.querySelectorAll('.skill-item');
    let animated = false;

    // Animate skill bars when in view
    function animateSkills() {
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75 && !animated) {
            animated = true;

            // Animate progress bars
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                }, index * 100);
            });

            // Add entrance animation to skill items
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 80);
            });
        }
    }

    // Initial check
    animateSkills();

    // Check on scroll
    window.addEventListener('scroll', animateSkills);

    // Add interactive hover effects
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        // Add ripple effect on click
        category.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(34, 197, 94, 0.4)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add particle effect on skill item hover
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            createParticles(this);
        });
    });

    function createParticles(element) {
        const particleCount = 5;
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'skill-particle';
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#22c55e';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const startX = rect.left + Math.random() * rect.width;
            const startY = rect.top + Math.random() * rect.height;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            document.body.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let x = startX;
            let y = startY;
            let opacity = 1;
            
            function animate() {
                x += vx;
                y += vy;
                opacity -= 0.02;
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            }
            
            animate();
        }
    }

    // Add counter animation for percentages
    const percentages = document.querySelectorAll('.skill-percentage');
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '%';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '%';
            }
        }, 30);
    }

    // Trigger counter animation when skills section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                percentages.forEach(percentage => {
                    const target = parseInt(percentage.textContent);
                    percentage.textContent = '0%';
                    setTimeout(() => {
                        animateCounter(percentage, target);
                    }, 500);
                });
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);

    // Add 3D tilt effect on skill categories
    skillCategories.forEach(category => {
        category.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
})();

// Add ripple animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 500px;
            height: 500px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Skill Level Descriptions - Enhanced and Visible
(function() {
    const skillLevels = {
        90: { name: 'Expert', class: 'expert' },
        85: { name: 'Advanced', class: 'advanced' },
        80: { name: 'Proficient', class: 'proficient' },
        75: { name: 'Intermediate', class: 'intermediate' },
        70: { name: 'Competent', class: 'competent' }
    };

    function getSkillLevel(percentage) {
        const percent = parseInt(percentage);
        if (percent >= 90) return skillLevels[90];
        if (percent >= 85) return skillLevels[85];
        if (percent >= 80) return skillLevels[80];
        if (percent >= 75) return skillLevels[75];
        return skillLevels[70];
    }

    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const percentage = item.querySelector('.skill-percentage');
        if (percentage) {
            const levelData = getSkillLevel(percentage.textContent);
            
            // Create badge element
            const levelBadge = document.createElement('span');
            levelBadge.className = `skill-level-badge ${levelData.class}`;
            levelBadge.textContent = levelData.name;
            
            // Ensure item has proper positioning
            item.style.position = 'relative';
            item.style.overflow = 'visible';
            
            // Append badge
            item.appendChild(levelBadge);
        }
    });
})();

// Add sound effect on hover (optional - can be muted)
(function() {
    let audioContext;
    let isMuted = true; // Set to false to enable sounds
    
    function playTone(frequency, duration) {
        if (isMuted || !audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Initialize audio context on first user interaction
    document.addEventListener('click', function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        document.removeEventListener('click', initAudio);
    }, { once: true });
    
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            playTone(400 + (index * 50), 0.1);
        });
    });
})();

// Clean Projects Section Interactions
(function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length === 0) return;

    // Simple smooth hover effect
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth image zoom on hover
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image img');
        if (!image) return;
        
        card.addEventListener('mouseenter', function() {
            image.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            image.style.transform = 'scale(1)';
        });
    });

    // Staggered fade-in animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
})();

// Enhanced Education Section Interactions
(function() {
    const educationCards = document.querySelectorAll('.education-card');
    
    if (educationCards.length === 0) return;

    // Staggered fade-in animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    educationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Interactive hover effects
    educationCards.forEach(card => {
        // Smooth hover transition
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) translateX(10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) translateX(0)';
        });

        // Animate highlights on card hover
        const highlights = card.querySelectorAll('.highlight-item');
        card.addEventListener('mouseenter', function() {
            highlights.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(-3px)';
                    item.style.opacity = '1';
                }, index * 100);
            });
        });

        card.addEventListener('mouseleave', function() {
            highlights.forEach(item => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '0.9';
            });
        });

        // Click to expand/highlight
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on interactive elements
            if (e.target.closest('.highlight-item') || e.target.closest('.edu-tag')) return;
            
            // Toggle active state
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.style.borderLeftWidth = '10px';
                this.style.transform = 'translateY(-8px) translateX(15px) scale(1.02)';
            } else {
                this.style.borderLeftWidth = '5px';
                this.style.transform = 'translateY(0) translateX(0) scale(1)';
            }
        });
    });

    // Interactive tags
    const eduTags = document.querySelectorAll('.edu-tag');
    eduTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'tag-ripple';
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Interactive highlights
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Pulse animation
            this.style.animation = 'highlightPulse 0.6s ease';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Progress indicator for current education
    const currentBadges = document.querySelectorAll('.education-badge.current');
    currentBadges.forEach(badge => {
        // Add animated icon
        const icon = badge.querySelector('i');
        if (icon) {
            setInterval(() => {
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 300);
            }, 2000);
        }
    });
})();

// Add CSS animations dynamically
const educationStyles = document.createElement('style');
educationStyles.textContent = `
    .tag-ripple {
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(34, 197, 94, 0.5);
        transform: translate(-50%, -50%);
        animation: tagRipple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes tagRipple {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    @keyframes highlightPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
    
    .highlight-item {
        opacity: 0.9;
        position: relative;
        overflow: hidden;
    }
    
    .edu-tag {
        position: relative;
        overflow: hidden;
    }
    
    .education-card.active {
        background: rgba(2, 24, 20, 0.98);
    }
    
    .education-badge.current i {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(educationStyles);


// ===== ABOUT SECTION - COUNTER ANIMATION =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe the stats section when page loads
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.quick-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }
});


// Contact Info Carousel for Mobile
let currentInfoCard = 0;
let infoCarouselInterval;
let isTransitioningCard = false;

function showInfoCard(index) {
    const cards = document.querySelectorAll('.contact-info .info-card');
    const dots = document.querySelectorAll('.info-dots .dot');
    
    console.log('showInfoCard called with index:', index);
    console.log('Found cards:', cards.length);
    
    if (!cards.length || isTransitioningCard) return;
    
    isTransitioningCard = true;
    const previousIndex = currentInfoCard;
    
    // Add fade-out animation to current card
    if (cards[previousIndex] && previousIndex !== index) {
        cards[previousIndex].classList.add('fade-out');
    }
    
    // Remove active from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Wait for fade-out animation
    setTimeout(() => {
        // Remove all active and fade-out classes
        cards.forEach(card => {
            card.classList.remove('active', 'fade-out');
        });
        
        // Activate new card
        if (cards[index]) {
            cards[index].classList.add('active');
            console.log('Activated card:', index);
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentInfoCard = index;
        isTransitioningCard = false;
    }, 300);
}

function nextInfoCard() {
    const cards = document.querySelectorAll('.contact-info .info-card');
    currentInfoCard = (currentInfoCard + 1) % cards.length;
    console.log('Next card:', currentInfoCard);
    showInfoCard(currentInfoCard);
}

// Auto-slide every 3 seconds on mobile
function startInfoCarousel() {
    console.log('Starting carousel, window width:', window.innerWidth);
    if (window.innerWidth <= 480) {
        infoCarouselInterval = setInterval(nextInfoCard, 3000);
        console.log('Carousel started');
    }
}

function stopInfoCarousel() {
    if (infoCarouselInterval) {
        clearInterval(infoCarouselInterval);
        console.log('Carousel stopped');
    }
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing carousel');
    if (window.innerWidth <= 480) {
        showInfoCard(0);
        startInfoCarousel();
    }
    
    // Attach dot click handlers
    document.querySelectorAll('.info-dots .dot').forEach((dot, index) => {
        dot.addEventListener('click', function() {
            console.log('Dot clicked:', index);
            stopInfoCarousel();
            showInfoCard(index);
            setTimeout(startInfoCarousel, 5000);
        });
    });
});

// Restart carousel on window resize
window.addEventListener('resize', function() {
    stopInfoCarousel();
    if (window.innerWidth <= 480) {
        showInfoCard(0);
        startInfoCarousel();
    }
});


// Skills Carousel for Mobile
let currentSkillCategory = 0;
let skillsCarouselInterval;
let isTransitioningSkill = false;

function showSkillCategory(index) {
    const categories = document.querySelectorAll('.skill-category');
    const dots = document.querySelectorAll('.skills-dots .dot');
    
    console.log('showSkillCategory called with index:', index);
    console.log('Found categories:', categories.length);
    
    if (!categories.length || isTransitioningSkill) return;
    
    isTransitioningSkill = true;
    const previousIndex = currentSkillCategory;
    
    // Add fade-out animation to current category
    if (categories[previousIndex] && previousIndex !== index) {
        categories[previousIndex].classList.add('fade-out');
    }
    
    // Remove active from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Wait for fade-out animation
    setTimeout(() => {
        // Remove all active and fade-out classes
        categories.forEach(cat => {
            cat.classList.remove('active', 'fade-out');
        });
        
        // Activate new category
        if (categories[index]) {
            categories[index].classList.add('active');
            console.log('Activated category:', index);
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSkillCategory = index;
        isTransitioningSkill = false;
    }, 300);
}

function nextSkillCategory() {
    const categories = document.querySelectorAll('.skill-category');
    currentSkillCategory = (currentSkillCategory + 1) % categories.length;
    console.log('Next category:', currentSkillCategory);
    showSkillCategory(currentSkillCategory);
}

// Auto-slide every 4 seconds on mobile
function startSkillsCarousel() {
    console.log('Starting skills carousel, window width:', window.innerWidth);
    if (window.innerWidth <= 768) {
        skillsCarouselInterval = setInterval(nextSkillCategory, 4000);
        console.log('Skills carousel started');
    }
}

function stopSkillsCarousel() {
    if (skillsCarouselInterval) {
        clearInterval(skillsCarouselInterval);
        console.log('Skills carousel stopped');
    }
}

// Initialize skills carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing skills carousel');
    if (window.innerWidth <= 768) {
        showSkillCategory(0);
        startSkillsCarousel();
    }
    
    // Attach dot click handlers
    document.querySelectorAll('.skills-dots .dot').forEach((dot, index) => {
        dot.addEventListener('click', function() {
            console.log('Skills dot clicked:', index);
            stopSkillsCarousel();
            showSkillCategory(index);
            setTimeout(startSkillsCarousel, 5000);
        });
    });
});

// Restart skills carousel on window resize
window.addEventListener('resize', function() {
    stopSkillsCarousel();
    if (window.innerWidth <= 768) {
        showSkillCategory(0);
        startSkillsCarousel();
    }
});


// Projects Carousel for Mobile
let currentProjectCard = 0;
let projectsCarouselInterval;
let isTransitioningProject = false;

function showProjectCard(index) {
    const cards = document.querySelectorAll('.project-card');
    const dots = document.querySelectorAll('.projects-dots .dot');
    
    console.log('showProjectCard called with index:', index);
    
    if (!cards.length || isTransitioningProject) return;
    
    isTransitioningProject = true;
    const previousIndex = currentProjectCard;
    
    // Add fade-out to current card
    if (cards[previousIndex] && previousIndex !== index) {
        cards[previousIndex].classList.add('fade-out');
    }
    
    // Update dots immediately
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    // Wait for fade-out animation
    setTimeout(() => {
        // Remove all active and fade-out classes
        cards.forEach(card => {
            card.classList.remove('active', 'fade-out');
        });
        
        // Activate new card
        if (cards[index]) {
            cards[index].classList.add('active');
            console.log('Activated project card:', index);
        }
        
        currentProjectCard = index;
        isTransitioningProject = false;
    }, 300);
}

function nextProjectCard() {
    const cards = document.querySelectorAll('.project-card');
    currentProjectCard = (currentProjectCard + 1) % cards.length;
    showProjectCard(currentProjectCard);
}

function startProjectsCarousel() {
    if (window.innerWidth <= 768) {
        projectsCarouselInterval = setInterval(nextProjectCard, 5000);
    }
}

function stopProjectsCarousel() {
    if (projectsCarouselInterval) {
        clearInterval(projectsCarouselInterval);
    }
}

// Education Carousel for Mobile
let currentEducationCard = 0;
let educationCarouselInterval;
let isTransitioningEducation = false;

function showEducationCard(index) {
    const cards = document.querySelectorAll('.education-card');
    const dots = document.querySelectorAll('.education-dots .dot');
    
    console.log('showEducationCard called with index:', index);
    
    if (!cards.length || isTransitioningEducation) return;
    
    isTransitioningEducation = true;
    const previousIndex = currentEducationCard;
    
    if (cards[previousIndex] && previousIndex !== index) {
        cards[previousIndex].classList.add('fade-out');
    }
    
    dots.forEach(dot => dot.classList.remove('active'));
    
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove('active', 'fade-out');
        });
        
        if (cards[index]) {
            cards[index].classList.add('active');
            console.log('Activated education card:', index);
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentEducationCard = index;
        isTransitioningEducation = false;
    }, 300);
}

function nextEducationCard() {
    const cards = document.querySelectorAll('.education-card');
    currentEducationCard = (currentEducationCard + 1) % cards.length;
    showEducationCard(currentEducationCard);
}

function startEducationCarousel() {
    if (window.innerWidth <= 768) {
        educationCarouselInterval = setInterval(nextEducationCard, 5000);
    }
}

function stopEducationCarousel() {
    if (educationCarouselInterval) {
        clearInterval(educationCarouselInterval);
    }
}

// Certifications Carousel for Mobile
let currentCertCard = 0;
let certCarouselInterval;
let isTransitioningCert = false;

function showCertCard(index) {
    const cards = document.querySelectorAll('.cert-card');
    const dots = document.querySelectorAll('.cert-dots .dot');
    
    console.log('showCertCard called with index:', index);
    
    if (!cards.length || isTransitioningCert) return;
    
    isTransitioningCert = true;
    const previousIndex = currentCertCard;
    
    if (cards[previousIndex] && previousIndex !== index) {
        cards[previousIndex].classList.add('fade-out');
    }
    
    dots.forEach(dot => dot.classList.remove('active'));
    
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove('active', 'fade-out');
        });
        
        if (cards[index]) {
            cards[index].classList.add('active');
            console.log('Activated cert card:', index);
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentCertCard = index;
        isTransitioningCert = false;
    }, 300);
}

function nextCertCard() {
    const cards = document.querySelectorAll('.cert-card');
    currentCertCard = (currentCertCard + 1) % cards.length;
    showCertCard(currentCertCard);
}

function startCertCarousel() {
    if (window.innerWidth <= 768) {
        certCarouselInterval = setInterval(nextCertCard, 4000);
    }
}

function stopCertCarousel() {
    if (certCarouselInterval) {
        clearInterval(certCarouselInterval);
    }
}

// Initialize all carousels on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        // Projects
        showProjectCard(0);
        startProjectsCarousel();
        
        // Education
        showEducationCard(0);
        startEducationCarousel();
        
        // Certifications
        showCertCard(0);
        startCertCarousel();
    }
    
    // Attach dot click handlers for projects
    document.querySelectorAll('.projects-dots .dot').forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopProjectsCarousel();
            showProjectCard(index);
            setTimeout(startProjectsCarousel, 5000);
        });
    });
    
    // Attach dot click handlers for education
    document.querySelectorAll('.education-dots .dot').forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopEducationCarousel();
            showEducationCard(index);
            setTimeout(startEducationCarousel, 5000);
        });
    });
    
    // Attach dot click handlers for certifications
    document.querySelectorAll('.cert-dots .dot').forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopCertCarousel();
            showCertCard(index);
            setTimeout(startCertCarousel, 5000);
        });
    });
});

// Restart all carousels on window resize
window.addEventListener('resize', function() {
    stopProjectsCarousel();
    stopEducationCarousel();
    stopCertCarousel();
    
    if (window.innerWidth <= 768) {
        showProjectCard(0);
        startProjectsCarousel();
        
        showEducationCard(0);
        startEducationCarousel();
        
        showCertCard(0);
        startCertCarousel();
    }
});
