function lexPalindromicPermutation(s: string, target: string): string {
    const n = s.length;
    const m = Math.floor(n / 2);

    const freq = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        freq[s.charCodeAt(i) - 97]++;
    }

    let oddCount = 0;
    let midChar = '';
    for (let i = 0; i < 26; i++) {
        if (freq[i] % 2 !== 0) {
            oddCount++;
            midChar = String.fromCharCode(97 + i);
        }
    }
    if (oddCount > 1) return "";

    const halfFreq = new Array(26).fill(0);
    for (let i = 0; i < 26; i++) {
        halfFreq[i] = Math.floor(freq[i] / 2);
    }

    const buildPalindrome = (firstHalf: string): string => {
        const secondHalf = firstHalf.split('').reverse().join('');
        return n % 2 === 1 ? firstHalf + midChar + secondHalf : firstHalf + secondHalf;
    };

    const canFormPrefix = (prefix: string): boolean => {
        const counts = [...halfFreq];
        for (let i = 0; i < prefix.length; i++) {
            const idx = prefix.charCodeAt(i) - 97;
            if (counts[idx] <= 0) return false;
            counts[idx]--;
        }
        return true;
    };

    const getRemainingSorted = (counts: number[]): string => {
        let res = "";
        for (let i = 0; i < 26; i++) {
            res += String.fromCharCode(97 + i).repeat(counts[i]);
        }
        return res;
    };

    let bestResult: string | null = null;

    if (canFormPrefix(target.slice(0, m))) {
        const candidate = buildPalindrome(target.slice(0, m));
        if (candidate > target) {
            bestResult = candidate;
        }
    }

    for (let i = m - 1; i >= 0; i--) {
        const prefix = target.slice(0, i);
        if (!canFormPrefix(prefix)) continue;

        // Calculate counts left after prefix
        const countsLeft = [...halfFreq];
        for (let j = 0; j < i; j++) {
            countsLeft[target.charCodeAt(j) - 97]--;
        }

        const targetCharIdx = target.charCodeAt(i) - 97;
        
        for (let c = targetCharIdx + 1; c < 26; c++) {
            if (countsLeft[c] > 0) {
                countsLeft[c]--;
                const firstHalf = prefix + String.fromCharCode(97 + c) + getRemainingSorted(countsLeft);
                const candidate = buildPalindrome(firstHalf);
                
                if (bestResult === null || candidate < bestResult) {
                    bestResult = candidate;
                }
                break; 
            }
        }

        if (bestResult !== null) {
            break;
        }
    }

    return bestResult ?? "";
}