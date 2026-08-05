function remainingMethods(n: number, k: number, invocations: number[][]): number[] {

    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of invocations) {
        adj[a].push(b);
    }

    const isSuspicious: boolean[] = new Array(n).fill(false);
    const queue: number[] = [k];
    isSuspicious[k] = true;

    while (queue.length > 0) {
        const curr = queue.shift()!;
        for (const neighbor of adj[curr]) {
            if (!isSuspicious[neighbor]) {
                isSuspicious[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }

    for (const [a, b] of invocations) {
        if (!isSuspicious[a] && isSuspicious[b]) {

            return Array.from({ length: n }, (_, i) => i);
        }
    }

    const result: number[] = [];
    for (let i = 0; i < n; i++) {
        if (!isSuspicious[i]) {
            result.push(i);
        }
    }

    return result;
}