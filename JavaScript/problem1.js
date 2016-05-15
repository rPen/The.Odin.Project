
/* Project Euler: Problem 1 - Multiples of 3 and 5
   https://projecteuler.net/problem=1
   If we list all the natural numbers below 10 that are multiples of 3 or 5,
   we get 3, 5, 6 and 9. The sum of these multiples is 23.
   Find the sum of all the multiples of 3 or 5 below 1,000.
*/

function multiples(maxNum) {
  var num,
      sum;
  for (sum = 0, num = 1; num < maxNum; num += 1) {
    if (num % 3 === 0 || num % 5 === 0) {
      sum += num;
    }
  }

  return sum;
}
