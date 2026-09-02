function numberOfAlternatingGroups(colors: number[]): number {
    const n = colors.length;
    let count = 0;

    for (let i = 0; i < n; i++) {
        const prev = colors[(i - 1 + n) % n];
        const next = colors[(i + 1) % n];

        if (colors[i] !== prev && colors[i] !== next) {
            count++;
        }
    }

    return count;
}

