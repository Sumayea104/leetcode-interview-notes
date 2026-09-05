function firstStableIndex(nums: number[], k: number): number {
    const n = nums.length;
    const suffMin: number[] = new Array(n);
    

    suffMin[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        suffMin[i] = Math.min(nums[i], suffMin[i + 1]);
    }
    
    let prefMax = nums[0];
    for (let i = 0; i < n; i++) {
        prefMax = Math.max(prefMax, nums[i]);
        if (prefMax - suffMin[i] <= k) {
            return i;
        }
    }
    
    return -1;
}