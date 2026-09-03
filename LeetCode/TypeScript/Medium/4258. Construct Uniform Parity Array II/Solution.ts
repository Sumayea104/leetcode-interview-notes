function uniformArray(nums1: number[]): boolean {
    let minOdd = Infinity;

    for (const num of nums1) {
        if (num % 2 !== 0) {
            minOdd = Math.min(minOdd, num);
        }
    }

    if (minOdd === Infinity) {
        return true;
    }

    for (const num of nums1) {
        if (num % 2 === 0 && num < minOdd) {
            return false;
        }
    }
    
    return true;
}