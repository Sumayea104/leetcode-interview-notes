function minimumPushes(word: string): number {
    const n = word.length;
    let totalPushes = 0;

    for (let i = 0; i < n; i++) {
        totalPushes += Math.floor(i / 8) + 1;
    }

    return totalPushes;
}