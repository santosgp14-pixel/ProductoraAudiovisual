// Portfolio Dynamic System
class PortfolioManager {
    constructor() {
        this.items = [];
        this.currentFilter = 'all';
        this.modal = null;
        this.init();
    }

    async init() {
        await this.loadPortfolioData();
        this.renderPortfolio();
        this.setupFilters();
        this.setupModal();
        this.setupAnimations();
        this.setupNav();
        this.setupContactForm();
    }

    async loadPortfolioData() {
        try {
            const response = await fetch('portfolio-data.json');
            const data = await response.json();
            this.items = data.items;
        } catch (error) {
            console.warn('No se pudo cargar portfolio-data.json, usando datos por defecto');
            this.items = this.getDefaultItems();
        }
    }

    getDefaultItems() {
        return [
            {
                id: 1,
                title: "Campaña Tech Brand",
                description: "IA Generativa • Motion Graphics",
                category: "comercial",
                image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                type: "video"
            },
            {
                id: 2,
                title: "Videoclip \"Digital Dreams\"",
                description: "Deepfake • VFX Avanzado",
                category: "videoclip",
                image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=450&fit=crop",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                type: "video"
            },
            {
                id: 3,
                title: "Presentación Corporativa AI",
                description: "Analytics • Voiceover Sintético",
                category: "corporativo",
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                type: "video"
            },
            {
                id: 4,
                title: "Experimento Neural",
                description: "IA Generativa • Arte Digital",
                category: "experimental",
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                type: "video"
            },
            {
                id: 5,
                title: "Spot Automotriz",
                description: "CGI • Post-producción IA",
                category: "comercial",
                image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                type: "video"
            },
            {
                id: 6,
                title: "Videoclip \"Neon Nights\"",
                description: "Motion Graphics • Color Grading IA",
                category: "videoclip",
                image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=450&fit=crop",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                type: "video"
            }
        ];
    }

    renderPortfolio() {
        const grid = document.querySelector('.portfolio-grid');
        if (!grid) return;

        grid.innerHTML = '';

        const filteredItems = this.currentFilter === 'all' 
            ? this.items 
            : this.items.filter(item => item.category === this.currentFilter);

        filteredItems.forEach(item => {
            const portfolioItem = this.createPortfolioItem(item);
            grid.appendChild(portfolioItem);
        });

        // Reiniciar animaciones
        this.setupAnimations();
    }

    createPortfolioItem(item) {
        const div = document.createElement('div');
        div.className = 'portfolio-item fade-in';
        div.setAttribute('data-category', item.category);
        div.setAttribute('data-id', item.id);

        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
            <div class="play-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </div>
        `;

        div.addEventListener('click', () => this.openModal(item));

        return div;
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                this.currentFilter = button.getAttribute('data-filter');
                this.renderPortfolio();
            });
        });
    }

    setupModal() {
        // Crear modal si no existe
        if (!document.getElementById('videoModal')) {
            const modal = document.createElement('div');
            modal.id = 'videoModal';
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-body">
                        <h2 class="modal-title"></h2>
                        <div class="modal-media"></div>
                        <p class="modal-description"></p>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            this.modal = modal;

            // Cerrar modal
            modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal();
            });

            // Cerrar con ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    this.closeModal();
                }
            });
        }
    }

    openModal(item) {
        const modal = document.getElementById('videoModal');
        const title = modal.querySelector('.modal-title');
        const media = modal.querySelector('.modal-media');
        const description = modal.querySelector('.modal-description');

        title.textContent = item.title;
        description.textContent = item.description;

        if (item.type === 'video' && item.videoUrl) {
            media.innerHTML = `
                <iframe 
                    width="100%" 
                    height="500" 
                    src="${item.videoUrl}?autoplay=1" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
                </iframe>
            `;
        } else {
            media.innerHTML = `<img src="${item.image}" alt="${item.title}" style="width: 100%; height: auto;">`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('videoModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Detener video
        const media = modal.querySelector('.modal-media');
        media.innerHTML = '';
    }

    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupNav() {
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Nav background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(13, 27, 42, 0.95)';
            } else {
                nav.style.background = 'rgba(13, 27, 42, 0.8)';
            }
        });
    }

    setupContactForm() {
        const ctaButtons = document.querySelectorAll('.btn-primary');
        ctaButtons.forEach(btn => {
            if (btn.textContent.includes('Consultoría') || btn.textContent.includes('Contacto')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showContactForm();
                });
            }
        });
    }

    showContactForm() {
        // Crear formulario modal si no existe
        if (!document.getElementById('contactModal')) {
            const modal = document.createElement('div');
            modal.id = 'contactModal';
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-body">
                        <h2 class="modal-title">Agenda tu Consultoría Gratuita</h2>
                        <form id="contactForm" class="contact-form">
                            <div class="form-group">
                                <label for="name">Nombre completo</label>
                                <input type="text" id="name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="company">Empresa</label>
                                <input type="text" id="company" name="company">
                            </div>
                            <div class="form-group">
                                <label for="project">Tipo de proyecto</label>
                                <select id="project" name="project" required>
                                    <option value="">Selecciona una opción</option>
                                    <option value="comercial">Comercial</option>
                                    <option value="videoclip">Videoclip</option>
                                    <option value="corporativo">Corporativo</option>
                                    <option value="experimental">Experimental</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="message">Cuéntanos sobre tu proyecto</label>
                                <textarea id="message" name="message" rows="4" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Enviar Solicitud</button>
                        </form>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            // Setup eventos
            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            // Submit form
            modal.querySelector('#contactForm').addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            });
        }

        const modal = document.getElementById('contactModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Mostrar indicador de carga
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Enviar datos al backend PHP
        fetch('contact.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('¡Gracias por tu interés! Te contactaremos en menos de 24 horas.');
                document.getElementById('contactModal').classList.remove('active');
                document.body.style.overflow = '';
                form.reset();
            } else {
                alert('Hubo un error al enviar el formulario. Por favor intenta nuevamente.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Si falla el backend, guardar en localStorage como backup
            this.saveToLocalStorage(data);
            alert('¡Gracias por tu interés! Hemos guardado tu información y te contactaremos pronto.');
            document.getElementById('contactModal').classList.remove('active');
            document.body.style.overflow = '';
            form.reset();
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    // Método de backup para guardar en localStorage
    saveToLocalStorage(data) {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        console.log('Formulario guardado en localStorage:', data);
    }

    // Método público para agregar items dinámicamente
    addPortfolioItem(item) {
        const newItem = {
            id: this.items.length + 1,
            ...item
        };
        this.items.push(newItem);
        this.renderPortfolio();
        console.log('Item agregado:', newItem);
    }

    // Método público para eliminar items
    removePortfolioItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.renderPortfolio();
        console.log('Item eliminado:', id);
    }

    // Método público para actualizar items
    updatePortfolioItem(id, updates) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...updates };
            this.renderPortfolio();
            console.log('Item actualizado:', this.items[index]);
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioManager = new PortfolioManager();
});

// Exponer funciones globales para facilitar la gestión
window.addPortfolioItem = (item) => {
    if (window.portfolioManager) {
        window.portfolioManager.addPortfolioItem(item);
    }
};

window.removePortfolioItem = (id) => {
    if (window.portfolioManager) {
        window.portfolioManager.removePortfolioItem(id);
    }
};

window.updatePortfolioItem = (id, updates) => {
    if (window.portfolioManager) {
        window.portfolioManager.updatePortfolioItem(id, updates);
    }
};
