const leastCommonMultiple = (a: number, b: number) =>
    (a * b) / greatestCommonDivisor(a, b);
  
  const greatestCommonDivisor = (a: number, b: number): number => {
   
    if(a == 0) return b;

   return greatestCommonDivisor(b % a, a);
  };
  
  const num1 = 12;
  const num2 = 65536;
  
  const lcd = leastCommonMultiple(num1, num2);
  console.log(`The LCM of ${num1} and ${num2} is:`, lcd);
  console.log(greatestCommonDivisor(num1,num2))