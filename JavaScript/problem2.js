/* Project Euler: Problem 2 - Even Fibonacci Numbers 
   https://projecteuler.net/problem=2

   Each new term in the Fibonacci sequence is generated by adding the previous
   two terms. 

   By starting with 1 and 2, the first 10 terms will be:

   		1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

   By considering the terms in the Fibonacci sequence whose values do not 
   exceed four million, find the sum of the even-valued terms. 
*/


// Recursive function to get Fibonacci digit
function fib(x) {
	if (x == 0) 
  	return 0;
  else if (x == 1)
	  return 1;
	else
	  return fib(x-1) + fib(x-2);
}	

var sum = 0;

for (var num = 1; ; num++) {
    var fibNum = fib(num);
	if (fibNum > 4000000)
		break;    
	if (fibNum % 2 == 0)
		sum += fibNum;
}	

console.log(sum); // 4613732