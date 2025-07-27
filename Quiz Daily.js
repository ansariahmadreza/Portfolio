const h3Elem = document.querySelector('h3');
const ulElem = document.querySelector('ul');
const boxQuiz = document.querySelector('#boxQuiz');
const h1 = document.querySelector('h1');
const pelem = document.querySelector('p');
const divElem = document.querySelector('div');

function quiz(title, options, answer) {
    return { title, options, answer }
};

const createQuiz16azar = quiz("روز 16 آذر چه مناسبتی دارد؟", ["روز مادر", "روز دانشجو", "روز پدر", "روز دختر"], "روز دانشجو");
const createQuiz13aban = quiz('روز 13 ابان چه مناسبتی دارد؟', ["روز مادر", "روز طبیعت", "روز ارتش", "روز دانش اموز"], "روز دانش اموز")

setInterval(() => {
    const time = new Date()
    let fullTime = time.toLocaleTimeString()
    pelem.innerHTML = fullTime
}, 1000);

function showTime() {
    const timeFull = new Date()
    let timeHour = timeFull.getHours().toString().padStart(2, '0');
    let timeMin = timeFull.getMinutes().toString().padStart(2, '0');
    let startQuiz = timeHour + ":" + timeMin;
    return startQuiz;
};

let flagAnswer = false;

function convertDom() {
    ulElem.innerHTML = '';
    h1.innerHTML = '';
    h1.innerHTML = '.بعد از 5 دقیقه ازمون بسته میشود';
    if (flagAnswer) {
        flagAnswer = false
        h3Elem.textContent = createQuiz13aban.title;
        for (let item of createQuiz13aban.options) {
            let liElem = document.createElement('li');
            liElem.textContent = item;
            ulElem.append(liElem);
            liElem.addEventListener('click', (e) => {
                if (e.target.textContent !== createQuiz13aban.answer) {
                    divElem.innerHTML = "پاسخ صحیح گزینه دانش اموز است";
                    setTimeout(() => {
                        divElem.innerHTML = '';
                    }, 2000);
                } else {
                    divElem.innerHTML = "پاسخ صحیح است";
                    setTimeout(() => {
                        divElem.innerHTML = '';
                    }, 2000);
                };
            });
        };
    } else {
        flagAnswer = true;
        h3Elem.textContent = createQuiz16azar.title;
        for (let item of createQuiz16azar.options) {
            let liElem = document.createElement('li');
            liElem.textContent = item;
            ulElem.append(liElem);
            liElem.addEventListener('click', (e) => {
                if (e.target.textContent !== createQuiz16azar.answer) {
                    divElem.innerHTML = "روز دانشجو";
                    setTimeout(() => {
                        divElem.innerHTML = '';
                    }, 2000);
                } else {
                    divElem.innerHTML = "پاسخ صحیح است";
                    setTimeout(() => {
                        divElem.innerHTML = '';
                    }, 2000);
                }
            })
        };
    };
};


function timeHandlerQuiz() {
    const currentTime = showTime();
    const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    const quizStartTime = 19 * 60 + 49;  
    const quizEndTime = 19 * 60 + 48;  

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

// window.setInterval(() => {
//     timeHandlerQuiz()
//     document.querySelector('ul').addEventListener('click', (e) => {
//         if (e.target.textContent === convertDom()) {
//             convertDom()
//         }
//     })
// }, 10000)

window.addEventListener('click',convertDom)

