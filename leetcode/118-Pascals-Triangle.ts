/** 
 * Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:


 

Example 1:

Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
Example 2:

Input: numRows = 1
Output: [[1]]
 

Constraints:

1 <= numRows <= 30
*/

function generate(numRows: number): number[][] {
    const numbers: number[][] = [[1]];
  if(numRows === 1) return numbers
  for(let row = 1; row < numRows; row++) {
    const values: number[] = [];
    for(let index = 0; index < row + 1; index++) {
      values.push((numbers[row - 1][index - 1] ?? 0) + (numbers[row - 1][index] ?? 0))
    }
    numbers.push(values);
  };
  return numbers; 
};