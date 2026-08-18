function largestInteger(nums: number[], k: number): number {
    const n = nums.length;

    if (k === 1) {
        const counts = new Map<number, number>();
        for (const num of nums) {
            counts.set(num, (counts.get(num) || 0) + 1);
        }
        let maxVal = -1;
        for (const [num, count] of counts.entries()) {
            if (count === 1) {
                maxVal = Math.max(maxVal, num);
            }
        }
        return maxVal;
    }

    if (k === n) {
        return Math.max(...nums);
    }

    let firstCount = 0;
    let lastCount = 0;
    
    for (const num of nums) {
        if (num === nums[0]) firstCount++;
        if (num === nums[n - 1]) lastCount++;
    }
    
    let ans = -1;
    if (firstCount === 1) ans = Math.max(ans, nums[0]);
    if (lastCount === 1) ans = Math.max(ans, nums[n - 1]);
    
    return ans;
};