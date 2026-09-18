class Solution:
    def maxNumOfSubstrings(self, s: str) -> list[str]:

        first = {}
        last = {}
        for i, ch in enumerate(s):
            if ch not in first:
                first[ch] = i
            last[ch] = i

        valid_intervals = []
        for ch in set(s):
            l = first[ch]
            r = last[ch]
            is_valid = True

            i = l
            while i <= r:
                l = min(l, first[s[i]])
                r = max(r, last[s[i]])
                if l < first[ch]:
                    is_valid = False
                    break
                i += 1
            
            if is_valid:
                valid_intervals.append((r, l))  
        valid_intervals.sort()

        ans = []
        last_end = -1
        for r, l in valid_intervals:
            if l > last_end:
                ans.append(s[l : r + 1])
                last_end = r

        return ans