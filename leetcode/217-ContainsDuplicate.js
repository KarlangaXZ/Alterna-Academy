/**Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

Example 1:

Input: nums = [1,2,3,1]

Output: true

Explanation:

The element 1 occurs at the indices 0 and 3.

Example 2:

Input: nums = [1,2,3,4]

Output: false

Explanation:

All elements are distinct.

Example 3:

Input: nums = [1,1,1,3,3,4,3,2,4,2]

Output: true

Constraints:

1 <= nums.length <= 105
-109 <= nums[i] <= 109
 */
var nums1 = [1, 2, 3, 1];
var nums2 = [1, 2, 3, 4];
var nums3 = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2];
function containsDuplicate(nums) {
    var SetNum = new Set();
    for (var _i = 0, nums_1 = nums; _i < nums_1.length; _i++) {
        var num = nums_1[_i];
        if (SetNum.has(num)) {
            return true;
        }
        SetNum.add(num);
    }
    return false;
}
;
console.log(containsDuplicate(nums1));
console.log(containsDuplicate(nums2));
console.log(containsDuplicate(nums3));
