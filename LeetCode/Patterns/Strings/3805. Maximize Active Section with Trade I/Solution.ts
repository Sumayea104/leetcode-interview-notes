function maxActiveSectionsAfterTrade(s: string): number {
    const t = "1" + s + "1";

    const runs: [string, number][] = [];

    let i = 0;
    while (i < t.length) {
        let j = i;
        while (j < t.length && t[j] === t[i]) j++;
        runs.push([t[i], j - i]);
        i = j;
    }

    let ones = 0;
    for (const [ch, len] of runs) {
        if (ch === "1") {
            ones += len;
        }
    }

    // Remove augmented boundary 1s
    ones -= 2;

    let gain = 0;

    for (let i = 1; i + 1 < runs.length; i++) {
        if (
            runs[i][0] === "1" &&
            runs[i - 1][0] === "0" &&
            runs[i + 1][0] === "0"
        ) {
            gain = Math.max(
                gain,
                runs[i - 1][1] + runs[i + 1][1]
            );
        }
    }

    return ones + gain;
}