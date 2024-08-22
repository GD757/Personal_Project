import React, { useEffect, useRef } from 'react';
import setupSdk from '@matterport/sdk';

const MatterportViewer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const initializeSdk = async () => {
      try {
        const sdk = await setupSdk('aqdk51qxahppmu0w82twzdmhc', {
          container: containerRef.current,
        });

        // Wait until the app is in the PLAYING phase
        await sdk.App.state.waitUntil(state => state.phase === sdk.App.Phase.PLAYING);

        // Rotate the camera by 35 degrees on the x-axis
        sdk.Camera.rotate(35, 0);

      } catch (err) {
        console.error('Error:', err);
      }
    };

    initializeSdk();
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed', // Ensure the div stays fixed in place
        top: 0,            // Start at the top of the viewport
        left: 0,           // Start at the left of the viewport
        width: '100vw',    // Full width of the viewport
        height: '100vh',   // Full height of the viewport
        margin: 0,         // No margin to prevent shifting
        padding: 0,        // No padding to prevent extra space
        backgroundColor: 'black', // Background color in case the Matterport model doesn't fill the space
      }}
    >
      {/* The Matterport SDK will render the 3D model inside this div */}
    </div>
  );
};

export default MatterportViewer;
