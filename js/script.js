const menuIcon = document.querySelector('.menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');

menuIcon.addEventListener('click', function() {
  mobileMenu.classList.toggle('show-menu');
});

document.addEventListener('click', function(event) {
  const targetElement = event.target;
  if (!targetElement.closest('.menu-icon') && !targetElement.closest('.mobile-menu')) {
    mobileMenu.classList.remove('show-menu');
  }
});


/*Слайды*/
const slider = document.querySelector('.slider');
const slideContainer = slider.querySelector('.slide-container');
const prevButton = slider.querySelector('.prev-button');
const nextButton = slider.querySelector('.next-button');

let currentPosition = 0;
const slideWidth = slideContainer.querySelector('img').offsetWidth;
const numberOfSlides = slideContainer.childElementCount;

function updatePosition() {
  slideContainer.style.transform = `translateX(${currentPosition}px)`;
}

function slidePrev() {
  currentPosition += slideWidth;
  if (currentPosition > 0) {
    currentPosition = -slideWidth * (numberOfSlides - 1);
  }
  updatePosition();
}

function slideNext() {
  currentPosition -= slideWidth;
  if (currentPosition < -slideWidth * (numberOfSlides - 1)) {
    currentPosition = 0;
  }
  updatePosition();
}

prevButton.addEventListener('click', slidePrev);
nextButton.addEventListener('click', slideNext);

// Функция автопролистывания слайдов
function autoSlide() {
  slideNext();
}

// Установка интервала автопролистывания
let intervalId = setInterval(autoSlide, 1000);

// Отключение автопролистывания при наведении курсора на слайдер
slider.addEventListener('mouseenter', function() {
  clearInterval(intervalId);
});

// Включение автопролистывания после ухода курсора с слайдера
slider.addEventListener('mouseleave', function() {
  intervalId = setInterval(autoSlide, 1000);
});

/*Карусель*/

document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(".carousel-container");
  const carouselWidth = carouselContainer.offsetWidth;
  const carouselImages = document.querySelectorAll(".carousel-image");
  const totalImages = carouselImages.length;
  const carouselDotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;
  let intervalId;

  function initCarousel() {
    createDots();
    showImage(currentIndex);
    startInterval();
  }

  function createDots() {
    for (let i = 0; i < totalImages; i++) {
      const dot = document.createElement("div");
      dot.classList.add("carousel-dot");
      if (i === currentIndex) {
        dot.classList.add("active");
      }
      dot.addEventListener("click", function () {
        showImage(i);
        clearInterval(intervalId);
        startInterval();
      });
      carouselDotsContainer.appendChild(dot);
    }
  }

  function showImage(index) {
    carouselContainer.style.transform = `translateX(-${carouselWidth * index}px)`;
    const dots = document.querySelectorAll(".carousel-dot");
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
    currentIndex = index;
  }

  function startInterval() {
    intervalId = setInterval(() => {
      let newIndex = currentIndex + 1;
      if (newIndex >= totalImages) {  // Изменено условие
        newIndex = 0;
      }
      showImage(newIndex);
    }, 3000);
  }

  initCarousel();
});

const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
    // удалим у кнопки класс btn-up_hide
    this.el.classList.remove('btn-up_hide');
  },
  hide() {
    // добавим к кнопке класс btn-up_hide
    this.el.classList.add('btn-up_hide');
  },
  addEventListener() {
    // при прокрутке содержимого страницы
    window.addEventListener('scroll', () => {
      // определяем величину прокрутки
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
      scrollY > 400 ? this.show() : this.hide();
    });
    // при нажатии на кнопку .btn-up
    document.querySelector('.btn-up').onclick = () => {
      // переместим в начало страницы
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();