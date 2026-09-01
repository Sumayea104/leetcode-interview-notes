function minMoves(classroom: string[], energy: number): number {
    const m = classroom.length;
    const n = classroom[0].length;
    
    let startR = -1, startC = -1;
    const litterPos: [number, number][] = [];
  
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            const char = classroom[r][c];
            if (char === 'S') {
                startR = r;
                startC = c;
            } else if (char === 'L') {
                litterPos.push([r, c]);
            }
        }
    }
    
    const numLitter = litterPos.length;
    const targetMask = (1 << numLitter) - 1;
    if (targetMask === 0) return 0;
    
    const litterMap: number[][] = Array.from({ length: m }, () => Array(n).fill(-1));
    for (let i = 0; i < numLitter; i++) {
        const [r, c] = litterPos[i];
        litterMap[r][c] = i;
    }
    
    const bestEnergy: number[][][] = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => Array(1 << numLitter).fill(-1))
    );
    
    const queue: [number, number, number, number][] = [];
    queue.push([startR, startC, 0, energy]);
    bestEnergy[startR][startC][0] = energy;
    
    let head = 0; 
    let steps = 0;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    while (head < queue.length) {
        const size = queue.length - head;
        
        for (let i = 0; i < size; i++) {
            const [r, c, mask, curEnergy] = queue[head++];
            
            if (mask === targetMask) return steps;
            if (curEnergy === 0) continue;
            
            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;
                
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || classroom[nr][nc] === 'X') {
                    continue;
                }
                
                let nMask = mask;
                const cellType = classroom[nr][nc];
                
                if (cellType === 'L') {
                    const idx = litterMap[nr][nc];
                    if (idx !== -1) {
                        nMask |= (1 << idx);
                    }
                }
                
                let nextEnergy = curEnergy - 1;
                if (cellType === 'R') {
                    nextEnergy = energy;
                }
                
                if (nextEnergy > bestEnergy[nr][nc][nMask]) {
                    bestEnergy[nr][nc][nMask] = nextEnergy;
                    queue.push([nr, nc, nMask, nextEnergy]);
                }
            }
        }
        steps++;
    }
    
    return -1;
}