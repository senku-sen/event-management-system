export default function AdminUsersPage() {
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
          👤 User Management
          <span style={{
            background: '#ef4444',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '600',
            marginLeft: '0.5rem'
          }}>
            ADMIN
          </span>
        </h1>
        <p style={{
          color: '#6b7280',
          fontSize: '1rem',
          marginBottom: '2rem'
        }}>
          Comprehensive user management system for administrators. Control user roles, permissions, and account status.
        </p>
        <div style={{
          background: '#f3f4f6',
          padding: '1.5rem',
          borderRadius: '6px',
          textAlign: 'left'
        }}>
          <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>Admin Features:</h3>
          <ul style={{ color: '#6b7280', paddingLeft: '1.5rem' }}>
            <li>User role management (User ↔ Admin)</li>
            <li>Account activation/deactivation</li>
            <li>User activity monitoring</li>
            <li>Bulk user operations</li>
            <li>User analytics and reports</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
