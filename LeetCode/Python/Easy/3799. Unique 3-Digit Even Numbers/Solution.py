from collections import Counter
from typing import List

class Solution:

  def totalNumbers(self, digits: List[int]) -> int:
    counts = Counter(digits)
    total = 0

    for num in range(100, 1000, 2):
      d1, d2, d3 = num // 100, (num // 10) % 10, num % 10
      num_counts = Counter([d1, d2, d3])

      if all(counts[d] >= num_counts[d] for d in num_counts):
        total += 1

    return total