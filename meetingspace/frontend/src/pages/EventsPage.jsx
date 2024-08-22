import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../Utilities';
import RoomPage from './RoomPage';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    description: '',
    room: null,
  });

  useEffect(() => {
    const loadEvents = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);
    };

    loadEvents();
  }, []);

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoomSelect = (room) => {
    setNewEvent({
      ...newEvent,
      room: room.id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newEvent.id) {
      const updatedEvent = await updateEvent(newEvent.id, newEvent);
      if (updatedEvent) {
        setEvents(events.map((event) => (event.id === newEvent.id ? updatedEvent : event)));
      }
    } else {
      const createdEvent = await createEvent(newEvent);
      if (createdEvent) {
        setEvents([...events, createdEvent]);
      }
    }

    setNewEvent({ name: '', date: '', description: '', room: null });
  };

  const handleDelete = async (eventId) => {
    await deleteEvent(eventId);
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleEdit = (eventId) => {
    const eventToEdit = events.find((event) => event.id === eventId);
    setNewEvent(eventToEdit);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-8">Upcoming Events</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-medium mb-6">{newEvent.id ? 'Edit Event' : 'Create New Event'}</h3>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Event Name:</label>
          <input
            type="text"
            name="name"
            value={newEvent.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Date:</label>
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description:</label>
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Selected Room:</label>
          <span className="block text-gray-900">
            {newEvent.room ? `Room ID: ${newEvent.room}` : 'No room selected'}
          </span>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          {newEvent.id ? 'Update Event' : 'Create Event'}
        </button>
      </form>

      <h3 className="text-2xl font-medium text-center mb-6">Select a Room</h3>
      <RoomPage onSelectRoom={handleRoomSelect} />

      <h3 className="text-2xl font-medium text-center mb-6">Event List</h3>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
            <p className="text-gray-700 mb-1"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-1">{event.description}</p>
            <p className="text-gray-700 mb-2"><strong>Room ID:</strong> {event.room}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(event.id)}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
