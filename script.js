document.addEventListener("DOMContentLoaded", function () {

    const boton = document.querySelector(".boton");

    boton.addEventListener("click", function () {
        alert("Próximamente podrás ver todos nuestros productos.");
    });

    // --- Tabs: activar contenido según botón seleccionado ---
    const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
    const tabContents = Array.from(document.querySelectorAll('.tab-content'));

    function activateTab(name) {
        tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === name));
        tabContents.forEach(c => c.classList.toggle('active', c.id === name));
    }

    tabButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            if (!target) return;
            activateTab(target);
            try { history.replaceState(null, '', '#' + target); } catch (e) {}
        });

        // accesibilidad: teclas izquierda/derecha + enter/espacio
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                const next = tabButtons[(idx + 1) % tabButtons.length];
                next.focus(); next.click();
            } else if (e.key === 'ArrowLeft') {
                const prev = tabButtons[(idx - 1 + tabButtons.length) % tabButtons.length];
                prev.focus(); prev.click();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); btn.click();
            }
        });
    });

    // Inicializar desde hash o desde el botón activo / primero
    const initial = location.hash ? location.hash.replace('#', '') : null;
    if (initial && document.getElementById(initial)) {
        activateTab(initial);
    } else {
        const firstActive = document.querySelector('.tab-button.active') || tabButtons[0];
        if (firstActive) activateTab(firstActive.dataset.tab);
    }

    // Slider de imágenes
    const slides = Array.from(document.querySelectorAll('.slide'));
    const dots = Array.from(document.querySelectorAll('.slider-dot'));
    const prevButton = document.querySelector('.slider-control.prev');
    const nextButton = document.querySelector('.slider-control.next');
    let slideIndex = slides.findIndex(slide => slide.classList.contains('active'));
    if (slideIndex === -1) slideIndex = 0;

    function updateSlider(index) {
        slides.forEach((slide, idx) => slide.classList.toggle('active', idx === index));
        dots.forEach((dot, idx) => dot.classList.toggle('active', idx === index));
        slideIndex = index;
    }

    function showNextSlide() {
        updateSlider((slideIndex + 1) % slides.length);
    }

    function showPrevSlide() {
        updateSlider((slideIndex - 1 + slides.length) % slides.length);
    }

    nextButton?.addEventListener('click', showNextSlide);
    prevButton?.addEventListener('click', showPrevSlide);

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const target = Number(dot.dataset.slide);
            updateSlider(target);
        });
    });

});
