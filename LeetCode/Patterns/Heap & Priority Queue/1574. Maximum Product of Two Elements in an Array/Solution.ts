function maxProduct(nums: number[]): number {
    let max1 = 0;
    let max2 = 0;

    for (const x of nums) {
        if (x > max1) {
            max2 = max1;
            max1 = x;
        } else if (x > max2) {
            max2 = x;
        }
    }

    return (max1 - 1) * (max2 - 1);
};