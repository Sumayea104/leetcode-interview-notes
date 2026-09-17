class Solution:
    def minSumOfLengths(self, arr: list[int], target: int) -> int:
        n = len(arr)
        INF = float('inf')
        min_len = [INF] * n
        
        left = 0
        current_sum = 0
        ans = INF
        best_so_far = INF
        
        for right in range(n):
            current_sum += arr[right]

            while current_sum > target:
                current_sum -= arr[left]
                left += 1

            if current_sum == target:
                cur_len = right - left + 1

                if left > 0 and min_len[left - 1] != INF:
                    ans = min(ans, cur_len + min_len[left - 1])
                
                best_so_far = min(best_so_far, cur_len)
            
            min_len[right] = best_so_far
            
        return ans if ans != INF else -1 
    