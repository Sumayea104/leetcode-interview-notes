function findMissingElements(nums: number[]): number[] {
    const minVal = Math.min(...nums);
    const maxVal = Math.max(...nums);

    const numSet = new Set(nums);
    const result: number[] = [];

    for (let i = minVal; i <= maxVal; i++) {
        if (!numSet.has(i)) {
            result.push(i);
        }
    }

    return result;
}