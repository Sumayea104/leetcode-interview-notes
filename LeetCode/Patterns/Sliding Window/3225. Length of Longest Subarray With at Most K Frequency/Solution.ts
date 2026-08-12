function maxSubarrayLength(nums: number[], k: number): number {
    const freq = new Map<number, number>();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < nums.length; right++) {
        const num = nums[right];
        freq.set(num, (freq.get(num) || 0) + 1);

        // Shrink window if frequency condition is violated
        while (freq.get(num)! > k) {
            const leftNum = nums[left];
            freq.set(leftNum, freq.get(leftNum)! - 1);
            left++;
        }

        // Calculate max window size
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}