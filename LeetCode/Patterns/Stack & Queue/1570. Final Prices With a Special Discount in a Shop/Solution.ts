function finalPrices(prices: number[]): number[] {
    const result = [...prices];
    const stack: number[] = [];

    for (let i = 0; i < prices.length; i++) {
        while (stack.length > 0 && prices[i] <= prices[stack[stack.length - 1]]) {
            const prevIndex = stack.pop()!;
            result[prevIndex] -= prices[i];
        }
        stack.push(i);
    }

    return result;
}