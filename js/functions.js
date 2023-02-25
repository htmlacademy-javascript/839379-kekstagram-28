// 1. Проверка длины строки
const lengthCheck = (string, symbolQuantity) => string.length <= symbolQuantity;

lengthCheck('Всем привет! Меня зовут Артем', 11);
lengthCheck('Всем привет! Меня зовут Артем', 29);
lengthCheck('Всем привет! Меня зовут Артем', 31);


// 2. Проверка на палиндром
const isPalindromCheck = (string) => {
  const newString = string.toLowerCase().replaceAll(' ', '');
  const reverseString = newString.split('').reverse().join('');
  return newString === reverseString;
};

isPalindromCheck('топот');
isPalindromCheck('ДовОд');
isPalindromCheck('Кекс');
isPalindromCheck('Лёша на полке клопа нашёл');


// 3. Извлечение чисел из строки
const valueToNumber = (value) => {
  const string = String(value).replaceAll(' ', '');
  let result = '';
  for(let i = 0; i < string.length; i++) {
    const currentSymbol = string[i];
    if(+currentSymbol || +currentSymbol === 0) {
      result += currentSymbol;
    }
  }
  return result === '' ? NaN : +result;
};

valueToNumber('2023 год'); // Результат: число 2023
valueToNumber('ECMAScript 2022'); // Результат: число 2022
valueToNumber('1 кефир, 0.5 батона'); // Результат: число 105
valueToNumber('а я томат'); // Результат: NaN
valueToNumber(2023); // Результат: число 2023
valueToNumber(-1); // Результат: число 1
valueToNumber(1.5); // Результат: число 15


// 4. Модифицирование строки
const modifyString = (string, symbolQuantity, modifier) => {
  if(string.length >= symbolQuantity) {
    return string;
  }

  let accumulator = '';
  let newString;
  for(let i = 0; i < symbolQuantity; i++) {
    newString = '';
    for(let j = 0; j < modifier.length; j++) {
      newString += modifier[j];
      if((newString + accumulator + string).length === symbolQuantity) {
        return newString + accumulator + string;
      }
    }
    accumulator = newString + accumulator;
  }
};

modifyString('1', 2, '0'); // Результат: строка '01'
modifyString('1', 4, '0'); // Результат: строка '0001'
modifyString('q', 4, 'werty'); // Результат: строка 'werq'
modifyString('q', 4, 'we'); // Результат: строка 'wweq'
modifyString('qwerty', 4, '0'); // Результат: строка 'qwerty'
