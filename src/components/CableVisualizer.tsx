import { CablePosition } from '@/utils/cableCalculator';
import { useEffect, useState } from 'react';

interface CableVisualizerProps {
  positions: CablePosition[];
  numHoles: number;
  numCables: number;
}

export default function CableVisualizer({ positions, numHoles, numCables }: CableVisualizerProps) {
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const radius = Math.min(dimensions.width, dimensions.height) * 0.36;
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  useEffect(() => {
    function handleResize() {
      const container = document.getElementById('visualization-container');
      if (container) {
        const width = Math.min(container.offsetWidth - 32, 500);
        setDimensions({ width, height: width });
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visualPositions = positions.map((pos, i) => {
    const angle = (pos.position / numHoles) * Math.PI * 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      isHole: pos.isHole,
      position: pos.position
    };
  });

  const getPatternSegment = (start: number, length: number) => {
    let pattern = '';
    let currentCount = 1;
    let isCable = !positions[start].isHole;

    for (let i = start + 1; i <= start + length; i++) {
      if (i === start + length || positions[i]?.isHole !== positions[i-1].isHole) {
        pattern += `${currentCount} ${isCable 
          ? (currentCount === 1 ? 'CABLE' : 'CABLES') 
          : (currentCount === 1 ? 'HOLE' : 'HOLES')} + `;
        if (i < start + length) {
          currentCount = 1;
          isCable = !isCable;
        }
      } else {
        currentCount++;
      }
    }

    return pattern.slice(0, -3);
  };

  const findRepeatingPattern = () => {
    const totalLength = positions.length;
    
    // Try different segment lengths from 2 up to half the total length
    for (let segmentLength = 2; segmentLength <= totalLength / 2; segmentLength++) {
      if (totalLength % segmentLength === 0) { // Only check if it divides evenly
        let isRepeating = true;
        const firstSegment = positions.slice(0, segmentLength);
        
        // Check if this segment repeats throughout the array
        for (let i = segmentLength; i < totalLength; i += segmentLength) {
          const currentSegment = positions.slice(i, i + segmentLength);
          if (!currentSegment.every((pos, index) => pos.isHole === firstSegment[index].isHole)) {
            isRepeating = false;
            break;
          }
        }

        if (isRepeating) {
          const repetitions = totalLength / segmentLength;
          const basePattern = getPatternSegment(0, segmentLength);
          return {
            base: basePattern,
            repetitions: repetitions
          };
        }
      }
    }

    return null;
  };

    // REPETITION PATTERN 
    // TODO --> I didnt know how to represent situation where there is for example: [8 cables 1 hole 7 cables 1 hole] repeated 3 times and 
    // then 8 cables again so it jjust shows the whole thing, maybe i should do [[8 cables 1 hole 7 cables 1 hole] + 8 cables]
  const getPattern = () => {
    const repeatingPattern = findRepeatingPattern();
    if (repeatingPattern) {
      return (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm sm:text-base" style={{ color: '#27374D' }}>
            Base Pattern: {repeatingPattern.base}
          </p>
          <p className="text-sm sm:text-base" style={{ color: '#27374D' }}>
            Repeated {repeatingPattern.repetitions} times
          </p>
        </div>
      );
    }

    return (
      <p className="text-sm sm:text-base" style={{ color: '#27374D' }}>
        {getPatternSegment(0, positions.length)}
      </p>
    );
  };

  const dotSize = Math.max(Math.min(radius * 0.08, 24), 16);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="rounded-xl shadow-lg p-4 sm:p-8" style={{ backgroundColor: '#9DB2BF' }}>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center" style={{ color: '#27374D' }}>
          Cable Pattern Visualization
        </h2>
        
        {/* Pattern Description */}
        <div className="mb-6 sm:mb-8">
          <div className="p-3 sm:p-4 rounded-lg" style={{ backgroundColor: '#DDE6ED' }}>
            <div className="text-center">
              {getPattern()}
            </div>
          </div>
        </div>

        {/* Circular Visualization */}
        <div 
          id="visualization-container"
          className="border-2 rounded-xl p-4 relative mx-auto overflow-hidden"
          style={{ 
            width: '100%',
            aspectRatio: '1',
            backgroundColor: '#DDE6ED',
            borderColor: '#526D82'
          }}
        >
          {/* Draw the circle */}
          <div 
            className="absolute rounded-full"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              left: `${centerX - radius}px`,
              top: `${centerY - radius}px`,
              border: '2px solid #526D82'
            }}
          />
          
          {/* Draw positions */}
          {visualPositions.map((pos, index) => (
            <div
              key={index}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                pos.isHole 
                  ? 'rounded-full flex items-center justify-center'
                  : 'rounded-full shadow-md'
              }`}
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                ...(pos.isHole 
                  ? { border: '2px solid #526D82' }
                  : { backgroundColor: '#27374D' })
              }}
              title={pos.isHole ? `Hole ${pos.position + 1}` : `Cable ${pos.position + 1}`}
            >
              {pos.isHole && (
                <div 
                  className="rounded-full" 
                  style={{ 
                    width: `${dotSize * 0.3}px`,
                    height: `${dotSize * 0.3}px`,
                    backgroundColor: '#526D82'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 sm:mt-6 flex justify-center gap-4 sm:gap-6 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: '#27374D' }} />
            <span style={{ color: '#27374D' }}>CABLE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center" 
                 style={{ border: '2px solid #526D82' }}>
              <div className="rounded-full" 
                   style={{ 
                     width: '0.3rem',
                     height: '0.3rem',
                     backgroundColor: '#526D82'
                   }} />
            </div>
            <span style={{ color: '#27374D' }}>HOLE</span>
          </div>
        </div>
      </div>
    </div>
  );
} 