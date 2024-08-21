import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../Utilities';
import RoomPage from './RoomPage';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    description: '',
    room: null, // Initialize room to null
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
      room: room.id, // Set the selected room's ID
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newEvent.id) {
      // Update existing event
      const updatedEvent = await updateEvent(newEvent.id, newEvent);
      if (updatedEvent) {
        setEvents(events.map(event => event.id === newEvent.id ? updatedEvent : event));
      }
    } else {
      // Create new event
      const createdEvent = await createEvent(newEvent);
      if (createdEvent) {
        setEvents([...events, createdEvent]); // Add the newly created event to the state
      }
    }
    
    // Reset the form after submission
    setNewEvent({ name: '', date: '', description: '', room: null });
  };

  const handleDelete = async (eventId) => {
    await deleteEvent(eventId);
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleEdit = (eventId) => {
    const eventToEdit = events.find(event => event.id === eventId);
    setNewEvent(eventToEdit);
  };

  return (
    <div className="events-page">
      <h2>Upcoming Events</h2>

      <form onSubmit={handleSubmit}>
        <h3>{newEvent.id ? 'Edit Event' : 'Create New Event'}</h3>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            name="name"
            value={newEvent.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Selected Room:</label>
          <span>{newEvent.room ? `Room ID: ${newEvent.room}` : 'No room selected'}</span>
        </div>
        <button type="submit">{newEvent.id ? 'Update Event' : 'Create Event'}</button>
      </form>

      <h3>Select a Room</h3>
      <RoomPage onSelectRoom={handleRoomSelect} />

      <h3>Event List</h3>
      <ul className="events-list">
        {events.map((event) => (
          <li key={event.id} className="event-item">
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p>{event.description}</p>
            <p><strong>Room ID:</strong> {event.room}</p>
            <button onClick={() => handleEdit(event.id)}>Edit</button>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
