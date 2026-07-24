function uniqueXorTriplets(nums: number[]): number {

    const uniqueNums = Array.from(new Set(nums));

    const seenPairs = new Uint8Array(2048);
    
    for (let i = 0; i < uniqueNums.length; i++) {
        for (let j = i; j < uniqueNums.length; j++) {
            seenPairs[uniqueNums[i] ^ uniqueNums[j]] = 1;
        }
    }

    const seenTriplets = new Uint8Array(2048);
    let uniqueCount = 0;
    
    for (let pairXor = 0; pairXor < 2048; pairXor++) {
        if (!seenPairs[pairXor]) continue;
        
        for (let k = 0; k < uniqueNums.length; k++) {
            const tripletXor = pairXor ^ uniqueNums[k];
            if (!seenTriplets[tripletXor]) {
                seenTriplets[tripletXor] = 1;
                uniqueCount++;
            }
        }
    }
    
    return uniqueCount;
}