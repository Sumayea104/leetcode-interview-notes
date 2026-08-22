function checkDivisibility(n: number): boolean {
    let digitSum = 0;
    let digitProd = 1;
    let temp = n;

    while (temp > 0) {
        const digit = temp % 10;
        digitSum += digit;
        digitProd *= digit;
        temp = Math.floor(temp / 10);
    }

    const totalSum = digitSum + digitProd;
    return n % totalSum === 0;
}