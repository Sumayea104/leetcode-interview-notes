class SegmentTree {
    n: number;
    k: number;
    tree: { prod: number; count: number[] }[];

    constructor(nums: number[], k: number) {
        this.n = nums.length;
        this.k = k;
        this.tree = new Array(4 * this.n);
        this.build(nums, 0, 0, this.n - 1);
    }

    private merge(left: { prod: number; count: number[] }, right: { prod: number; count: number[] }) {
        const k = this.k;
        const prod = (left.prod * right.prod) % k;
        const count = [...left.count];

        for (let r = 0; r < k; r++) {
            if (right.count[r] > 0) {
                const newMod = (left.prod * r) % k;
                count[newMod] += right.count[r];
            }
        }

        return { prod, count };
    }

    private build(nums: number[], node: number, l: number, r: number): void {
        if (l === r) {
            const val = nums[l] % this.k;
            const count = new Array(this.k).fill(0);
            count[val]++;
            this.tree[node] = { prod: val, count };
            return;
        }

        const mid = Math.floor((l + r) / 2);
        this.build(nums, node * 2 + 1, l, mid);
        this.build(nums, node * 2 + 2, mid + 1, r);
        this.tree[node] = this.merge(this.tree[node * 2 + 1], this.tree[node * 2 + 2]);
    }

    public update(node: number, l: number, r: number, idx: number, val: number): void {
        if (l === r) {
            const modVal = val % this.k;
            const count = new Array(this.k).fill(0);
            count[modVal]++;
            this.tree[node] = { prod: modVal, count };
            return;
        }

        const mid = Math.floor((l + r) / 2);
        if (idx <= mid) {
            this.update(node * 2 + 1, l, mid, idx, val);
        } else {
            this.update(node * 2 + 2, mid + 1, r, idx, val);
        }

        this.tree[node] = this.merge(this.tree[node * 2 + 1], this.tree[node * 2 + 2]);
    }

    public query(node: number, l: number, r: number, ql: number, qr: number): { prod: number; count: number[] } {
        if (ql <= l && r <= qr) {
            return this.tree[node];
        }

        const mid = Math.floor((l + r) / 2);
        if (qr <= mid) {
            return this.query(node * 2 + 1, l, mid, ql, qr);
        }
        if (ql > mid) {
            return this.query(node * 2 + 2, mid + 1, r, ql, qr);
        }

        const leftRes = this.query(node * 2 + 1, l, mid, ql, qr);
        const rightRes = this.query(node * 2 + 2, mid + 1, r, ql, qr);
        return this.merge(leftRes, rightRes);
    }
}

function resultArray(nums: number[], k: number, queries: number[][]): number[] {
    const n = nums.length;
    const segTree = new SegmentTree(nums, k);
    const ans: number[] = [];

    for (const [idx, val, start, targetX] of queries) {
        segTree.update(0, 0, n - 1, idx, val);
        const res = segTree.query(0, 0, n - 1, start, n - 1);
        ans.push(res.count[targetX]);
    }

    return ans;
}