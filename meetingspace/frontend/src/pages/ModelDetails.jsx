// *Without Matterport API*
// import React from 'react';

// function ModelDetails() {
//   return (
//     <div className="model-details-page">
//       <h2>Model Details</h2>
//       <p><strong>Model Name:</strong> Example Model</p>
//       <p><strong>Description:</strong> This is a sample description of the model.</p>
//       <p><strong>Created on:</strong> Date</p>
//       {/* Add more content as needed */}
//     </div>
//   );
// }

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ModelDetails() {
  const { model_id } = useParams();

  useEffect(() => {
    const showcaseElement = document.getElementById('showcase');
    const iframe = document.createElement('iframe');

    iframe.src = `https://my.matterport.com/show/?m=${model_id}&play=1`;
    iframe.width = '100%';
    iframe.height = '600px';
    iframe.allow = 'fullscreen';

    showcaseElement.appendChild(iframe);

    iframe.onload = () => {
      const showcase = new window.MP_SDK.connect(iframe, 'aqdk51qxahppmu0w82twzdmhc', '3.0');
      showcase.then((sdk) => {
        // Example: Add custom tags and overlays
        sdk.Mattertag.add([{
          label: "Event Space Entrance",
          description: "Welcome to the event space!",
          anchorPosition: { x: 0, y: 1, z: 2 },
          mediaSrc: "https://example.com/media.png"
        }]);

        // Listen for camera movement and log the position
        sdk.Camera.pose.subscribe((pose) => {
          console.log('Camera Position:', pose);
        });
      });
    };

    return () => {
      showcaseElement.innerHTML = ''; // Cleanup iframe
    };
  }, [model_id]);

  return (
    <div className="model-details-page">
      <h2>Model Details</h2>
      <div id="showcase"></div>
    </div>
  );
}

export default ModelDetails;
