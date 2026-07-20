function shiftGrid(grid: number[][], k: number): number[][] {
    const m = grid.length;
    const n = grid[0].length;
    const totalCells = m * n;
  
    k = k % totalCells;

    const result: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            const newFlatIndex = (i * n + j + k) % totalCells;

            const newRow = Math.floor(newFlatIndex / n);
            const newCol = newFlatIndex % n;
            
            result[newRow][newCol] = grid[i][j];
        }
    }
    
    return result;
}