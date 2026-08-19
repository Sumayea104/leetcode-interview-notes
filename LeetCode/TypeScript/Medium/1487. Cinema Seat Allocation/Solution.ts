function maxNumberOfFamilies(n: number, reservedSeats: number[][]): number {

    const rowMasks = new Map<number, number>();

    for (const [row, seat] of reservedSeats) {
        if (seat >= 2 && seat <= 9) {
            const currentMask = rowMasks.get(row) || 0;

            rowMasks.set(row, currentMask | (1 << (seat - 2)));
        }
    }

    let maxGroups = (n - rowMasks.size) * 2;

    const LEFT = 0b00001111;   
    const RIGHT = 0b11110000;  
    const MIDDLE = 0b00111100; 

    for (const mask of rowMasks.values()) {
        let count = 0;

        const leftFree = (mask & LEFT) === 0;
        const rightFree = (mask & RIGHT) === 0;

        if (leftFree) count++;
        if (rightFree) count++;

        if (!leftFree && !rightFree && (mask & MIDDLE) === 0) {
            count++;
        }

        maxGroups += count;
    }

    return maxGroups;
}