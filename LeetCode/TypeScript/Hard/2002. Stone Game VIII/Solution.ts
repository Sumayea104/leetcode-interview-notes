function stoneGameVIII(stones: number[]): number {
    const n = stones.length;

    const pref: number[] = new Array(n);
    pref[0] = stones[0];
    for (let i = 1; i < n; i++) {
        pref[i] = pref[i - 1] + stones[i];
    }
    
    let maxDiff = pref[n - 1];

    for (let i = n - 2; i >= 1; i--) {
        maxDiff = Math.max(maxDiff, pref[i] - maxDiff);
    }
    
    return maxDiff;
}