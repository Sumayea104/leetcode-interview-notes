function winnerSquareGame(n: number): boolean {
    const dp = new Array<boolean>(n + 1).fill(false);

    for (let i = 1; i <= n; i++) {
        for (let k = 1; k * k <= i; k++) {
            if (!dp[i - k * k]) {
                dp[i] = true;
                break; // Found a winning move, no need to check further square numbers
            }
        }
    }

    return dp[n];
}