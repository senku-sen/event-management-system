"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Listen for storage changes (login/logout)
    const handleStorageChange = () => {
      const userData = localStorage.getItem("user")
      setUser(userData ? JSON.parse(userData) : null)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  const isActive = (path) => {
    return pathname === path
  }

  const userLinks = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/events", label: "Events", icon: "📅" },
    { href: "/groups", label: "Groups", icon: "👥" },
  ]

  const adminLinks = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/events", label: "Events", icon: "📅" },
    { href: "/groups", label: "Groups", icon: "👥" },
    { href: "/groups/create", label: "Create Group", icon: "➕" },
    { href: "/admin/groups", label: "Group Management", icon: "⚙️" },
    { href: "/admin/users", label: "User Management", icon: "👤" },
  ]

  const navigationLinks = user?.role === 'admin' ? adminLinks : userLinks

  return (
    <nav className="navbar">
      <style jsx>{`
        .navbar {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4rem;
        }

        .nav-brand {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-brand:hover {
          color: #2563eb;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          color: #6b7280;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link:hover {
          color: #1f2937;
          background: #f3f4f6;
        }

        .nav-link.active {
          color: #2563eb;
          background: #eff6ff;
        }

        .nav-auth {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .admin-badge {
          background: #ef4444;
          color: white;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.625rem;
          font-weight: 600;
        }

        .logout-btn {
          background: #6b7280;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .logout-btn:hover {
          background: #4b5563;
        }

        .login-btn {
          background: #2563eb;
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: background 0.2s;
        }

        .login-btn:hover {
          background: #1d4ed8;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0.5rem;
        }

        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .mobile-menu.open {
          display: block;
        }

        .mobile-menu-item {
          display: block;
          padding: 1rem;
          color: #6b7280;
          text-decoration: none;
          border-bottom: 1px solid #f3f4f6;
          transition: background 0.2s;
        }

        .mobile-menu-item:hover {
          background: #f9fafb;
          color: #1f2937;
        }

        .mobile-menu-item.active {
          color: #2563eb;
          background: #eff6ff;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-container {
            padding: 0 0.75rem;
          }

          .nav-brand {
            font-size: 1.25rem;
          }

          .nav-menu {
            display: none;
          }

          .menu-toggle {
            display: block;
          }

          .nav-auth {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0 0.5rem;
            height: 3.5rem;
          }

          .nav-brand {
            font-size: 1.125rem;
          }

          .mobile-menu-item {
            padding: 0.75rem;
            font-size: 0.875rem;
          }
        }
      `}</style>

      <div className="nav-container">
        <Link href="/" className="nav-brand">
          📅 EventHub
        </Link>

        <div className="nav-menu">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-auth">
          {user ? (
            <>
              <div className="user-info">
                <span>👋 Welcome, {user.firstName}</span>
                {user.role === 'admin' && <span className="admin-badge">ADMIN</span>}
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="login-btn">
              Sign In
            </Link>
          )}
        </div>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`mobile-menu-item ${isActive(link.href) ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span>{link.icon}</span> {link.label}
          </Link>
        ))}

        {user ? (
          <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <div className="user-info" style={{ marginBottom: '1rem' }}>
              <span>👋 Welcome, {user.firstName}</span>
              {user.role === 'admin' && <span className="admin-badge">ADMIN</span>}
            </div>
            <button onClick={handleLogout} className="logout-btn" style={{ width: '100%' }}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <Link href="/login" className="login-btn" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
