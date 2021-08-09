
// template string

var x = 'new ',
  y = 'zealand',
  z = x + y;

// console.log(z);
// document.querySelector('.worms').innerHTML = p;

// `` this is a back tick
document.querySelector('.worms').innerHTML += ` the backtick allows you
to break
a line into multiple different lines without having to use the + symbol!!`;

var p = `${x + y}`,
  q = `the answer issss ${5 + 7 + 3}`;
// ^^ this is called interpolation. it evaluates this expression. with the backtick you achieve expression evaluation.
// the curly brackets and backticks indicate you wish to evaluate the expression..
//oohhh so you can place this into a string without having to concatenate!! this is useful for things like the api stuff and things.
// you can even write html tags directly into backtick strings,,, wow
// let and const instead of var
console.log(q);

document.querySelector('.worms').innerHTML = p;

hey = () => {
  document.querySelector('.worms').innerHTML += ` im gonna try to do something  ${autoReturn()}`;
  // interpolation... the return from autoreturn is put into the string without concatenating... pog
  return 'hey!!!';
}

autoReturn = () => 'wow wow';
// an automatic return in arrow function - 1 statement like this can and will auto return :D

console.log(hey() + autoReturn());

let greet = 'yoobee';

let greetings = (gg) => {
  document.querySelector('.worms').innerHTML += ` GREETINGS  ${gg}`;
  return 'gg';
}
greetings(greet);

// console.log(greetings());
