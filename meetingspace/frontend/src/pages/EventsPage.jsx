import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, editEvent, deleteEvent } from '../Utilities';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedEvent = await editEvent(editingEventId, newEvent);
      if (updatedEvent) {
        setEvents(events.map(event => event.id === editingEventId ? updatedEvent : event));
        setIsEditing(false);
        setEditingEventId(null);
      }
    } else {
      const createdEvent = await createEvent(newEvent);
      if (createdEvent) {
        setEvents([...events, createdEvent]);
      }
    }

    setNewEvent({ name: '', date: '', description: '' });
  };

  const handleEdit = (event) => {
    setNewEvent({
      name: event.name,
      date: event.date,
      description: event.description,
    });
    setIsEditing(true);
    setEditingEventId(event.id);
  };

  const handleDelete = async (eventId) => {
    const success = await deleteEvent(eventId);

    if (success) {
      setEvents(events.filter(event => event.id !== eventId));
    } else {
      alert('Failed to delete event');
    }
  };

  return (
    <div className="events-page">
      <h2>Upcoming Events</h2>
      
      <form onSubmit={handleSubmit}>
        <h3>{isEditing ? 'Edit Event' : 'Create New Event'}</h3>
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
        <button type="submit">{isEditing ? 'Update Event' : 'Create Event'}</button>
        {isEditing && (
          <button type="button" onClick={() => {
            setIsEditing(false);
            setEditingEventId(null);
            setNewEvent({ name: '', date: '', description: '' });
          }}>
            Cancel
          </button>
        )}
      </form>

      <h3>Existing Events</h3>
      <ul className="events-list">
        {events.map((event) => (
          <li key={event.id} className="event-item">
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p>{event.description}</p>
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
