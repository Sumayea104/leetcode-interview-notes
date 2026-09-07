function letterCombinations(digits: string): string[] {
    if (!digits.length) return [];
    
    const phoneMap: Record<string, string> = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
    };
    
    const combinations: string[] = [];
    
    function backtrack(index: number, currentPath: string[]): void {
        if (currentPath.length === digits.length) {
            combinations.push(currentPath.join(''));
            return;
        }
        
        const currentDigit = digits[index];
        const letters = phoneMap[currentDigit];
        
        for (let i = 0; i < letters.length; i++) {
            currentPath.push(letters[i]);
            backtrack(index + 1, currentPath);
            currentPath.pop(); // Backtrack
        }
    }
    
    backtrack(0, []);
    return combinations;
}