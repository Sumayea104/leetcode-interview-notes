function findKthSmallest(coins: number[], k: number): number {
    const n = coins.length;

    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };
    const lcm = (a: number, b: number): number => {
        return (a * b) / gcd(a, b);
    };

    const countAmounts = (x: number): number => {
        let total = 0;
        const totalSubsets = 1 << n;

        for (let mask = 1; mask < totalSubsets; mask++) {
            let currentLcm = 1;
            let subsetSize = 0;

            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) !== 0) {
                    subsetSize++;
                    currentLcm = lcm(currentLcm, coins[i]);

                    if (currentLcm > x) break;
                }
            }

            const count = Math.floor(x / currentLcm);
            if (subsetSize % 2 === 1) {
                total += count;
            } else {
                total -= count;
            }
        }

        return total;
    };
    let low = 1;
    let high = Math.min(...coins) * k;
    let result = high;

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (countAmounts(mid) >= k) {
            result = mid;
            high = mid - 1; 
        } else {
            low = mid + 1;
        }
    }

    return result;
}