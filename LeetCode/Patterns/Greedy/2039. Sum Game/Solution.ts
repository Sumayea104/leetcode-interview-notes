function sumGame(num: string): boolean {
    const n = num.length;
    let leftSum = 0, rightSum = 0;
    let leftQ = 0, rightQ = 0;

    for (let i = 0; i < n / 2; i++) {
        if (num[i] === '?') leftQ++;
        else leftSum += Number(num[i]);
    }

    for (let i = n / 2; i < n; i++) {
        if (num[i] === '?') rightQ++;
        else rightSum += Number(num[i]);
    }

    if ((leftQ + rightQ) % 2 !== 0) return true;

    return (leftSum - rightSum) !== (rightQ - leftQ) / 2 * 9;
}