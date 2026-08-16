function stoneGameIX(stones: number[]): boolean {
    const cnt = [0, 0, 0];
    for (const s of stones) {
        cnt[s % 3]++;
    }

    if (cnt[0] % 2 === 0) {

        return cnt[1] >= 1 && cnt[2] >= 1;
    } else {
        return Math.abs(cnt[1] - cnt[2]) > 2;
    }
}