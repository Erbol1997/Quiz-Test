const questions = [
	{
		question: "Как правильно пишется?",
		answers: [
			"Машина",
			"Мошина",
			"Машына"
		],
		correct: 1,
	},
	{
		question: "В каком случае ударение стоит правильно?",
		answers: [
			"вокзАл",
			"дОрога",
			"автобУс",
			"транспОрт"
		],
		correct: 1,
	},
	{
		question: "Правильно ли написано слово: жолтый?",
		answers: [
			"Правильно",
			"Не знаю",
			"Нет, правильно - жёлтый"
		],
		correct: 3,
	},
	{
		question: "Письменная речь состоит из...",
		answers: [
			"текста",
			"букв",
			"предложений",
			"слогов"
		],
		correct: 3,
	},
	{
		question: "Предложения складываются из...",
		answers: [
			"букв",
			"текста",
			"слогов",
			"слов"
		],
		correct: 4,
	},
	{
		question: "Что нужно написать, чтобы получилось слово?",
		answers: [
			"текст",
			"слово",
			"буквы",
		],
		correct: 3,
	},

]

const questionContainer = document.querySelector("#question");
const answersContainer = document.querySelector("#list");
const quizBtn = document.querySelector("#submit");

const rangeLine = document.querySelector('#range');
const rangeNum = document.querySelector('#rangenum');
const percentContainer = document.querySelector("#percent-line");

let questionIndex = 0; // текущий вопрос
let score = 0; // кол-во правильных ответов

clearPage();
showQuestion();
quizBtn.onclick = checkAnswer;

function clearPage() {
	questionContainer.innerHTML = '';
	answersContainer.innerHTML = '';
}


function showQuestion() {
	const rangeTemplate = `
		<input id="range" type="range" class="range" value="%valuenum%" min="0" max="${questions.length}">
		<span id="rangenum" class="percent__num">%percent%</span>
	`;

	const range = rangeTemplate
		.replace('%percent%', questionIndex + 1)
		.replace('%valuenum%', questionIndex + 1)

	percentContainer.innerHTML = range;

	// Вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	questionContainer.innerHTML = title;



	// Ответы  И делаем деструктиризацию
	for ([index, answerText] of questions[questionIndex]['answers'].entries()) {
		const questionTemplate = `
			<li>
				<label>
					<input value="%number%" class="answer" name="answer" type="radio">
					<span>%answer%</span>
				</label>
			</li>
		`
		const answerHTML = questionTemplate
			.replace('%answer%', answerText)
			.replace('%number%', index + 1);
		answersContainer.innerHTML += answerHTML;
	}

}

function checkAnswer() {
	// находим выбранную радиокнопку
	const checkedRadio = answersContainer.querySelector('input[type="radio"]:checked');

	// Если ответ не выбран ничего не делаем выходим из функции
	if (!checkedRadio) {
		alert('Выберите ответ!')
		return;
	}
	// Узнаем номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value);

	// Если ответ верно - увеличиваем счет
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}
	// Проверяем на последний вопрос
	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
		return
	} else {
		clearPage();
		showResults();
	}
}

function showResults() {
	const resultsTemplate = `
		<h3 class="title">%title%</h3>
		<h4 class="summary">%message%</h4>
		<p class="result">%result%</p>
		<form class="sendForm" action="" method="POST">
			<input class="emailtext"  type="email" name="email" placeholder="Введите почту для отправки результата">
			<button class="button">Отправить</button>
		</form>
	`;

	let title, message;
	// Варианты заголовков и текстов
	if (score === questions.length) {
		title = 'Поздравляем! 🥇';
		message = 'Вы ответили верно на все вопросы 👏';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат 🥈';
		message = 'Вы дали более половины правильных ответов 🤝';
	} else {
		title = 'Стоит постараться 🥉';
		message = 'Пока у вас меньше половины правильных ответов 👍';
	}
	// Результат
	let result = `${score} из ${questions.length}`;

	// Финальный ответ, подставляем данные в шаблон
	const finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result);

	questionContainer.innerHTML = finalMessage;

	// Меняем кнопку на "Начать заново"
	quizBtn.blur();
	quizBtn.innerText = 'Начать заново';
	quizBtn.onclick = () => history.go();
}



