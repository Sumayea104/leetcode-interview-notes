from bisect import bisect_right
from typing import List


class Solution:

  def maximumWeight(self, intervals: List[List[int]]) -> List[int]:
    n = len(intervals)

    events = [
        (intervals[i][0], intervals[i][1], intervals[i][2], i) for i in range(n)
    ]

    events.sort(key=lambda x: x[0])
    starts = [e[0] for e in events]

    dp = [[(0, []) for _ in range(n + 1)] for _ in range(5)]

    def is_better(cand1, cand2):
      w1, idxs1 = cand1
      w2, idxs2 = cand2
      if w1 != w2:
        return w1 > w2

      return idxs1 < idxs2

    for i in range(n - 1, -1, -1):
      l, r, weight, orig_idx = events[i]

      next_idx = bisect_right(starts, r)

      for k in range(1, 5):
        
        best = dp[k][i + 1]

        prev_w, prev_idxs = dp[k - 1][next_idx]
        take_cand = (prev_w + weight, sorted([orig_idx] + prev_idxs))

        if is_better(take_cand, best):
          best = take_cand

        dp[k][i] = best

    return dp[4][0][1]