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

    // 2. Pre-compute Pascal's Triangle (Combinations table: C[n][k]) up to length m
    const CAP = k + 1;
    const comb: number[][] = Array.from({ length: m + 1 }, () => new Array(m + 1).fill(0));
    
    for (let i = 0; i <= m; i++) {
        comb[i][0] = 1;
        for (let j = 1; j <= i; j++) {
            const val = comb[i - 1][j - 1] + comb[i - 1][j];
            comb[i][j] = val > CAP ? CAP : val;
        }
    }

    // Helper: Fast permutation counting using pre-computed combinations
    function getWays(remLen: number): number {
        let ways = 1;
        let rem = remLen;

        for (let i = 0; i < 26; i++) {
            const cnt = halfCount[i];
            if (cnt === 0) continue;

            ways *= comb[rem][cnt];
            if (ways > CAP) return CAP;

            rem -= cnt;
        }
        return ways;
    }

    // 3. Digit-by-digit lexicographical construction
    const leftChars: string[] = new Array(m);
    
    for (let pos = 0; pos < m; pos++) {
        let matched = false;
        const remLen = m - 1 - pos;

        for (let c = 0; c < 26; c++) {
            if (halfCount[c] === 0) continue;

            halfCount[c]--;
            const ways = getWays(remLen);

            if (ways >= k) {
                leftChars[pos] = String.fromCharCode(97 + c);
                matched = true;
                break;
            } else {
                k -= ways;
                halfCount[c]++; // Backtrack
            }
        }

        if (!matched) return "";
    }

    // 4. Construct final palindrome
    const leftHalf = leftChars.join("");
    const rightHalf = leftChars.reverse().join("");

    return leftHalf + (n % 2 !== 0 ? oddChar : "") + rightHalf;
}