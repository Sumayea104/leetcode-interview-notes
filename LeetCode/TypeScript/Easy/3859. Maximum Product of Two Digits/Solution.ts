function maxProduct(n: number): number {
    const digits = String(n).split('').map(Number);
    digits.sort((a, b) => b - a);
    return digits[0] * digits[1];
}