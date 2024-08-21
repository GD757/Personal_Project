import React, {useEffect} from 'react'                                                                                                                                                                                    

// // *Without Matterport API*

// // function ModelDetails() {
// //   return (
// //     <div className="model-details-page">
// //       <h2>Model Details</h2>
// //       <p><strong>Model Name:</strong> Example Model</p>
// //       <p><strong>Description:</strong> This is a sample description of the model.</p>
// //       <p><strong>Created on:</strong> Date</p>
// //       {/* Add more content as needed */}
// //     </div>
// //   );
// // }

// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// function ModelDetails() {
//   const { model_id } = useParams();

//   useEffect(() => {
//     const showcaseElement = document.getElementById('showcase');
//     const iframe = document.createElement('iframe');

//     iframe.src = `https://my.matterport.com/show/?m=${model_id}&play=1`;
//     iframe.width = '100%';
//     iframe.height = '600px';
//     iframe.allow = 'fullscreen';

//     showcaseElement.appendChild(iframe);

//     iframe.onload = () => {
//       const showcase = new window.MP_SDK.connect(iframe, 'aqdk51qxahppmu0w82twzdmhc', '3.0');
//       showcase.then((sdk) => {
//         // Example: Add custom tags and overlays
//         sdk.Mattertag.add([{
//           label: "Event Space Entrance",
//           description: "Welcome to the event space!",
//           anchorPosition: { x: 0, y: 1, z: 2 },
//           mediaSrc: "https://example.com/media.png"
//         }]);

//         // Listen for camera movement and log the position
//         sdk.Camera.pose.subscribe((pose) => {
//           console.log('Camera Position:', pose);
//         });
//       });
//     };

//     return () => {
//       showcaseElement.innerHTML = ''; // Cleanup iframe
//     };
//   }, [model_id]);

//   return (
//     <div className="model-details-page">
//       <h2>Model Details</h2>
//       <div id="showcase"></div>
//     </div>
//   );
// }

// export default ModelDetails;


// src/components/MatterportViewer.js
// import React, { useEffect } from 'react';

const MatterportViewer = () => {
  useEffect(() => {
    // Function to connect to the SDK and handle the showcase connection
    async function connectSdk() {
      const sdkKey = '[YOUR_SDK_KEY_HERE]'; // Replace with your SDK key
      const iframe = document.getElementById('showcase-iframe');

      // Connect the SDK
      try {
        const mpSdk = await window.MP_SDK.connect(
          iframe,
          sdkKey,
          '' // Unused but needs to be a valid string
        );
        onShowcaseConnect(mpSdk);
      } catch (e) {
        console.error(e);
      }
    }

    // Function to handle the showcase connection
    async function onShowcaseConnect(mpSdk) {
      try {
        const modelData = await mpSdk.Model.getData();
        console.log('Model sid:' + modelData.sid);
      } catch (e) {
        console.error(e);
      }
    }

    // Load the SDK and connect
    const script = document.createElement('script');
    script.src = 'https://static.matterport.com/showcase-sdk/latest.js';
    script.onload = connectSdk;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <iframe
      width="853"
      height="480"
      src="https://my.matterport.com/show?m=SxQL3iGyoDo&play=1&applicationKey=[YOUR_SDK_KEY_HERE]"
      frameBorder="0"
      allowFullScreen
      allow="xr-spatial-tracking"
      id="showcase-iframe"
      title="Matterport Showcase"
    ></iframe>
  );
};

export default MatterportViewer;


