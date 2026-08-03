function stoneGameIII(stoneValue: number[]): string {
    const n = stoneValue.length;
    
    const dp: number[] = new Array(n + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let maxDiff = -Infinity;
        let currentTake = 0;

        for (let k = 1; k <= 3 && i + k <= n; k++) {
            currentTake += stoneValue[i + k - 1];
            maxDiff = Math.max(maxDiff, currentTake - dp[i + k]);
        }

        dp[i] = maxDiff;
    }

    if (dp[0] > 0) return "Alice";
    if (dp[0] < 0) return "Bob";
    return "Tie";
}