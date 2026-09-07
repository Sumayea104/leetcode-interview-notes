function distinctSubseqII(s: string): number {
    const MOD = 1e9 + 7;
    let total = 0;
    const dp = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        const charIdx = s.charCodeAt(i) - 97; 
        const newSubseqs = (total + 1 - dp[charIdx] + MOD) % MOD;

        total = (total + newSubseqs) % MOD;
        dp[charIdx] = (dp[charIdx] + newSubseqs) % MOD;
    }

    return total;
}