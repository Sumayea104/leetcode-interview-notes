function longestRepeating(
    s: string,
    queryCharacters: string,
    queryIndices: number[]
): number[] {
    const n = s.length;

    const pre: number[] = new Array(4 * n).fill(0);
    const suf: number[] = new Array(4 * n).fill(0);
    const maxLen: number[] = new Array(4 * n).fill(0);
    const leftChar: string[] = new Array(4 * n).fill("");
    const rightChar: string[] = new Array(4 * n).fill("");

    const pushUp = (u: number, l: number, r: number): void => {
        const mid = (l + r) >> 1;
        const leftLen = mid - l + 1;
        const rightLen = r - mid;
        const left = u << 1;
        const right = (u << 1) | 1;

        leftChar[u] = leftChar[left];
        rightChar[u] = rightChar[right];

        pre[u] = pre[left];
        if (pre[left] === leftLen && rightChar[left] === leftChar[right]) {
            pre[u] = pre[left] + pre[right];
        }

        suf[u] = suf[right];
        if (suf[right] === rightLen && rightChar[left] === leftChar[right]) {
            suf[u] = suf[right] + suf[left];
        }

        // Maximum contiguous length calculation
        maxLen[u] = Math.max(maxLen[left], maxLen[right]);
        if (rightChar[left] === leftChar[right]) {
            maxLen[u] = Math.max(maxLen[u], suf[left] + pre[right]);
        }
    };

    const build = (u: number, l: number, r: number): void => {
        if (l === r) {
            pre[u] = 1;
            suf[u] = 1;
            maxLen[u] = 1;
            leftChar[u] = s[l];
            rightChar[u] = s[l];
            return;
        }
        const mid = (l + r) >> 1;
        build(u << 1, l, mid);
        build((u << 1) | 1, mid + 1, r);
        pushUp(u, l, r);
    };

    const update = (u: number, l: number, r: number, idx: number, ch: string): void => {
        if (l === r) {
            leftChar[u] = ch;
            rightChar[u] = ch;
            return;
        }
        const mid = (l + r) >> 1;
        if (idx <= mid) {
            update(u << 1, l, mid, idx, ch);
        } else {
            update((u << 1) | 1, mid + 1, r, idx, ch);
        }
        pushUp(u, l, r);
    };

    build(1, 0, n - 1);

    const ans: number[] = [];
    const k = queryIndices.length;

    for (let i = 0; i < k; i++) {
        update(1, 0, n - 1, queryIndices[i], queryCharacters[i]);
        ans.push(maxLen[1]); 
    }

    return ans;
}