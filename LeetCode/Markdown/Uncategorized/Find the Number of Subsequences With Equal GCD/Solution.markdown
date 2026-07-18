# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->

# Code
```rust []
impl Solution {
    pub fn subsequence_pair_count(nums: Vec<i32>) -> i32 {
        let max_val = *nums.iter().max().unwrap_or(&0) as usize;
        let mut dp = vec![vec![0; max_val + 1]; max_val + 1];
        dp[0][0] = 1; 
        
        let m = 1_000_000_007;

        for &num in &nums {
            let num = num as usize;
            let mut next_dp = vec![vec![0; max_val + 1]; max_val + 1];
            
            for x in 0..=max_val {
                for y in 0..=max_val {
                    if dp[x][y] == 0 {
                        continue;
                    }
                    
                    let ways = dp[x][y];
                    
                    next_dp[x][y] = (next_dp[x][y] + ways) % m;
                    
                    let nx = Self::gcd(x, num);
                    next_dp[nx][y] = (next_dp[nx][y] + ways) % m;
                    
                    let ny = Self::gcd(y, num);
                    next_dp[x][ny] = (next_dp[x][ny] + ways) % m;
                }
            }
            dp = next_dp;
        }
        
        let mut ans = 0;
        
        for g in 1..=max_val {
            ans = (ans + dp[g][g]) % m;
        }
        
        ans
    }
    
    fn gcd(mut a: usize, mut b: usize) -> usize {
        while b != 0 {
            let temp = b;
            b = a % b;
            a = temp;
        }
        a
    }
}
```