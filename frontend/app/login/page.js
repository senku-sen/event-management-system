"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"

export default function SigninPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address!")
      return
    }

    if (!password) {
      setError("Password is required!")
      return
    }

    setLoading(true)

    try {
      // Simulate API call for now - replace with actual API when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock login - check if user exists in localStorage
      const existingUser = localStorage.getItem("user")
      
      if (existingUser) {
        const userData = JSON.parse(existingUser)
        
        // Simple validation: check if email matches
        if (userData.email === email) {
          setSuccess("Login successful!")
          // Keep user logged in
          localStorage.setItem("user", JSON.stringify(userData))
          
          setTimeout(() => {
            router.push("/groups")
          }, 1500)
        } else {
          setError("Invalid email or password. Please try again.")
        }
      } else {
        setError("No account found. Please register first.")
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.")
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
          color: #5e6678ff;
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

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1d232dff;
        }

        input {
          padding: 0.5rem;
          border: 1px solid #787c83ff;
          border-radius: 6px;
          font-size: 0.875rem;
          width: 100%;
          box-sizing: border-box;
          background-color: #9ca2a8ff;
        }

        input:focus {
          outline: none;
          border-color: #6a8eddff;
          box-shadow: 0 0 0 2px rgba(125, 154, 215, 0.2);
          background-color: #a2c5e6ff;
        }

        .button {
          background: #2563eb;
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
          color: #6b7280;
        }

        .link {
          color: #1c55cfff;
          text-decoration: none;
        }

        .link:hover {
          text-decoration: underline;
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

          .description {
            font-size: 0.8rem;
          }

          .form-group {
            gap: 0.375rem;
          }

          label {
            font-size: 0.8rem;
          }

          input {
            padding: 0.375rem;
            font-size: 0.8rem;
          }

          .button {
            padding: 0.625rem;
            font-size: 0.8rem;
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
            font-size: 0.75rem;
          }

          .form-group {
            gap: 0.25rem;
          }

          label {
            font-size: 0.75rem;
          }

          input {
            padding: 0.3125rem;
            font-size: 0.75rem;
          }

          .button {
            padding: 0.5rem;
            font-size: 0.75rem;
          }
        }
      `}</style>

      <div className="card">
        <div className="card-header">
          <div className="icon-container">
            <svg className="icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M2 20h20V6H2v14zm2-2V8h16v10H4zm4-4h8v2H8v-2z"/>
            </svg>
          </div>
          <div>
            <h2 className="title">Welcome back</h2>
            <p className="description">Sign in to your account</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="link-container">
            Don't have an account?{" "}
            <Link href="/register" className="link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
