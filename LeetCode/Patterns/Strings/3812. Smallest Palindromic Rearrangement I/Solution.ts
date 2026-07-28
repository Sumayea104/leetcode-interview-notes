function smallestPalindrome(s: string): string {
    const n = s.length;
    const halfLen = Math.floor(n / 2);
    
    // Extract and sort the first half of the string
    const firstHalf = s.slice(0, halfLen).split('').sort().join('');
    
    // Reverse the sorted first half for the right side
    const secondHalf = firstHalf.split('').reverse().join('');
    
    // If length is odd, include the middle character
    const middle = n % 2 !== 0 ? s[halfLen] : '';
    
    return firstHalf + middle + secondHalf;
}