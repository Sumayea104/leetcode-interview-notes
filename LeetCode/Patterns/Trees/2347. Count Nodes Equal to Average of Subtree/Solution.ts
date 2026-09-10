function averageOfSubtree(root: TreeNode | null): number {
    let matchingNodesCount = 0;

    function dfs(node: TreeNode | null): [number, number] {
        if (!node) {
            return [0, 0];
        }

        const [leftSum, leftCount] = dfs(node.left);
        const [rightSum, rightCount] = dfs(node.right);

        const currentSum = node.val + leftSum + rightSum;
        const currentCount = 1 + leftCount + rightCount;

        if (Math.floor(currentSum / currentCount) === node.val) {
            matchingNodesCount++;
        }

        return [currentSum, currentCount];
    }

    dfs(root);
    return matchingNodesCount;
}