export default function EventsPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 4rem)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: '#f8fafc'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(21, 34, 221, 0.81)',
        padding: '2rem',
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          📅 Events
        </h1>
        <p style={{
          color: '#6b7280',
          fontSize: '1rem',
          marginBottom: '2rem'
        }}>
          Event management functionality coming soon! This page will allow you to view, create, and manage events.
        </p>
        <div style={{
          background: '#f3f4f6',
          padding: '1.5rem',
          borderRadius: '6px',
          textAlign: 'left'
        }}>
          <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>Planned Features:</h3>
          <ul style={{ color: '#6b7280', paddingLeft: '1.5rem' }}>
            <li>View upcoming events</li>
            <li>Create new events</li>
            <li>RSVP to events</li>
            <li>Event attendance tracking</li>
            <li>Event analytics</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
