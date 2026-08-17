function stoneGameV(stoneValue: number[]): number {
    const n = stoneValue.length;
    const prefix = new Array(n + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + stoneValue[i];
    }

    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;

            for (let k = i; k < j; k++) {
                const leftSum = prefix[k + 1] - prefix[i];
                const rightSum = prefix[j + 1] - prefix[k + 1];

                if (leftSum < rightSum) {
                    dp[i][j] = Math.max(dp[i][j], leftSum + dp[i][k]);
                } else if (rightSum < leftSum) {
                    dp[i][j] = Math.max(dp[i][j], rightSum + dp[k + 1][j]);
                } else {
                    dp[i][j] = Math.max(dp[i][j], leftSum + Math.max(dp[i][k], dp[k + 1][j]));
                }
            }
        }
    }

    return dp[0][n - 1];
}