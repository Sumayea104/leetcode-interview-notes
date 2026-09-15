class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        n = len(s)
        ans = 0
        i = 0

        while i <= n - k:

            found = False
            for length in (k, k + 1):
                if i + length > n:
                    continue

                sub = s[i : i + length]
                if sub == sub[::-1]:
                    ans += 1
                    i += length 
                    found = True
                    break
            
            if not found:
                i += 1

        return ans