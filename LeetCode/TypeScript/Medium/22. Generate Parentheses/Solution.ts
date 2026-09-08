function generateParenthesis(n: number): string[] {
    const result: string[] = [];

    function backtrack(currentStr: string, openCount: number, closeCount: number): void {

        if (currentStr.length === 2 * n) {
            result.push(currentStr);
            return;
        }

        if (openCount < n) {
            backtrack(currentStr + '(', openCount + 1, closeCount);
        }

        if (closeCount < openCount) {
            backtrack(currentStr + ')', openCount, closeCount + 1);
        }
    }

    backtrack("", 0, 0);
    return result;
}