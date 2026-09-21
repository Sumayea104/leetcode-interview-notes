class Solution:
    def resultArray(self, nums: List[int], k: int) -> List[int]:
        ans = [0] * k
        dp = [0] * k 
        
        for num in nums:
            v = num % k
            next_dp = [0] * k
            
            next_dp[v] += 1

            for r in range(k):
                if dp[r] > 0:
                    next_dp[(r * v) % k] += dp[r]
            
            for r in range(k):
                ans[r] += next_dp[r]
                
            dp = next_dp
            
        return ans