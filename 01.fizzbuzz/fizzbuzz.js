let numbers = [...Array(20)].map((_, index) => index + 1);

let convertToFizzbuzz = (number) => {
  if (number % 3 === 0 && number % 5 === 0) return "FizzBuzz";
  else if (number % 3 === 0) return "Fizz";
  else if (number % 5 === 0) return "Buzz";
  else return number;
};

numbers.forEach((number) => console.log(convertToFizzbuzz(number)));
