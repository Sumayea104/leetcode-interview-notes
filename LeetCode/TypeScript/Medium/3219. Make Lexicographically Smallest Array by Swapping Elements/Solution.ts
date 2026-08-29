function lexicographicallySmallestArray(nums: number[], limit: number): number[] {
    const n = nums.length;
    
    const paired: [number, number][] = nums.map((val, idx) => [val, idx]);
    paired.sort((a, b) => a[0] - b[0]);

    const result: number[] = new Array(n);
    
    let i = 0;
    while (i < n) {
        let j = i;
        
        while (j + 1 < n && paired[j + 1][0] - paired[j][0] <= limit) {
            j++;
        }
    
        const indices: number[] = [];
        for (let k = i; k <= j; k++) {
            indices.push(paired[k][1]);
        }
 
        indices.sort((a, b) => a - b);
      
        for (let k = i; k <= j; k++) {
            result[indices[k - i]] = paired[k][0];
        }
        
        i = j + 1;
    }
    
    return result;
}