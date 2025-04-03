//Calculates cable placement int the set and also determines if its an actual cable or a hole
export interface CablePosition {
  position: number;
  isHole: boolean;
}

export function calculateCablePattern(numHoles: number, numCables: number): CablePosition[] {
  const step = numHoles / numCables;
  const cablePositions = new Set<number>();
  
  // Calculate cable positions
  for (let i = 0; i < numCables; i++) {
    const position = Math.floor(i * step) % numHoles;
    cablePositions.add(position);
  }

  // Create the final array with both cables and holes marked
  const allPositions: CablePosition[] = [];
  for (let i = 0; i < numHoles; i++) {
    allPositions.push({
      position: i,
      isHole: !cablePositions.has(i)
    });
  }

  return allPositions;
} 