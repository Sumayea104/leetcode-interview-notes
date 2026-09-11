from typing import List


class Solution:

  def totalNumbers(self, digits: List[int]) -> int:
    counts = [0] * 10
    for d in digits:
      counts[d] += 1

    total = 0
    for num in range(100, 1000, 2):
      d1 = num // 100
      d2 = (num // 10) % 10
      d3 = num % 10

      counts[d1] -= 1
      counts[d2] -= 1
      counts[d3] -= 1

      if counts[d1] >= 0 and counts[d2] >= 0 and counts[d3] >= 0:
        total += 1
      counts[d1] += 1
      counts[d2] += 1
      counts[d3] += 1

    return total