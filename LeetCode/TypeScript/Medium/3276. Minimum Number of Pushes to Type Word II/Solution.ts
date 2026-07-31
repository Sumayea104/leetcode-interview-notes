function minimumPushes(word: string): number {

    const freq = new Array(26).fill(0);
    for (let i = 0; i < word.length; i++) {
        freq[word.charCodeAt(i) - 97]++;
    }

    freq.sort((a, b) => b - a);

    let totalPushes = 0;
    for (let i = 0; i < 26; i++) {
        if (freq[i] === 0) break; 
        const pushCost = Math.floor(i / 8) + 1;
        totalPushes += freq[i] * pushCost;
    }

    return totalPushes;
}