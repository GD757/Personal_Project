import React, { useState, useEffect } from 'react';
import { getEvents, api } from '../Utilities';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    description: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("events/", newEvent);
      if (response.status === 201) {
        setEvents([...events, response.data]); // Add the new event to the state
        setNewEvent({ name: '', date: '', description: '' }); // Reset the form
      }
    } catch (error) {
      alert("Error creating event");
      console.error(error);
    }
  };

  return (
    <div className="events-page">
      <h2>Upcoming Events</h2>
      
      <form onSubmit={handleSubmit}>
        <h3>Create New Event</h3>
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
            type="date"  // Ensure the input type is "date"
            name="date"
            value={newEvent.date}  // Corrected to use newEvent.date
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
        <button type="submit">Create Event</button>
      </form>

      <ul className="events-list">
        {events.map((event) => (
          <li key={event.id} className="event-item">
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
