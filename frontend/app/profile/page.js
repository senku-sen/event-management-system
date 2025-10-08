"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
//import api from "../../lib/api"; // Adjust path


export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/auth/profile");
        setUser(response.data.user);
      } catch (err) {
        setError("Failed to load profile.");
        // Interceptor will handle 401 redirect
      } finally {
        setLoading(false);
      }
    };

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Set initial user from storage
      } catch (e) {
        console.error("Invalid user data in localStorage:", e);
        localStorage.removeItem("user"); // Clear invalid data
      }
    }
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) return <div className="container">Loading...</div>;

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
          max-width: 400px;
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

        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1f2937;
        }

        .profile-item {
          font-size: 0.875rem;
          color: #374151;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
        }

        .button {
          background: #1858e3ff;
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          width: 100%;
          transition: background 0.2s;
        }

        .button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .button:hover:not(:disabled) {
          background: #1d4ed8;
        }

        .error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 0.75rem;
          border-radius: 6px;
          font-size: 0.875rem;
          text-align: center;
        }
         
        .error-link {
            color: #1d4ed8;
            text-decoration: underline;
        }
        .error-link:hover {
            color: #1a3fb5;
            text-decoration: underline;
        }
            
      `}</style>
      <div className="card">
        <div className="card-header">
          <div className="icon-container">
            <svg className="icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <div>
            <h2 className="title">Profile</h2>
            <p className="description">View your account details</p>
          </div>
        </div>
        {error && <div className="error">{error} <a href="/login">Go to login</a></div>}
        {!error && user && (
          <div className="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <div id="name" className="profile-item">{user.firstName} {user.lastName}</div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div id="email" className="profile-item">{user.email}</div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <div id="phone" className="profile-item">{user.phone || 'Not provided'}</div>
            </div>
            {user.role && (
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <div id="role" className="profile-item">{user.role}</div>
              </div>
            )}
            {user.address && (
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <div id="address" className="profile-item">{user.address}</div>
              </div>
            )}
            <button onClick={handleLogout} className="button">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}