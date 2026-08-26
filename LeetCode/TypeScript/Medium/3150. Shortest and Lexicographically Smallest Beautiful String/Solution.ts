function shortestBeautifulSubstring(s: string, k: number): string {
    let n = s.length;
    let countOnes = 0;
    let left = 0;
    let ans = "";

    for (let right = 0; right < n; right++) {
        if (s[right] === '1') {
            countOnes++;
        }

        while (countOnes === k) {
            let currentSub = s.substring(left, right + 1);

            if (ans === "" || currentSub.length < ans.length || 
               (currentSub.length === ans.length && currentSub < ans)) {
                ans = currentSub;
            }

            if (s[left] === '1') {
                countOnes--;
            }
            left++;
        }
    }

    return ans;
}