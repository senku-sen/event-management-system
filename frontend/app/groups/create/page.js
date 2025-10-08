"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { getAuthHeaders } from "../../lib/auth"

export default function CreateGroupPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [visibility, setVisibility] = useState("public")
  const [maxEvents, setMaxEvents] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check user role on component mount
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Redirect non-admins
      if (parsedUser.role !== 'admin') {
        setError("Access denied. Only administrators can create groups.")
        setTimeout(() => {
          router.push("/groups")
        }, 2000)
      }
    } else {
      setError("Please log in to access this page.")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!name || name.trim().length < 3) {
      setError("Group name must be at least 3 characters long!")
      return
    }

    if (!description || description.trim().length < 10) {
      setError("Description must be at least 10 characters long!")
      return
    }

    if (!maxEvents || maxEvents < 1) {
      setError("Maximum events must be at least 1!")
      return
    }

    setLoading(true)

    try {
      if (!user) {
        setError("Authentication required")
        return
      }

      const headers = getAuthHeaders(user)
      const response = await axios.post("/api/groups", {
        name: name.trim(),
        description: description.trim(),
        visibility,
        maxEvents: parseInt(maxEvents),
      }, { headers })

      setSuccess("Group created successfully!")

      // Reset form
      setName("")
      setDescription("")
      setVisibility("public")
      setMaxEvents("")

      setTimeout(() => {
        router.push("/groups")
      }, 1500)
    } catch (err) {
      console.error('Error creating group:', err)
      setError(err.response?.data?.error || "Failed to create group. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          min-height: calc(100vh - 4rem);
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

        .error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 0.75rem;
          border-radius: 6px;
          font-size: 0.875rem;
          text-align: center;
        }

        .success {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          padding: 0.75rem;
          border-radius: 6px;
          font-size: 0.875rem;
          text-align: center;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group {
          position: relative;
        }

        label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1f2937;
        }

        input,
        textarea,
        select {
          padding: 0.5rem;
          border: 1px solid #787c83ff;
          border-radius: 6px;
          font-size: 0.875rem;
          width: 100%;
          box-sizing: border-box;
          background-color: #9ca2a8ff;
          font-family: Arial, Helvetica, sans-serif;
        }

        textarea {
          min-height: 80px;
          resize: vertical;
        }

        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
          border-color: #6a8eddff;
          box-shadow: 0 0 0 2px rgba(125, 154, 215, 0.2);
          background-color: #a2c5e6ff;
        }

        .toggle-button {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toggle-icon {
          width: 16px;
          height: 16px;
          fill: #6b7280;
        }

        .toggle-button:hover .toggle-icon {
          fill: #425a8eff;
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

        .link-container {
          text-align: center;
          font-size: 0.875rem;
          color: #50596aff;
        }

        .link {
          color: #2d68e7ff;
          text-decoration: none;
        }

        .link:hover {
          text-decoration: underline;
          color: #1d4ed8;
        }

        .admin-badge {
          display: inline-block;
          background: #ef4444;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-left: 0.5rem;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid #ffffff40;
          border-top: 2px solid #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          display: inline-block;
          margin-right: 0.5rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 1rem 0.5rem;
          }

          .card {
            max-width: 100%;
            padding: 1rem;
          }

          .title {
            font-size: 1.25rem;
          }

          .grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .form-group {
            gap: 0.375rem;
          }

          .button {
            padding: 0.625rem;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0.5rem;
          }

          .card {
            padding: 0.75rem;
          }

          .title {
            font-size: 1.125rem;
          }

          .description {
            font-size: 0.8rem;
          }

          .form-group {
            gap: 0.25rem;
          }

          label {
            font-size: 0.8rem;
          }

          input,
          textarea,
          select {
            padding: 0.375rem;
            font-size: 0.8rem;
          }

          .button {
            padding: 0.5rem;
            font-size: 0.8rem;
          }
        }
      `}</style>

      <div className="card">
        <div className="card-header">
          <div className="icon-container">
            <svg className="icon" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
              />
            </svg>
          </div>
          <div>
            <h2 className="title">
              Create New Group
              <span className="admin-badge">ADMIN</span>
            </h2>
            <p className="description">Set up a new group for event management</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <div className="form-group">
            <label htmlFor="name">Group Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter group name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the purpose of this group"
              required
            />
          </div>

          <div className="grid">
            <div className="form-group">
              <label htmlFor="visibility">Visibility</label>
              <select
                id="visibility"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                required
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="maxEvents">Max Events</label>
              <input
                id="maxEvents"
                type="number"
                min="1"
                value={maxEvents}
                onChange={(e) => setMaxEvents(e.target.value)}
                placeholder="Max events"
                required
              />
            </div>
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner"></div>
                Creating Group...
              </>
            ) : (
              "Create Group"
            )}
          </button>

          <p className="link-container">
            <Link href="/groups" className="link">
              ← Back to Groups
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
