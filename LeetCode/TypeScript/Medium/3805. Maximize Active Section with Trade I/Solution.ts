function maxActiveSectionsAfterTrade(s: string): number {
    let initialOnes = 0;
    let prevZeroLen = 0;
    let currZeroLen = 0;
    let maxDelta = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '1') {
            initialOnes++;
            if (currZeroLen > 0) {
                if (prevZeroLen > 0) {
                    maxDelta = Math.max(maxDelta, prevZeroLen + currZeroLen);
                }
                prevZeroLen = currZeroLen;
                currZeroLen = 0;
            }
        } else {
            currZeroLen++;
        }
    }

    if (currZeroLen > 0 && prevZeroLen > 0) {
        maxDelta = Math.max(maxDelta, prevZeroLen + currZeroLen);
    }

    return initialOnes + maxDelta;
}