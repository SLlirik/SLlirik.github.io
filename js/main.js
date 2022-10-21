/*jshint esversion: 6 */
const burgerBtn = document.querySelector('.burger-btn');
    burgerBtn.addEventListener('click', () => {
        document.querySelector('.menu').classList.toggle('menu--open');
        burgerBtn.classList.toggle('burger-btn--active');
});

// Awards - Кнопка 'Показать еще'
const btnAwardsShowMore = document.querySelector('.awards-more__btn');
const awardsCards = document.querySelectorAll('.awards__item').length;

let awardsItems = 4;  // Кол-во изначально видимых карт

btnAwardsShowMore.addEventListener('click', () => {
    awardsItems += 2; // Кол-во добавляемых к показу карт

    const arrayCards = Array.from(document.querySelector('.awards__wrapper').children); // Получаем массив карт от родителя.
    const view = arrayCards.slice(0, awardsItems); // Срезаем с массива карт (выбранное выше) кол-во добавляемых к показу карт
    view.forEach(el => el.classList.remove('awards__item-hidden')); // Добавляем к срезаемым элементам класс (для появления элементов);

    if(view.length === awardsCards) {
        btnAwardsShowMore.style.display = 'none';
    }
});


// Articles - Кнопка 'Показать еще'
const btnArticlesShowMore = document.querySelector('.articles-more__btn');
const articlesCards = document.querySelectorAll('.articles__item').length;

let articlesItems = 4;

btnArticlesShowMore.addEventListener('click', () => {
    articlesItems += 2; // Кол-во добавляемых к показу карт

    const arrayCards = Array.from(document.querySelector('.articles__wrapper').children); // Получаем массив карт от родителя.
    const view = arrayCards.slice(0, articlesItems); // Срезаем с массива карт (выбранное выше) кол-во добавляемых к показу карт
    view.forEach(el => el.classList.remove('articles__item-hidden')); // Удаляем у срезаемых элементов класс (для появления элементов);

    if(view.length === articlesCards) {
        btnArticlesShowMore.style.display = 'none';
    }
});


// Анимация
function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('animation-show');
        } else {
            change.target.classList.remove('animation-show');
        }
    });
}

let options = {
    threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.animation');

for (let elm of elements) {
    observer.observe(elm);
}


// Валидация формы
const form = document.querySelector('.form__form');
const validation = new JustValidate('.form__form');

validation.addField('.input-mail', [
        {
            rule: 'required',
            errorMessage: 'Email обязателен',
        },
        {
            rule: 'email',
            errorMessage: 'Введите корректный Email',
        },
]).onSuccess((event) => {
    console.log('Validation passes and form submitted');

    let formData = new FormData(event.target);
    console.log(...formData);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('Отправлено');
            }
        }
    };

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    event.target.reset();
});
