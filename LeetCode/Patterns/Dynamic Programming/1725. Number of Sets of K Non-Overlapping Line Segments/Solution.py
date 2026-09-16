import math

MOD = 10**9 + 7
comb = math.comb

class Solution:
    def numberOfSets(self, n: int, k: int) -> int:
        return comb(n + k - 1, 2 * k) % MOD