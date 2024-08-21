import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RoomPage({ onSelectRoom }) {
  const [rooms, setRooms] = useState([]);
  const [userRooms, setUserRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rooms/');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    // Load user's room list from local storage
    const loadUserRooms = () => {
      const savedUserRooms = JSON.parse(localStorage.getItem('userRooms')) || [];
      setUserRooms(savedUserRooms);
    };

    fetchRooms();
    loadUserRooms();
  }, []);

  const handleAddRoom = (room) => {
    if (userRooms.some(userRoom => userRoom.id === room.id)) {
      alert("This room is already in your list.");
      return;
    }
    const updatedUserRooms = [...userRooms, room];
    setUserRooms(updatedUserRooms);
    localStorage.setItem('userRooms', JSON.stringify(updatedUserRooms));
  };

  const handleRemoveRoom = (roomId) => {
    const updatedUserRooms = userRooms.filter(room => room.id !== roomId);
    setUserRooms(updatedUserRooms);
    localStorage.setItem('userRooms', JSON.stringify(updatedUserRooms));
  };

  const handleEditRoom = async (room) => {
    const updatedName = prompt("Enter new name for the room:", room.name);
    if (updatedName) {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/rooms/${room.id}/`, {
          ...room,
          name: updatedName
        });
        setRooms(rooms.map(r => r.id === room.id ? response.data : r));
      } catch (error) {
        console.error('Error updating room:', error);
      }
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/rooms/${roomId}/`);
        setRooms(rooms.filter(room => room.id !== roomId));
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
  };

  return (
    <div>
      <h2>Select a Room</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <span>{room.name} - {room.address}</span>
            <button onClick={() => handleAddRoom(room)}>Add to My Rooms</button>
            <button onClick={() => onSelectRoom(room)}>Select Room</button>
            <button onClick={() => handleEditRoom(room)}>Edit</button>
            <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>My Room List</h2>
      <ul>
        {userRooms.map((room) => (
          <li key={room.id}>
            <span>{room.name} - {room.address}</span>
            <button onClick={() => handleRemoveRoom(room.id)}>Remove from My Rooms</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomPage;
