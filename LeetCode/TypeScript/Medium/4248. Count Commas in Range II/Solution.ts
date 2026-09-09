function countCommas(n: number): number {
    let totalCommas = 0n;
    const bigN = BigInt(n);
    let threshold = 1000n; 
    while (bigN >= threshold) {
        totalCommas += bigN - threshold + 1n;
        threshold *= 1000n; 
    }

    return Number(totalCommas);
};