"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <div style={{
      minHeight: 'calc(100vh - 4rem)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        maxWidth: '800px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          marginBottom: '1rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          lineHeight: '1.2'
        }}>
          Welcome to EventHub
        </h1>

        <p style={{
          fontSize: '1.25rem',
          marginBottom: '2rem',
          opacity: '0.9',
          lineHeight: '1.6'
        }}>
          Your complete event management solution. Create, manage, and join events and groups with ease.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          {user ? (
            <>
              <Link href="/events" style={{
                background: 'white',
                color: '#2563eb',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.15)'
              }}>
                📅 View Events
              </Link>
              <Link href="/groups" style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.2s'
              }}>
                👥 Browse Groups
              </Link>
              {user.role === 'admin' && (
                <Link href="/groups/create" style={{
                  background: '#ef4444',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'transform 0.2s',
                  boxShadow: '0 4px 14px 0 rgba(239,68,68,0.3)'
                }}>
                  ➕ Create Group
                </Link>
              )}
            </>
          ) : (
            <>
              <Link href="/register" style={{
                background: 'white',
                color: '#2563eb',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.15)'
              }}>
                🚀 Get Started
              </Link>
              <Link href="/login" style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.2s'
              }}>
                🔑 Sign In
              </Link>
            </>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Event Management
            </h3>
            <p style={{ opacity: '0.9', lineHeight: '1.5' }}>
              Create and manage events with ease. Track attendance, send invitations, and monitor engagement.
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Group Collaboration
            </h3>
            <p style={{ opacity: '0.9', lineHeight: '1.5' }}>
              Form communities and groups. Connect with like-minded people and organize group activities.
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Analytics & Insights
            </h3>
            <p style={{ opacity: '0.9', lineHeight: '1.5' }}>
              Get detailed analytics on your events and groups. Make data-driven decisions to improve engagement.
            </p>
          </div>
        </div>

        {user && (
          <div style={{
            marginTop: '3rem',
            padding: '1rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <p style={{ margin: 0, fontSize: '1rem' }}>
              👋 Welcome back, <strong>{user.firstName}</strong>!
              {user.role === 'admin' && (
                <span style={{
                  background: '#ef4444',
                  color: 'white',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginLeft: '0.5rem'
                }}>
                  ADMIN
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
