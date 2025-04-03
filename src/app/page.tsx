'use client';

import { useState, useEffect } from 'react';
import { calculateCablePattern } from '@/utils/cableCalculator';
import CableVisualizer from '@/components/CableVisualizer';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
  const [numHoles, setNumHoles] = useState(12);
  const [numCables, setNumCables] = useState(4);
  const [positions, setPositions] = useState<Array<{ position: number; isHole: boolean }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [showRickroll, setShowRickroll] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showBurnAlert, setShowBurnAlert] = useState(false);
  const [holeInput, setHoleInput] = useState('12');
  const [cableInput, setCableInput] = useState('4');

  useEffect(() => {
    try {
      const calculatedPositions = calculateCablePattern(numHoles, numCables);
      setPositions(calculatedPositions);
      setError(null);
      setShowRickroll(false);
      setShowEasterEgg(false);
      setShowBurnAlert(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPositions([]);
    }
  }, [numHoles, numCables]);

  const handleInputChange = (value: string, setInput: (value: string) => void, setNumber: (value: number) => void) => {
    // Always update the input value first, no matter what
    setInput(value);
    
    // If the input is empty, reset everything
    if (value === '') {
      setNumber(0);
      setShowEasterEgg(false);
      setShowRickroll(false);
      setShowBurnAlert(false);
      return;
    }
    
    // Check for rickroll easter egg
    if (value.trim().toLowerCase() === 'random') {
      setShowRickroll(true);
      setShowEasterEgg(false);
      setShowBurnAlert(false);
      return;
    }
    
    // Check for non-numeric input
    if (/[a-zA-Z]/.test(value)) {
      setShowEasterEgg(true);
      setShowRickroll(false);
      setShowBurnAlert(false);
      return;
    }
    
    // Check if the input would exceed 9999
    if (value.length > 4) {
      setShowBurnAlert(true);
      return;
    }
    
    // Handle numeric input
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      if (numValue <= 9999) {
        setNumber(numValue);
        setShowEasterEgg(false);
        setShowRickroll(false);
        setShowBurnAlert(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#DDE6ED' }}>
      <div className="flex-grow pb-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 relative">
              <Image
                src="/favicon.ico"
                alt="Cable Companion Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="rounded-xl shadow-lg p-6 mb-8" style={{ background: '#9DB2BF' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="numHoles" className="block text-lg font-medium mb-2" style={{ color: '#27374D' }}>
                  Number of Holes
                </label>
                <input
                  type="text"
                  id="numHoles"
                  maxLength={/^\d+$/.test(holeInput) ? 4 : undefined}
                  value={holeInput}
                  onChange={(e) => handleInputChange(e.target.value, setHoleInput, setNumHoles)}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 text-lg"
                  style={{ 
                    backgroundColor: '#DDE6ED',
                    borderColor: '#526D82',
                    color: '#27374D'
                  }}
                />
                <p className="text-sm mt-1" style={{ color: '#526D82' }}>Maximum: 9999</p>
              </div>
              <div>
                <label htmlFor="numCables" className="block text-lg font-medium mb-2" style={{ color: '#27374D' }}>
                  Number of Cables
                </label>
                <input
                  type="text"
                  id="numCables"
                  maxLength={/^\d+$/.test(cableInput) ? 4 : undefined}
                  value={cableInput}
                  onChange={(e) => handleInputChange(e.target.value, setCableInput, setNumCables)}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 text-lg"
                  style={{ 
                    backgroundColor: '#DDE6ED',
                    borderColor: '#526D82',
                    color: '#27374D'
                  }}
                />
                <p className="text-sm mt-1" style={{ color: '#526D82' }}>Maximum: 9999</p>
              </div>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            {showBurnAlert && (
              <div className="mt-4 p-4 bg-red-500 text-white rounded-lg flex items-center justify-center animate-pulse">
                <span className="text-2xl font-bold">YOUR DEVICE COULD BURN STOP 🔥🔥🔥</span>
              </div>
            )}
          </div>

          {showRickroll ? (
            <div className="w-full max-w-2xl mx-auto aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Never Gonna Give You Up"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl shadow-lg"
              />
            </div>
          ) : showEasterEgg ? (
            <div className="w-full max-w-2xl mx-auto p-8 text-center rounded-xl shadow-lg" style={{ background: '#9DB2BF' }}>
              <p className="text-xl font-semibold" style={{ color: '#27374D' }}>
                Oh No, better not type random in the amount
              </p>
            </div>
          ) : positions.length > 0 ? (
            <div className="flex justify-center items-center w-full">
              <CableVisualizer
                positions={positions}
                numHoles={numHoles}
                className="border border-blue-500"
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
}
