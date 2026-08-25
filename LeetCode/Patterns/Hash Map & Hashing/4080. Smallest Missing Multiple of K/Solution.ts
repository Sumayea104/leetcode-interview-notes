function missingMultiple(nums: number[], k: number): number {
    const numSet = new Set(nums);
    let target = k;
    
    while (numSet.has(target)) {
        target += k;
    }
    
    return target;
}