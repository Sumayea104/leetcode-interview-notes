function minimumDeletions(nums: number[]): number {
    const n = nums.length;
    if (n <= 2) return n;

    let minIdx = 0;
    let maxIdx = 0;

    for (let i = 1; i < n; i++) {
        if (nums[i] < nums[minIdx]) {
            minIdx = i;
        }
        if (nums[i] > nums[maxIdx]) {
            maxIdx = i;
        }
    }

    let left = Math.min(minIdx, maxIdx);
    let right = Math.max(minIdx, maxIdx);

    const removeBothFromFront = right + 1;
    const removeBothFromBack = n - left;
    const removeFromBothSides = (left + 1) + (n - right);

    return Math.min(removeBothFromFront, removeBothFromBack, removeFromBothSides);
}