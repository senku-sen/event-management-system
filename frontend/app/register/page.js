"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [role, setRole] = useState("User")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!")
      return
    }

    if (!firstName || !lastName) {
      setError("First name and last name are required!")
      return
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address!")
      return
    }

    if (!phone || !/^\+?[\d\s-()]+$/.test(phone)) {
      setError("Please enter a valid phone number!")
      return
    }

    if (!address) {
      setError("Address is required!")
      return
    }

    setLoading(true)

    try {
      const response = await axios.post("http://localhost:3000/api/users/register", {
        email,
        password,
        firstName,
        lastName,
        phone,
        role,
        address,
      })

      setSuccess("Account created successfully!")
      
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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

        input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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

        .toggle-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .toggle-icon {
          width: 16px;
          height: 16px;
          fill: #6b7280;
        }

        .toggle-button:hover:not(:disabled) .toggle-icon {
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
      `}</style>

      <div className="card">
        <div className="card-header">
          <div className="icon-container">
            <svg className="icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M2 20h20V6H2v14zm2-2V8h16v10H4zm4-4h8v2H8v-2z"/>
            </svg>
          </div>
          <div>
            <h2 className="title">Create an account</h2>
            <p className="description">Enter your details to get started</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <div className="grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                id="firstName" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                required 
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                id="lastName" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                required 
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              id="phone" 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                <svg className="toggle-icon" viewBox="0 0 24 24">
                  {showPassword ? (
                    <path
                      fill="currentColor"
                      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                    />
                  ) : (
                    <path
                      fill="currentColor"
                      d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.17C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-group">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                <svg className="toggle-icon" viewBox="0 0 24 24">
                  {showConfirmPassword ? (
                    <path
                      fill="currentColor"
                      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                    />
                  ) : (
                    <path
                      fill="currentColor"
                      d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.17C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>

          <p className="link-container">
            Already have an account?{" "}
            <Link href="/login" className="link">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}