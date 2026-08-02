function stoneGame(piles: number[]): boolean {
    const n = piles.length;

    const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        dp[i][i] = piles[i];
    }

    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            dp[i][j] = Math.max(
                piles[i] - dp[i + 1][j],
                piles[j] - dp[i][j - 1]
            );
        }
    }

    return dp[0][n - 1] > 0;
};