#include <vector>
#include <array>

class Solution {
public:
    std::vector<long long> resultArray(std::vector<int>& nums, int k) {
        std::vector<long long> ans(k, 0);
        long long dp[5] = {0}; 
        
        for (int num : nums) {
            int v = num % k;
            long long next_dp[5] = {0};

            next_dp[v] = 1;

            for (int r = 0; r < k; ++r) {
                if (dp[r] > 0) {
                    next_dp[(r * v) % k] += dp[r];
                }
            }
            for (int r = 0; r < k; ++r) {
                ans[r] += next_dp[r];
                dp[r] = next_dp[r];
            }
        }
        
        return ans;
    }
};