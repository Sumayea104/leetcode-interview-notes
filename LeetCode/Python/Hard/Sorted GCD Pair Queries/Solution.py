class Solution:
    def gcdValues(self, nums, queries):


class Solution:
    def gcdValues(self, nums: List[int], queries: List[int]) -> List[int]:
        max_val = max(nums)

        # Step 1: Count frequency of each value
        freq = [0] * (max_val + 1)
        for num in nums:
            freq[num] += 1

        # Step 2: Count how many numbers are divisible by each divisor
        divisible = [0] * (max_val + 1)
        for g in range(1, max_val + 1):
            for multiple in range(g, max_val + 1, g):
                divisible[g] += freq[multiple]

        # Step 3: Compute exact GCD pair frequencies
        exact = [0] * (max_val + 1)

        for g in range(max_val, 0, -1):
            cnt = divisible[g]
            pairs = cnt * (cnt - 1) // 2

            for multiple in range(g * 2, max_val + 1, g):
                pairs -= exact[multiple]

            exact[g] = pairs

        # Step 4: Build prefix sums
        values = []
        prefix = []

        total = 0
        for g in range(1, max_val + 1):
            if exact[g] > 0:
                total += exact[g]
                values.append(g)
                prefix.append(total)

        # Step 5: Binary search (upper bound)
        def upper_bound(target):
            left, right = 0, len(prefix) - 1

            while left < right:
                mid = (left + right) // 2

                if prefix[mid] > target:
                    right = mid
                else:
                    left = mid + 1

            return left

        return [values[upper_bound(q)] for q in queries]