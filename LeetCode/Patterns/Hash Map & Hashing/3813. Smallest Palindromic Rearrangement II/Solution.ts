function smallestPalindrome(s: string, k: number): string {
    const n = s.length;
    const m = Math.floor(n / 2);

    // 1. Frequency count for the left half
    const halfCount = new Int32Array(26);
    let oddChar = "";
    
    for (let i = 0; i < n; i++) {
        halfCount[s.charCodeAt(i) - 97]++;
    }

    for (let i = 0; i < 26; i++) {
        if (halfCount[i] % 2 !== 0) {
            oddChar = String.fromCharCode(97 + i);
        }
        halfCount[i] = Math.floor(halfCount[i] / 2);
    }

    const CAP = k + 1;

    // Helper to calculate multinomial combinations for remaining letters
    // capped at k + 1 to avoid overflow.
    function getTotalWays(remLen: number): number {
        let ways = 1;
        let rem = remLen;

        for (let i = 0; i < 26; i++) {
            const cnt = halfCount[i];
            if (cnt <= 0) continue;

            // Calculate C(rem, cnt)
            let cVal = 1;
            const r = Math.min(cnt, rem - cnt);
            for (let j = 1; j <= r; j++) {
                cVal = Math.floor((cVal * (rem - j + 1)) / j);
                if (cVal > CAP) {
                    cVal = CAP;
                    break;
                }
            }

            ways = Math.min(CAP, ways * cVal);
            if (ways >= CAP) return CAP;

            rem -= cnt;
        }
        return ways;
    }

    // 2. Build left half position by position
    const leftChars: string[] = new Array(m);

    for (let pos = 0; pos < m; pos++) {
        let matched = false;
        const remLen = m - pos; // current length of remaining slots
        
        // Compute total ways for current state ONCE per position
        const totalWays = getTotalWays(remLen);

        for (let c = 0; c < 26; c++) {
            if (halfCount[c] === 0) continue;

            // Ways if we pick character c: totalWays * count[c] / remLen
            let waysWithC = 0;
            if (totalWays >= CAP) {
                // Recalculate directly if capped
                halfCount[c]--;
                waysWithC = getTotalWays(remLen - 1);
                halfCount[c]++;
            } else {
                waysWithC = Math.floor((totalWays * halfCount[c]) / remLen);
            }

            if (waysWithC >= k) {
                leftChars[pos] = String.fromCharCode(97 + c);
                halfCount[c]--;
                matched = true;
                break;
            } else {
                k -= waysWithC;
            }
        }

        if (!matched) return "";
    }

    // 3. Construct final palindrome
    const leftHalf = leftChars.join("");
    const rightHalf = leftChars.reverse().join("");

    return leftHalf + (n % 2 !== 0 ? oddChar : "") + rightHalf;
}