function stoneGameII(piles: number[]): number {
    const n = piles.length;

    const suffixSum = new Array(n + 1).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        suffixSum[i] = suffixSum[i + 1] + piles[i];
    }
    

    const memo: number[][] = Array.from({ length: n }, () => new Array(n + 1).fill(0));

    function getOptimal(i: number, M: number): number {

        if (i + 2 * M >= n) {
            return suffixSum[i];
        }
        
        if (memo[i][M] > 0) {
            return memo[i][M];
        }

        let minOpponentStones = Infinity;

        for (let X = 1; X <= 2 * M; X++) {
            const nextM = Math.max(M, X);

            minOpponentStones = Math.min(minOpponentStones, getOptimal(i + X, nextM));
        }

        memo[i][M] = suffixSum[i] - minOpponentStones;
        return memo[i][M];
    }

    return getOptimal(0, 1);
}