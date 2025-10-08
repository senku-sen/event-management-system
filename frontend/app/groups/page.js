"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"

export default function GroupsPage() {
  const router = useRouter()

  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [user, setUser] = useState(null)
  const [expandedGroups, setExpandedGroups] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [visibilityFilter, setVisibilityFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [eventSearchTerms, setEventSearchTerms] = useState({})


  useEffect(() => {
    // Get user from localStorage to check if admin
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    // Load groups from localStorage or start with empty array
    loadGroups()
  }, [])

  const loadGroups = () => {
    setLoading(true)
    // Get groups from localStorage
    const savedGroups = localStorage.getItem("groups")
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups))
    } else {
      setGroups([])
    }
    setLoading(false)
  }

  const toggleGroupExpansion = (groupId) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId)
    } else {
      newExpanded.add(groupId)
    }
    setExpandedGroups(newExpanded)
  }

  const filteredAndSortedGroups = () => {
    let filtered = groups.filter(group => {
      // Role-based filtering: Admins see all groups, users see only public groups
      const roleFilter = user?.role === 'admin' || group.visibility === 'public'
      
      // Search filter: search in name, description, and event titles
      const searchFilter = searchTerm === "" || 
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.events?.some(event => 
          event.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      
      // Visibility filter
      const visibilityFilterMatch = visibilityFilter === "all" || 
        group.visibility === visibilityFilter
      
      return roleFilter && searchFilter && visibilityFilterMatch
    })

    // Sort groups
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "events":
          return (b.eventCount || 0) - (a.eventCount || 0)
        case "maxEvents":
          return (b.maxEvents || 0) - (a.maxEvents || 0)
        case "newest":
          return (b.id || 0) - (a.id || 0)
        default:
          return 0
      }
    })

    return filtered
  }

  const displayGroups = filteredAndSortedGroups()

  const filterEvents = (events, groupId) => {
    const eventSearchTerm = eventSearchTerms[groupId] || ""
    if (!eventSearchTerm) return events || []
    
    return (events || []).filter(event =>
      event.title?.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
      event.date?.includes(eventSearchTerm)
    )
  }

  const updateEventSearchTerm = (groupId, term) => {
    setEventSearchTerms(prev => ({
      ...prev,
      [groupId]: term
    }))
  }

  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          align-items: center;
          justify-content: flex-start;
          padding: 2rem 1rem;
          background: #f8fafc;
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header-title {
          font-size: 2rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .header-description {
          color: #6b7280;
          font-size: 1rem;
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

        .create-button {
          background: #1858e3ff;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 2rem;
          transition: background 0.2s;
        }

        .create-button:hover {
          background: #1d4ed8;
        }

        .groups-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 1.5rem;
          width: 100%;
          max-width: 1200px;
        }

        .group-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(21, 34, 221, 0.81);
          padding: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .group-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(21, 34, 221, 0.15);
        }

        .group-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .group-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: #2563eb;
          border-radius: 6px;
          margin-right: 1rem;
        }

        .group-icon svg {
          width: 20px;
          height: 20px;
          fill: white;
        }

        .group-info {
          flex: 1;
        }

        .group-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .group-description {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .group-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: 6px;
        }

        .meta-item {
          text-align: center;
        }

        .meta-label {
          font-size: 0.75rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .meta-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1f2937;
        }

        .visibility-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .visibility-public {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .visibility-private {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .visibility-hidden {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }

        .events-section {
          margin-top: 1rem;
        }

        .events-toggle {
          background: none;
          border: none;
          color: #2d68e7ff;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0;
          width: 100%;
          text-align: left;
        }

        .events-toggle:hover {
          color: #1d4ed8;
        }

        .toggle-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.2s;
        }

        .toggle-icon.expanded {
          transform: rotate(90deg);
        }

        .events-list {
          margin-top: 0.75rem;
          border-top: 1px solid #e5e7eb;
          padding-top: 0.75rem;
        }

        .event-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .event-item:last-child {
          border-bottom: none;
        }

        .event-info {
          flex: 1;
        }

        .event-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .event-date {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .event-attendees {
          font-size: 0.75rem;
          color: #6b7280;
          background: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .no-events {
          text-align: center;
          color: #6b7280;
          font-size: 0.875rem;
          padding: 1rem;
          font-style: italic;
        }

        .error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        .loading {
          text-align: center;
          color: #6b7280;
          font-size: 1rem;
          padding: 2rem;
        }

        .empty-state {
          text-align: center;
          color: #6b7280;
          font-size: 1rem;
          padding: 3rem;
        }

        .search-filters {
          width: 100%;
          max-width: 1200px;
          margin-bottom: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(21, 34, 221, 0.1);
          padding: 1.5rem;
        }

        .search-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .search-input {
          flex: 1;
          min-width: 250px;
          padding: 0.5rem;
          border: 1px solid #787c83ff;
          border-radius: 6px;
          font-size: 0.875rem;
          background-color: #9ca2a8ff;
        }

        .search-input:focus {
          outline: none;
          border-color: #6a8eddff;
          box-shadow: 0 0 0 2px rgba(125, 154, 215, 0.2);
          background-color: #a2c5e6ff;
        }

        .filter-select {
          padding: 0.5rem;
          border: 1px solid #787c83ff;
          border-radius: 6px;
          font-size: 0.875rem;
          background-color: #9ca2a8ff;
          cursor: pointer;
        }

        .filter-select:focus {
          outline: none;
          border-color: #6a8eddff;
          box-shadow: 0 0 0 2px rgba(125, 154, 215, 0.2);
          background-color: #a2c5e6ff;
        }

        .filter-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1f2937;
          margin-right: 0.5rem;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .clear-filters {
          background: #6b7280;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .clear-filters:hover {
          background: #4b5563;
        }

        .results-count {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 1rem;
        }

        .event-search {
          margin: 0.75rem 0;
          padding: 0.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 0.75rem;
          background-color: #f9fafb;
          width: 100%;
          box-sizing: border-box;
        }

        .event-search:focus {
          outline: none;
          border-color: #6a8eddff;
          box-shadow: 0 0 0 2px rgba(125, 154, 215, 0.1);
          background-color: white;
        }

        .event-search::placeholder {
          color: #9ca3af;
        }
      `}</style>

      <div className="header">
        <h1 className="header-title">
          Groups
          {user?.role === 'admin' && <span className="admin-badge">ADMIN</span>}
        </h1>
        <p className="header-description">
          {user?.role === 'admin' 
            ? "Manage all groups and their events" 
            : "Discover and join public groups"}
        </p>
      </div>

      {user?.role === 'admin' && (
        <Link href="/groups/create" className="create-button">
          + Create New Group
        </Link>
      )}

      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search groups, descriptions, or events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <div className="filter-group">
            <label className="filter-label">Visibility:</label>
            <select
              value={visibilityFilter}
              onChange={(e) => setVisibilityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="public">Public</option>
              {user?.role === 'admin' && (
                <>
                  <option value="private">Private</option>
                  <option value="hidden">Hidden</option>
                </>
              )}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="events">Most Events</option>
              <option value="maxEvents">Max Events</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchTerm("")
              setVisibilityFilter("all")
              setSortBy("name")
            }}
            className="clear-filters"
          >
            Clear Filters
          </button>
        </div>

        <div className="results-count">
          {displayGroups.length} group{displayGroups.length !== 1 ? 's' : ''} found
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading groups...</div>
      ) : displayGroups.length === 0 ? (
        <div className="empty-state">
          No groups available
        </div>
      ) : (
        <div className="groups-grid">
          {displayGroups.map((group) => (
            <div key={group.id} className="group-card">
              <div className="group-header">
                <div className="group-icon">
                  <svg viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
                    />
                  </svg>
                </div>
                <div className="group-info">
                  <h3 className="group-name">{group.name}</h3>
                  <p className="group-description">{group.description}</p>
                </div>
              </div>

              <div className="group-meta">
                <div className="meta-item">
                  <div className="meta-label">Events</div>
                  <div className="meta-value">{group.eventCount}</div>
                </div>
                <div className="meta-item">
                  <div className="meta-label">Max Events</div>
                  <div className="meta-value">{group.maxEvents}</div>
                </div>
                <div className="meta-item">
                  <div className="meta-label">Visibility</div>
                  <div className={`visibility-badge visibility-${group.visibility}`}>
                    {group.visibility}
                  </div>
                </div>
              </div>

              <div className="events-section">
                <button
                  className="events-toggle"
                  onClick={() => toggleGroupExpansion(group.id)}
                >
                  <svg 
                    className={`toggle-icon ${expandedGroups.has(group.id) ? 'expanded' : ''}`}
                    viewBox="0 0 24 24"
                  >
                    <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                  {expandedGroups.has(group.id) ? 'Hide Events' : 'Show Events'} ({group.eventCount})
                </button>

                {expandedGroups.has(group.id) && (
                  <div className="events-list">
                    {group.events && group.events.length > 0 && (
                      <input
                        type="text"
                        placeholder="Search events by title or date..."
                        value={eventSearchTerms[group.id] || ""}
                        onChange={(e) => updateEventSearchTerm(group.id, e.target.value)}
                        className="event-search"
                      />
                    )}
                    
                    {!group.events || group.events.length === 0 ? (
                      <div className="no-events">No events scheduled</div>
                    ) : (
                      (() => {
                        const filteredEvents = filterEvents(group.events, group.id)
                        return filteredEvents.length === 0 ? (
                          <div className="no-events">
                            {eventSearchTerms[group.id] 
                              ? `No events found for "${eventSearchTerms[group.id]}"` 
                              : "No events scheduled"}
                          </div>
                        ) : (
                          filteredEvents.map((event) => (
                            <div key={event.id} className="event-item">
                              <div className="event-info">
                                <div className="event-title">{event.title}</div>
                                <div className="event-date">{event.date}</div>
                              </div>
                              <div className="event-attendees">
                                {event.attendees} attendees
                              </div>
                            </div>
                          ))
                        )
                      })()
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
