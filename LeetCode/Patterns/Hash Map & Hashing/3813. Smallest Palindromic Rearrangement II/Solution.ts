function smallestPalindrome(s: string, k: number): string {
    const n = s.length;
    const m = Math.floor(n / 2);

    // 1. Count frequencies of each character
    const freq: number[] = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        freq[s.charCodeAt(i) - 97]++;
    }

    // 2. Halve frequencies for the left half
    const halfCount: number[] = new Array(26).fill(0);
    let oddChar = "";
    for (let i = 0; i < 26; i++) {
        if (freq[i] % 2 !== 0) {
            oddChar = String.fromCharCode(97 + i);
        }
        halfCount[i] = Math.floor(freq[i] / 2);
    }

    // Helper: Calculate combinations C(n, r) capped at k + 1 to prevent overflow
    function nCr(n: number, r: number, cap: number): number {
        if (r < 0 || r > n) return 0;
        if (r === 0 || r === n) return 1;
        if (r > n - r) r = n - r;

        let res = 1;
        for (let i = 1; i <= r; i++) {
            res = Math.floor((res * (n - i + 1)) / i);
            if (res > cap) return cap;
        }
        return res;
    }

    // Helper: Calculate total permutations of remaining characters in halfCount
    function countPermutations(remLen: number, cap: number): number {
        let ways = 1;
        let remaining = remLen;

        for (let i = 0; i < 26; i++) {
            if (halfCount[i] === 0) continue;
            ways *= nCr(remaining, halfCount[i], cap);
            if (ways > cap) return cap;
            remaining -= halfCount[i];
        }
        return ways;
    }

    // 3. Construct the first half digit-by-digit
    let firstHalf = "";
    for (let pos = 0; pos < m; pos++) {
        let matched = false;
        const remLen = m - 1 - pos;

        for (let c = 0; c < 26; c++) {
            if (halfCount[c] === 0) continue;

            // Try picking character c
            halfCount[c]--;
            const ways = countPermutations(remLen, k + 1);

            if (ways >= k) {
                // The k-th permutation lies in this branch
                firstHalf += String.fromCharCode(97 + c);
                matched = true;
                break;
            } else {
                // Skip these permutations
                k -= ways;
                halfCount[c]++; // Revert choice
            }
        }

        // If no valid choice was found, fewer than k permutations exist
        if (!matched) return "";
    }

    // 4. Build final full palindrome
    const secondHalf = firstHalf.split("").reverse().join("");
    return firstHalf + (n % 2 !== 0 ? oddChar : "") + secondHalf;
}