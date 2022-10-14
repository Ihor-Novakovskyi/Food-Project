
let reg = 'fucntion';
let reg1 = 12;
let name = {
  name: 12,
  'second': 123,
  [reg] : f(),
  [reg1]: 12,
  name1: f1(),
  name2: f2(),
  name3: f3(),
}
function f() {
  console.log(12);
}
function f1() {
  return 1;
}
function f2() {
  return 2;
}
function f3() {
  return 3;
}
let a = 5;
{
  let c = 7;
  function gun() {
    c = 9;
    console.log(c);
  }
  gun();
}