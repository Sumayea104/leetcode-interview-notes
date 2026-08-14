function maximumLengthSubstring(s: string): number {
    const counts = new Map<string, number>();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
       
        counts.set(char, (counts.get(char) || 0) + 1);

        while (counts.get(char)! > 2) {
            const leftChar = s[left];
            counts.set(leftChar, counts.get(leftChar)! - 1);
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}