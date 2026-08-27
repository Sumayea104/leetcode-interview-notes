function lexGreaterPermutation(s: string, target: string): string {
    const n = s.length;
    const count = new Array(26).fill(0);
    
    for (const char of s) {
        count[char.charCodeAt(0) - 97]++;
    }

    for (let i = n - 1; i >= -1; i--) {
        
        const tempCount = [...count];
        let canMatchPrefix = true;
        
        for (let j = 0; j <= i; j++) {
            const idx = target.charCodeAt(j) - 97;
            if (tempCount[idx] > 0) {
                tempCount[idx]--;
            } else {
                canMatchPrefix = false;
                break;
            }
        }
        
        if (!canMatchPrefix) continue;
        
        const nextTargetCharIdx = i + 1 < n ? target.charCodeAt(i + 1) - 97 : -1;
        let bumpCharIdx = -1;
        
        for (let c = nextTargetCharIdx + 1; c < 26; c++) {
            if (tempCount[c] > 0) {
                bumpCharIdx = c;
                break;
            }
        }
        
        if (bumpCharIdx !== -1) {
            
            let result = target.substring(0, i + 1);
            result += String.fromCharCode(97 + bumpCharIdx);
            tempCount[bumpCharIdx]--;
            
            for (let c = 0; c < 26; c++) {
                while (tempCount[c] > 0) {
                    result += String.fromCharCode(97 + c);
                    tempCount[c]--;
                }
            }
            return result;
        }
    }

    return "";
}