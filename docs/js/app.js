
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



const mainSlider = new Swiper('.main-slider', {
    slidesPerView: 1,
    spaceBetween: 60,
    loop: true,
    speed: 1200,
    autoplay: {
        delay: 5000,
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

// Категории
const newsSectionNavSlider = new Swiper('.news-section__nav-slider', {
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.swiper-button-next.nav-slider',
        prevEl: '.swiper-button-prev.nav-slider',
    },

});
