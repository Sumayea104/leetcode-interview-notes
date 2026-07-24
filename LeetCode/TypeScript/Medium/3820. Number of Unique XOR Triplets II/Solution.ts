function uniqueXorTriplets(nums: number[]): number {
    const pairXor = new Set<number>();

    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            pairXor.add(nums[i] ^ nums[j]);
        }
    }

    const result = new Set<number>();

    for (const value of pairXor) {
        for (const num of nums) {
            result.add(value ^ num);
        }
    }

    return result.size;
}