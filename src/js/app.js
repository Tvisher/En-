
// Проверка поддержки WebP браузером
(async function testWebP() {
    const hasWebP = await new Promise(res => {
        const webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        webP.onload = webP.onerror = () => {
            res(webP.height === 2);
        };
    });
    let className = hasWebP === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
})();



//Инит Fancybox
Fancybox.bind("[data-fancybox]", {
    hideScrollbar: false,
    placeFocusBack: false,
});

// Первый слайдер на главной странице 
const mainSlider = new Swiper('.main-slider', {
    slidesPerView: 1,
    spaceBetween: 60,
    loop: true,
    speed: 800,
    autoplay: {
        delay: 5000,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
});



// Слайдеры секции Media на главной странице
const mediaSlider = new Swiper('.media-section__slider', {
    slidesPerView: 4,
    spaceBetween: 20,
    speed: 800,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
});

document.addEventListener('click', (e) => {
    const target = e.target;

    // Выбор слайдера в секии медиа
    const targetBtn = target.closest('[data-toggle-slider]');
    if (targetBtn) {
        const tatargetBtnId = targetBtn.getAttribute('data-toggle-slider');
        const activeBtn = document.querySelector('[data-toggle-slider].active');
        if (activeBtn) activeBtn.classList.remove('active');
        targetBtn.classList.add('active');
        const activeSlider = document.querySelector('[data-slider-id].show');
        if (activeSlider) activeSlider.classList.remove('show');
        const selectedSlider = document.querySelector(`[data-slider-id="${tatargetBtnId}"]`);
        if (selectedSlider) selectedSlider.classList.add('show');
    }
});

