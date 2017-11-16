var attempts = 0; // раунд
var questions = []; //массив вопросов
var arrHelp = [true, true, true]; //массив подсказок

//конструктор вопроса
function GenegateQuestion(question, rightAnswer, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer) {
	this.question = question; //текст вопроса
	this.rightAnswer = rightAnswer; //номер правильного ответа
	this.firstAnswer = firstAnswer; //варианты ответов
	this.secondAnswer = secondAnswer;
	this.thirdAnswer = thirdAnswer;
	this.fourthAnswer = fourthAnswer;
}

//составление вопросов
//формулировка вопроса, правильный ответ, варианты ответов
var firstQuestion = new GenegateQuestion('1 = ?', 1, '1', '2', '3', '4');
var secondQuestion = new GenegateQuestion('2 = ?', 2, '2', '2', '3', '4');

//добавление вопросов в массив
generateArrQuestion(firstQuestion, secondQuestion);

//функция добавления вопросов в массив
function generateArrQuestion() {
	for (var i = 0; i < arguments.length; i++) {
		questions.push(arguments[i]);
	}
}

//функция задает вопрос
function sayQuestion() {
	var textHelp1 = '';
	var textHelp2 = '';
	var textHelp3 = '';
	if (arrHelp[0]) {
		textHelp1 = 'Помощь друга: 7  ';
	};
	if (arrHelp[1]) {
		textHelp2 = 'Помощь зала: 8  ';
	};
	if (arrHelp[2]) {
		textHelp3 = '50/50: 9';
	}
	return prompt(questions[attempts].question + '\n\n' +
		'1. ' + questions[attempts].firstAnswer + '   2. ' + questions[attempts].secondAnswer + '\n' +
		'3. ' + questions[attempts].thirdAnswer + '   4. ' + questions[attempts].fourthAnswer +
		'\n\nПодсказки (можно использовать только 1 раз):\n' +
		textHelp1 + textHelp2 + textHelp3, 0);
}

//функция генерации числа от 1 до 4
function generateRandomOfFour() {
	return Math.round(1 + Math.random() * (4 - 1));
}

function guessNumber() {
	var result = sayQuestion();
	var gameIsRunning = true;

	// пока игрок не угадал число
	while (gameIsRunning) {
		// выход из игры
		if (parseInt(result) == -1 || result == null) {
			gameIsRunning = false;
		}

		// игрок ввел некорректные данные
		else if (parseInt(result) == 0 || isNaN(parseInt(result))) {
			alert("Вы не ввели число");
			// запрашиваем по новой
			result = sayQuestion();
		}

		//помощь друга
		else if (parseInt(result) == 7) {
			if (!arrHelp[0]) {
				alert('Вы уже использовали эту подсказку!');
				result = sayQuestion();
			} else {
				arrHelp[0] = false;
				alert('Я думаю, что правильный ответ: ' + generateRandomOfFour());
				result = sayQuestion();
			}
		}

		//помощь зала
		else if (parseInt(result) == 8) {
			if (!arrHelp[1]) {
				alert('Вы уже использовали эту подсказку!');
				result = sayQuestion();
			} else {
				arrHelp[1] = false;
				//генерация остальных уникальных вариантов ответа
				var arrHall = [];
				var randomVariant;
				while (arrHall.length < 3) {
					randomVariant = generateRandomOfFour();
					if (randomVariant != questions[attempts].rightAnswer && arrHall.indexOf(randomVariant) == -1) {
						arrHall.push(randomVariant);
					}
				}
				//вывод вариантов
				alert('Зал считает так: \n' + '40% ' + questions[attempts].rightAnswer +
					'\n30% ' + arrHall[0] +
					'\n20% ' + arrHall[1] +
					'\n10% ' + arrHall[2]);
				result = sayQuestion();
			}
		}

		//50 на 50
		else if (parseInt(result) == 9) {
			if (!arrHelp[2]) {
				alert('Вы уже использовали эту подсказку!');
				result = sayQuestion();
			} else {
				arrHelp[2] = false;
				var arr = [questions[attempts].rightAnswer];

				//проверка на уникальнось сгенерированного второго варианта
				var randomNumber;
				while (arr.length < 2) {
					randomNumber = generateRandomOfFour();
					if (randomNumber != questions[attempts].rightAnswer) {
						arr.push(randomNumber);
					}
				}

				//сортировка в случайном порядке
				function compareRandom(a, b) {
					return Math.random() - 0.5;
				}
				arr.sort(compareRandom);

				//вывод результата
				alert('Это или вариант ' + arr[0] + ' или вариант ' + arr[1]);
				result = sayQuestion();
			}
		}

		// проверяем число
		else {
			var answer = checkAnswer(result);

			//если вопросы закончились, то сообщаем о выигрыше и прерываем цикл
			if (attempts == questions.length) {
				alert("Поздравляем! Вы ответили правильно. Ваш выигрыш: " + attempts * 1000 + ' рублей!');
				break;
			}

			if (answer) {
				// правильный ответ
				alert("Поздравляем! Вы ответили правильно. Раунд: " + attempts);
				//следующий ход				
				result = sayQuestion();
			}
			else {
				//проигрыш				
				alert('Вы проиграли!');
				gameIsRunning = false;
			}
		}
	}
}

//почемуто если раньше объявить, то объект созданные конструктором не видны
guessNumber();

//проверка ответа
function checkAnswer(myanswer) {
	var answer = false;
	console.log(questions[attempts].rightAnswer)

	var rightAnswer;
	if (myanswer == questions[attempts].rightAnswer) {
		answer = true;
		attempts++;
	}
	return answer;
}