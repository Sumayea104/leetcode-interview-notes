function stoneGameII(piles: number[]): number {
    const n = piles.length;
    
    const suffixSum = new Array(n + 1).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        suffixSum[i] = suffixSum[i + 1] + piles[i];
    }

    const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    for (let index = n - 1; index >= 0; index--) {
        for (let maxTillNow = n; maxTillNow >= 1; maxTillNow--) {
       
            if (index + 2 * maxTillNow >= n) {
                dp[index][maxTillNow] = suffixSum[index];
                continue;
            }

            for (let X = 1; X <= 2 * maxTillNow && index + X <= n; X++) {
                const nextM = Math.max(maxTillNow, X);
                dp[index][maxTillNow] = Math.max(
                    dp[index][maxTillNow],
                    suffixSum[index] - dp[index + X][nextM]
                );
            }
        }
    }

    return dp[0][1];
}