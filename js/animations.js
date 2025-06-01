const INCREASE_NUMBER_ANIMATION_SPEED = 50;
let animationInited = false;

function increaseNumberAnimationStep(i, element, endNumber, startTime) {
  const duration = 2000;
  const now = performance.now();
  const progress = Math.min((now - startTime) / duration, 1);
  
  const currentNumber = Math.floor(progress * endNumber);
  
  if (currentNumber === endNumber) {
    element.innerText = endNumber + '+';
  } else {
    element.innerText = currentNumber;
  }
  
  if (progress < 1) {
    requestAnimationFrame(() => {
      increaseNumberAnimationStep(i, element, endNumber, startTime);
    });
  }
}

function initIncreaseNumberAnimation() {
  const element = document.querySelector('.features__clients-count');
  if (element) {
    const endNumber = parseInt(element.innerText);
    const startTime = performance.now();
    increaseNumberAnimationStep(0, element, endNumber, startTime);
  }
}

document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
  const form = document.querySelector('form');
  const submitButton = document.querySelector('.form__submit');
  
  if (event.target.value === 'other') {
    if (!document.querySelector('.form__other-input')) {
      const formContainer = document.createElement('div');
      formContainer.classList.add('form__group');
      formContainer.classList.add('form__other-input');

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Введите сумму';
      input.className = 'form__input';

      formContainer.appendChild(input);
      
      if (form && submitButton) {
        form.insertBefore(formContainer, submitButton);
      }
    }
  } else {
    const otherInput = document.querySelector('.form__other-input');
    if (otherInput && form) {
      form.removeChild(otherInput);
    }
  }
});

function updateScroll() {
  const header = document.querySelector('header');
  if (!header) return;
  
  // Добавляем/удаляем класс для header
  if (window.scrollY > 50) {
    //console.log(window.scrollY);
    header.classList.add('header__scrolled');
  } else {
    header.classList.remove('header__scrolled');
  }

  // Запускаем анимацию чисел при прокрутке
  const windowBottomPosition = window.scrollY + window.innerHeight;
  const countElement = document.querySelector('.features__clients-count');
  
  if (countElement) {
    const countElementPosition = countElement.offsetTop;
    
    if (windowBottomPosition >= countElementPosition && !animationInited) {
      initIncreaseNumberAnimation();
      animationInited = true;
    }
  }
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', function() {
  // Добавляем обработчик скролла
  window.addEventListener('scroll', updateScroll);
  
  // Вызываем сразу для начального состояния
  updateScroll();
  initSmoothScroll();
});

function addSmoothScroll(element) {
    element.addEventListener('click', function(e) {
        const targetID = this.getAttribute('href');
        if (!targetID || !targetID.startsWith('#')) return;

        e.preventDefault();

        const targetElement = document.querySelector(targetID);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
}

// инициализация плавной прокрутки
function initSmoothScroll() {
    // все якорные ссылки
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        addSmoothScroll(anchor);
    });

    // кнопкf "Узнть подробнее"
    const moreButton = document.querySelector('.more-button');
    if (moreButton) {
        addSmoothScroll(moreButton);
    }
}

