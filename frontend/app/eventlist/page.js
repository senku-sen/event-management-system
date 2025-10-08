"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
//import api from "../../lib/api"; // Adjust path

export default function EventList() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/events");
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const isAdmin = user.role === "admin";
        const filteredEvents = isAdmin ? response.data : response.data.filter(event => event.userId === user.id);
        setEvents(filteredEvents);
      } catch (err) {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/api/events/${eventId}`);
        setEvents(events.filter(event => event.id !== eventId));
      } catch (err) {
        setError("Failed to delete event.");
      }
    }
  };

  const handleEdit = (eventId, userId) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isAdmin = user.role === "admin";
    if (!isAdmin && user.id !== userId) {
      setError("You can only edit your own events.");
      return;
    }
    router.push(`/event/edit/${eventId}`);
  };

    if (loading) return (
    <div className="container">
      <div className="card">
        <div className="description">Loading events...</div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(21, 34, 221, 0.81);
          width: 100%;
          max-width: 600px;
          padding: 1.5rem;
        }

        .card-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: #2563eb;
          border-radius: 8px;
          margin: 0 auto 1rem;
        }

        .icon {
          width: 24px;
          height: 24px;
          fill: white;
        }

        .title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .description {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .event-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .event-item {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: #f9fafb;
        }

        .event-title {
          font-size: 1rem;
          font-weight: 500;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .event-details {
          font-size: 0.875rem;
          color: #374151;
        }

        .button-group {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .edit-btn,
        .delete-btn {
          padding: 0.375rem 0.75rem;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          cursor: pointer;
          width: 50%;
        }

        .edit-btn {
          background: #2563eb;
          color: white;
        }

        .edit-btn:hover {
          background: #1d4ed8;
        }

        .delete-btn {
          background: #ef4444;
          color: white;
        }

        .delete-btn:hover {
          background: #dc2626;
        }

        .error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 0.75rem;
          border-radius: 6px;
          font-size: 0.875rem;
          text-align: center;
        }

        .prompt {
          color: #6b7280;
          font-size: 0.875rem;
          text-align: center;
          padding: 0.75rem;
        }
      `}</style>
      <div className="card">
        <div className="card-header">
          <div className="icon-container">
            <svg className="icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-4h4v-2h-4V7h-2v4H8v2h4z"/>
            </svg>
          </div>
          <div>
            <h2 className="title">Your Events</h2>
            <p className="description">Manage your scheduled events</p>
          </div>
        </div>
        {loading && <div className="description">Loading events...</div>}
        {error && <div className="error">{error}</div>}
        <div className="event-list">
          {events.length === 0 && !loading && !error && (
            <p className="description">No events found.</p>
          )}
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-title">{event.title}</div>
              <div className="event-details">
                {event.dates} | {event.location} | {event.category} | Max: {event.maxAttendees}
              </div>
              <div className="button-group">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(event.id, event.userId)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(event.id, event.userId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}