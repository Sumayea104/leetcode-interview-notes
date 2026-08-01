function predictTheWinner(nums: number[]): boolean {
    const n = nums.length;
    const memo: number[][] = Array.from({ length: n }, () => Array(n).fill(null));

    function maxDiff(i: number, j: number): number {
        if (i === j) return nums[i];
        if (memo[i][j] !== null) return memo[i][j];

        const pickLeft = nums[i] - maxDiff(i + 1, j);
        const pickRight = nums[j] - maxDiff(i, j - 1);

        return (memo[i][j] = Math.max(pickLeft, pickRight));
    }

    return maxDiff(0, n - 1) >= 0;
}