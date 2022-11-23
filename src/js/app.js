
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

// Слайдеры секции Archive на главной странице
const archiveSlider = new Swiper('.archive-section__slider', {
    slidesPerView: 'auto',
    speed: 1000,
    slidesOffsetAfter: 240,
    navigation: {
        nextEl: '.swiper-button-next.btn-archive',
        prevEl: '.swiper-button-prev.btn-archive',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    on: {
        transitionStart(slider) {
            slider.allowSlideNext = false;
            slider.allowSlidePrev = false;
            setTimeout(() => {
                slider.updateSlides();
                slider.slideTo(slider.realIndex, 300);
            }, 400);
        },
        transitionEnd(slider) {
            slider.allowSlideNext = true;
            slider.allowSlidePrev = true;
        },
        resize(slider) {
            slider.updateSlides();
            slider.updateSize();
        },
    }
});

// Слайдеры малый на странице новости
const articleSmallSlider = new Swiper('.article__small-slider', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    // loop: true,
    speed: 600,
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

$(document).ready(function () {
    $('.categoryes-filter-select').select2({
        minimumResultsForSearch: -1,
        selectionCssClass: "dropdown-select",
        dropdownCssClass: "dropdown-select-result",
    });
    $('.categoryes-filter-select').on('select2:select', function (e) {
        $($(this).data('select2').$container).addClass('option-selected')
    });

    $('.sort-dropdown-select').select2({
        minimumResultsForSearch: -1,
        dropdownAutoWidth: false,
        selectionCssClass: "sort-dropdown-select-wrapper",
        dropdownCssClass: "sort-dropdown-select-result",
    });
});
