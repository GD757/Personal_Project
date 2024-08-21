import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RoomDetail() {
  const { id } = useParams();  // Get the room ID from the URL
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/rooms/${id}/`);
        setRoom(response.data);
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    fetchRoom();
  }, [id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{room.name}</h2>
      <p>Capacity: {room.capacity}</p>
      <p>Features: {room.features}</p>
      <p>Address: {room.address}</p>
      {room.gltf_model && (
        <div>
          <h3>3D Model:</h3>
          <a href={room.gltf_model} target="_blank" rel="noopener noreferrer">
            View 3D Model
          </a>
        </div>
      )}
    </div>
  );
}

export default RoomDetail;
