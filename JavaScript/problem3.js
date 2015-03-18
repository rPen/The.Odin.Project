/* Project Euler: Problem 3 - Largest Prime Factor
	 https://projecteuler.net/problem=3

	 The prime factors of 13195 are 5, 7, 13 and 29.

	 What is the largest prime factor of the number 600851475143?
*/


function largestPrimeFactor(n) {
	for (i = 2; i < Math.sqrt(n); i++) {
		if (n % i == 0)
			return largestPrimeFactor(n/i);
	}
  return n;
}

largestPrimeFactor(600851475143);
// → 6857