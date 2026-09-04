function firstStableIndex(nums: number[], k: number): number {
    const n = nums.length;
    
    const suffixMin = new Array(n);
    suffixMin[n - 1] = nums[n - 1];
    
    for (let i = n - 2; i >= 0; i--) {
        suffixMin[i] = Math.min(nums[i], suffixMin[i + 1]);
    }
    
    let runningMax = -Infinity;
    
    for (let i = 0; i < n; i++) {
        runningMax = Math.max(runningMax, nums[i]);
        
        const instabilityScore = runningMax - suffixMin[i];
        if (instabilityScore <= k) {
            return i;
        }
    }
    
    return -1;
}