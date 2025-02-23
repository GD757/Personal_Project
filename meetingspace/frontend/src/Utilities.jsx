import React, { useState } from 'react';
import axios from 'axios';

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const userRegistration = async (email, password) => {
  let response = await api.post("signup/", { email, password });
  if (response.status === 201) {
    let { token } = response.data;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    return response.data.user;
  }
  alert(response.data);
  return null;
};

export const signUp = async (email, password) => {
  let response = await api.post("signup/", {
    "email": email,
    "password": password,
  });
  if (response.status === 201) {
    let { user, token } = response.data;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    return user;
  }
  alert("credentials failed");
  return null;
};

export const signIn = async (email, password) => {
  let response = await api.post("login/", {
    email: email,
    password: password,
  });
  if (response.status === 200) {
    let { user, token } = response.data;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    return user;
  }
  alert("credentials failed");
  return null;
};

export const logOut = async () => {
  let response = await api.post("logout/")
  if(response.status === 204){
    localStorage.removeItem("token")
    delete api.defaults.headers.common["Authorization"]
    return null
  }
  alert("Something went wrong during log out!")
}

export const getEvents = async () => {
  try {
    let response = await api.get("events/");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    alert("Error fetching events");
    console.error(error);
  }
  return [];
};

export const createEvent = async (eventData) => {
  try {
    let response = await api.post("events/", eventData);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    alert("Error creating event");
    console.error("Error creating event:", error);
    return null;
  }
};

export const editEvent = async (eventId, updatedEventData) => {
  try {
    const response = await api.put(`/events/${eventId}/`, updatedEventData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error editing event:', error);
    return null;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await api.delete(`/events/${eventId}/`);
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting event:', error);
    return false;
  }
};


export const confirmUser = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    let response = await api.get("user/");
    return response.data.user;
  }
  return null;
};

