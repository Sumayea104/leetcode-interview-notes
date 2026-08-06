function smallestNumber(n: number, t: number): number {
    while (true) {
        if (getDigitProduct(n) % t === 0) {
            return n;
        }
        n++;
    }
}

function getDigitProduct(num: number): number {
    if (num === 0) return 0;
    
    let product = 1;
    while (num > 0) {
        product *= num % 10;
        num = Math.floor(num / 10);
    }
    return product;
}