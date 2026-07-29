function smallestPalindrome(s: string, k: number): string {
    const n = s.length, m = Math.floor(n / 2), CAP = k + 1;
    const cnt = new Int32Array(26);
    for (let i = 0; i < n; i++) cnt[s.charCodeAt(i) - 97]++;

    let mid = "";
    for (let i = 0; i < 26; i++) {
        if (cnt[i] % 2) mid = String.fromCharCode(97 + i);
        cnt[i] = Math.floor(cnt[i] / 2);
    }

    // নির্দিষ্ট অক্ষরগুলোর মোট বিন্যাস সংখ্যা বের করার ফাংশন
    const getWays = (remLen: number): number => {
        let ways = 1, rem = remLen;
        for (let i = 0; i < 26; i++) {
            if (cnt[i] <= 0) continue;
            let cVal = 1, r = Math.min(cnt[i], rem - cnt[i]);
            for (let j = 1; j <= r; j++) {
                cVal = Math.floor((cVal * (rem - j + 1)) / j);
                if (cVal > CAP) { cVal = CAP; break; }
            }
            ways = Math.min(CAP, ways * cVal);
            if (ways >= CAP) return CAP;
            rem -= cnt[i];
        }
        return ways;
    };

    // প্রথম অর্ধেক অংশ তৈরি
    let left = "";
    for (let pos = 0; pos < m; pos++) {
        const remLen = m - pos, total = getWays(remLen);
        let ok = false;

        for (let c = 0; c < 26; c++) {
            if (cnt[c] === 0) continue;
            
            cnt[c]--;
            const ways = total >= CAP ? getWays(remLen - 1) : Math.floor((total * (cnt[c] + 1)) / remLen);

            if (ways >= k) {
                left += String.fromCharCode(97 + c);
                ok = true;
                break;
            }
            k -= ways;
            cnt[c]++; // Backtrack
        }
        if (!ok) return "";
    }

    return left + mid + left.split("").reverse().join("");
}