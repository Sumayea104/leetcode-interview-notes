function validSequence(word1: string, word2: string): number[] {
    const n = word1.length;
    const m = word2.length;
    
    // last[j] stores the maximum index in word1 that can match word2[j...m-1] exactly
    const last: number[] = new Array(m).fill(-1);
    
    let j = m - 1;
    for (let i = n - 1; i >= 0; i--) {
        if (j >= 0 && word1[i] === word2[j]) {
            last[j] = i;
            j--;
        }
    }

    const ans: number[] = [];
    let changed = false;
    j = 0; // Index in word2

    for (let i = 0; i < n && j < m; i++) {
        // Option 1: Exact match
        if (word1[i] === word2[j]) {
            ans.push(i);
            j++;
        } 
        // Option 2: Mismatch, check if we can use our 1 change here
        else if (!changed) {
            // Can we complete the rest of word2 strictly after index i?
            const canCompleteRest = (j + 1 === m) || (last[j + 1] > i);
            
            if (canCompleteRest) {
                ans.push(i);
                changed = true;
                j++;
            }
        }
    }

    return ans.length === m ? ans : [];
}