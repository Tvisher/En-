
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
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 800,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        '1280': {
            slidesPerView: 4,
        },
        '992': {
            slidesPerView: 3,
        },
        '680': {
            slidesPerView: 2,
        },
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
});


let archiveAjaxUrl = `https://dev6.ml-digital.ru/ajax/archive.php?PAGEN_1=`;

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
        init(slider) {
            slider.ajaxPageCounter = slider.el.getAttribute('data-page-count');
            slider.ajaxPageStart = 2;
        },
        transitionStart(slider) {
            setTimeout(() => {
                slider.updateSlides();
                slider.slideTo(slider.realIndex, 600);
            }, 400);
        },
        activeIndexChange(slider) {

            const pageUrl = `${archiveAjaxUrl}${slider.ajaxPageStart}`;

            if (slider.progress > 0.85 && slider.ajaxPageCounter > 0) {
                fetch(pageUrl, {})
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        slider.appendSlide(data);
                        slider.ajaxPageCounter--;
                        slider.ajaxPageStart++;
                        slider.updateSlides();
                        slider.updateSize();
                    });
            }
        },
        resize(slider) {
            slider.updateSlides();
            slider.updateSize();
        },
    }
});

// Слайдер малый на странице новости
const articleSmallSlider = new Swiper('.article__small-slider', {
    slidesPerView: 'auto',
    spaceBetween: 20,
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

// Слайдер крупный на странице новости
const articleLargeSlider = new Swiper('.article__large-slider', {
    slidesPerView: 'auto',
    spaceBetween: 20,
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
    // Табы
    if (target.closest('[data-toggle-btn]')) {
        const targetBtn = target.closest('[data-toggle-btn]');
        const tatargetBtnId = targetBtn.getAttribute('data-toggle-btn');
        const activeBtn = document.querySelector('[data-toggle-btn].active');
        if (activeBtn) activeBtn.classList.remove('active');
        targetBtn.classList.add('active');
        const activeTab = document.querySelector('[data-toggle-id].show');
        if (activeTab) activeTab.classList.remove('show');
        const selectedTab = document.querySelector(`[data-toggle-id="${tatargetBtnId}"]`);
        if (selectedTab) selectedTab.classList.add('show');
    }

    if (target.closest('[data-close-mob-menu]')) {
        document.querySelector('[data-mob-menu]').classList.remove('show');
    }
    if (target.closest('[data-open-mob-menu]')) {
        document.querySelector('[data-mob-menu]').classList.add('show');
    }

    // Открытие модалки с формой 
    if (target.closest('[data-show-modal-form]')) {
        e.preventDefault();
        document.querySelector('[data-modal-form]').classList.add('show');
    }

});

$(document).ready(function () {
    // Выпадающий список для категорий и журналов
    $('.categoryes-filter-select').select2({
        // minimumResultsForSearch: -1,
        selectionCssClass: "dropdown-select",
        dropdownCssClass: "dropdown-select-result",
        "language": {
            "noResults": function () {
                return "Не найдено";
            }
        },
        escapeMarkup: function (markup) {
            return markup;
        }
    });
    $('.categoryes-filter-select').on('select2:select', function (e) {
        $($(this).data('select2').$container).addClass('option-selected')
    });

    $('.categoryes-filter-select').one('select2:open', function (e) {
        $('input.select2-search__field').prop('placeholder', 'Поиск');
    });

    // Выпадающий список для сортировки
    const select = $('.sort-dropdown-select').select2({
        minimumResultsForSearch: -1,
        dropdownAutoWidth: true,
        selectionCssClass: "sort-dropdown-select-wrapper",
        dropdownCssClass: "sort-dropdown-select-result",
        dropdownParent: $('.sort-dropdown'),
    });

    // Ловим событие закрытия
    select.on('select2:close', function (e) {
        if (e.params.hasOwnProperty('originalEvent') && e.params.originalEvent === undefined) return;
        if (!e.params.hasOwnProperty('originalEvent')) {
            //Если выбрали уже выбранный элемент !!!
            $(this).parents('.sort-dropdown').find('.sort-dropdown-select-wrapper').toggleClass('reverse');
        } else {
            $(this).parents('.sort-dropdown').find('.sort-dropdown-select-wrapper').removeClass('reverse');
        }
    });
});



// Тоглер для рубрик в мобильном меню
$("[data-toggle-menu]").on('click', function () {
    if (window.innerWidth > 1300) return;
    $(this).parents('.width-dropdown').find('[data-toggle-content]').slideToggle("slow");
    $(this).toggleClass('open');
});

// Календарь
const airDatepicker = new AirDatepicker('.datapicker-input', {
    isMobile: true,
    autoClose: true,
    dateFormat: 'dd.MM.yyyy',
    range: true,
    multipleDatesSeparator: ' - ',
    //Событие выбора даты в календаре
    onSelect({ date, formattedDate, datepicker }) {
        //Сработает при выборе второй даты
        if (formattedDate.length > 1) {
            console.log(formattedDate);
        }
    }
})
