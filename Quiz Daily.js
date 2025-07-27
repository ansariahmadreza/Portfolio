
const h3Elem = document.querySelector('h3');
const ulElem = document.querySelector('ul');
const boxQuiz = document.querySelector('#boxQuiz');
const h1 = document.querySelector('h1');
const pelem = document.querySelector('p');
const divElem = document.querySelector('div');


function quiz(title, options, answer) {
    return { title, options, answer };
}

const createQuiz16azar = quiz("روز 16 آذر چه مناسبتی دارد؟", ["روز مادر", "روز دانشجو", "روز پدر", "روز دختر"], "روز دانشجو");
const createQuiz13aban = quiz("روز 13 آبان چه مناسبتی دارد؟", ["روز مادر", "روز طبیعت", "روز ارتش", "روز دانش‌آموز"], "روز دانش‌آموز");

// متغیر وضعیت
let flagAnswer = false;


// توابع کمکی
function showTime() {
    const timeFull = new Date();
    let timeHour = timeFull.getHours().toString().padStart(2, '0');
    let timeMin = timeFull.getMinutes().toString().padStart(2, '0');
    return timeHour + ":" + timeMin;
}


// توابع اصلی برای نمایش کوییز
function convertDom() {
    ulElem.innerHTML = '';
    h1.innerHTML = '.بعد از 5 دقیقه ازمون بسته میشود';
    const currentQuiz = flagAnswer ? createQuiz13aban : createQuiz16azar;
    flagAnswer = !flagAnswer;

    h3Elem.textContent = currentQuiz.title;

    for (let item of currentQuiz.options) {
        let liElem = document.createElement('li');
        liElem.textContent = item;
        ulElem.append(liElem);

        liElem.addEventListener('click', (e) => {
            if (e.target.textContent !== currentQuiz.answer) {
                divElem.innerHTML = `پاسخ صحیح گزینه ${currentQuiz.answer} است`;
            } else {
                divElem.innerHTML = "پاسخ صحیح است";
            }
            setTimeout(() => {
                divElem.innerHTML = '';
            }, 2000);
        });
    }
}


// مدیریت زمان آزمون
function timeHandlerQuiz() {
    const currentTime = showTime();
    const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    const quizStartTime = 20 * 60 + 5;
    const quizEndTime = 21 * 60 + 0;

    if (currentTotalMinutes >= quizEndTime) {
        console.log('زمان اتمام آزمون');
        h1.textContent = 'شروع کوییز هر شب ساعت ۲۱';
        h3Elem.innerHTML = '';
        ulElem.innerHTML = '';
    } else if (currentTotalMinutes >= quizStartTime) {
        console.log('زمان شروع آزمون');
        convertDom();
    } else {
        console.log('هنوز زمان آزمون نرسیده است.');
    }
}

///اجراش باگ داره

// اجرا: نمایش ساعت و بررسی زمان آزمون
setInterval(() => {
    const time = new Date();
    pelem.innerHTML = time.toLocaleTimeString();
    timeHandlerQuiz();
}, 1000);




window.addEventListener('click', convertDom)

