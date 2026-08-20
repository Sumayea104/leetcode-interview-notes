function frequencySort(nums: number[]): number[] {
    const freqMap = new Map<number, number>();

    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    return nums.sort((a, b) => {
        const freqA = freqMap.get(a)!;
        const freqB = freqMap.get(b)!;

        if (freqA !== freqB) {
            return freqA - freqB; 
        }
        return b - a; 
    });
}