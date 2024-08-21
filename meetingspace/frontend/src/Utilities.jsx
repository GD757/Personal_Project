import axios from 'axios';

// Create an Axios instance for API requests
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Function to get all events
export const getEvents = async () => {
  try {
    let response = await api.get("events/");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Function to create a new event
export const createEvent = async (newEvent) => {
  try {
    let response = await api.post("events/", newEvent);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// Function to update an existing event
export const updateEvent = async (eventId, updatedEvent) => {
  try {
    let response = await api.put(`events/${eventId}/`, updatedEvent);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// Function to delete an event
export const deleteEvent = async (eventId) => {
  try {
    let response = await api.delete(`events/${eventId}/`);
    if (response.status === 204) {
      return true;
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
  return false;
};

// User registration function
export const signUp = async (email, password) => {
  try {
    let response = await api.post("signup/", { email, password });
    if (response.status === 201) {
      let { user, token } = response.data;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      return user;
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Signup failed. Please try again.");
    return null;
  }
};

// User login function
export const signIn = async (email, password) => {
  try {
    let response = await api.post("login/", { email, password });
    if (response.status === 200) {
      let { user, token } = response.data;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      return user;
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed. Please check your credentials.");
    return null;
  }
};

// User logout function
export const logOut = async () => {
  try {
    let response = await api.post("logout/");
    if (response.status === 204) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      return null;
    }
  } catch (error) {
    console.error("Error during logout:", error);
    alert("Logout failed. Please try again.");
  }
  return null;
};

// Function to confirm the user's authentication status
export const confirmUser = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    try {
      let response = await api.get("user/");
      if (response.status === 200) {
        return response.data.user;
      }
    } catch (error) {
      console.error("Error confirming user:", error);
    }
  }
  return null;
};
