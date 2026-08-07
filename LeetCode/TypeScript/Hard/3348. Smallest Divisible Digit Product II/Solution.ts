function smallestNumber(num: string, t: number): string {

    let c2 = 0, c3 = 0, c5 = 0, c7 = 0;
    
    let tempT = t;
    while (tempT % 2 === 0) { c2++; tempT /= 2; }
    while (tempT % 3 === 0) { c3++; tempT /= 3; }
    while (tempT % 5 === 0) { c5++; tempT /= 5; }
    while (tempT % 7 === 0) { c7++; tempT /= 7; }
    
    if (tempT > 1) return "-1"; // Invalid prime factor in t

    // Helper: Compute factors contributed by a digit 1-9
    function getDigitFactors(d: number): [number, number, number, number] {
        if (d === 2) return [1, 0, 0, 0];
        if (d === 3) return [0, 1, 0, 0];
        if (d === 4) return [2, 0, 0, 0];
        if (d === 5) return [0, 0, 1, 0];
        if (d === 6) return [1, 1, 0, 0];
        if (d === 7) return [0, 0, 0, 1];
        if (d === 8) return [3, 0, 0, 0];
        if (d === 9) return [0, 2, 0, 0];
        return [0, 0, 0, 0];
    }

    function getMinimalDigits(r2: number, r3: number, r5: number, r7: number): string {
        r2 = Math.max(0, r2);
        r3 = Math.max(0, r3);
        r5 = Math.max(0, r5);
        r7 = Math.max(0, r7);

        let c8 = Math.floor(r2 / 3);
        r2 %= 3;

        let c9 = Math.floor(r3 / 2);
        r3 %= 2;

        let c6 = 0;
        if (r2 === 1 && r3 === 1) {
            c6 = 1;
            r2 = 0;
            r3 = 0;
        }

        let c4 = Math.floor(r2 / 2);
        r2 %= 2;
        let digits: number[] = [];
        for (let i = 0; i < r2; i++) digits.push(2);
        for (let i = 0; i < r3; i++) digits.push(3);
        for (let i = 0; i < c4; i++) digits.push(4);
        for (let i = 0; i < r5; i++) digits.push(5);
        for (let i = 0; i < c6; i++) digits.push(6);
        for (let i = 0; i < r7; i++) digits.push(7);
        for (let i = 0; i < c8; i++) digits.push(8);
        for (let i = 0; i < c9; i++) digits.push(9);

        digits.sort((a, b) => a - b);
        return digits.join('');
    }

    const N = num.length;

    // Check if `num` itself is zero-free and divisible
    let validSelf = true;
    let pref2 = c2, pref3 = c3, pref5 = c5, pref7 = c7;
    for (let i = 0; i < N; i++) {
        const d = parseInt(num[i]);
        if (d === 0) {
            validSelf = false;
            break;
        }
        const [f2, f3, f5, f7] = getDigitFactors(d);
        pref2 -= f2; pref3 -= f3; pref5 -= f5; pref7 -= f7;
    }

    if (validSelf && pref2 <= 0 && pref3 <= 0 && pref5 <= 0 && pref7 <= 0) {
        return num;
    }

    const prefixReq: Array<[number, number, number, number]> = new Array(N + 1);
    prefixReq[0] = [c2, c3, c5, c7];

    let zeroIdx = -1;
    for (let i = 0; i < N; i++) {
        const d = parseInt(num[i]);
        if (d === 0) {
            zeroIdx = i;
            break;
        }
        const [f2, f3, f5, f7] = getDigitFactors(d);
        const [p2, p3, p5, p7] = prefixReq[i];
        prefixReq[i + 1] = [p2 - f2, p3 - f3, p5 - f5, p7 - f7];
    }

   
    const startIdx = (zeroIdx !== -1) ? zeroIdx : N - 1;

    for (let i = startIdx; i >= 0; i--) {
        const startDigit = parseInt(num[i]) + 1;
        const [cur2, cur3, cur5, cur7] = prefixReq[i];

        for (let d = startDigit; d <= 9; d++) {
            const [f2, f3, f5, f7] = getDigitFactors(d);
            const rem2 = cur2 - f2;
            const rem3 = cur3 - f3;
            const rem5 = cur5 - f5;
            const rem7 = cur7 - f7;

            const minSuffix = getMinimalDigits(rem2, rem3, rem5, rem7);
            const availableSpace = N - 1 - i;

            if (minSuffix.length <= availableSpace) {
                const paddingOnes = '1'.repeat(availableSpace - minSuffix.length);
                const prefix = num.substring(0, i);
                return prefix + d.toString() + paddingOnes + minSuffix;
            }
        }
    }

    
    const minSuffix = getMinimalDigits(c2, c3, c5, c7);
    const targetLength = Math.max(N + 1, minSuffix.length);
    const paddingOnes = '1'.repeat(targetLength - minSuffix.length);
    return paddingOnes + minSuffix;
}