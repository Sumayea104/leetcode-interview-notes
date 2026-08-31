function nodesBetweenCriticalPoints(head: ListNode | null): number[] {
    if (!head || !head.next || !head.next.next) {
        return [-1, -1];
    }

    let firstIndex = -1;
    let prevIndex = -1;
    let minDistance = Infinity;
    
    let prev = head;
    let curr = head.next;
    let index = 1;

    while (curr.next !== null) {
        const next = curr.next;

        const isMaxima = curr.val > prev.val && curr.val > next.val;
        const isMinima = curr.val < prev.val && curr.val < next.val;

        if (isMaxima || isMinima) {
            if (firstIndex === -1) {
                firstIndex = index;
            } else {
                minDistance = Math.min(minDistance, index - prevIndex);
            }
            prevIndex = index;
        }

        prev = curr;
        curr = next;
        index++;
    }

    if (firstIndex === -1 || prevIndex === firstIndex) {
        return [-1, -1];
    }

    const maxDistance = prevIndex - firstIndex;
    return [minDistance, maxDistance];
}