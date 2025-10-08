// JWT-like token utilities for demo purposes
// In a real app, use proper JWT with secret keys

export function createToken(user) {
  // Simple token format: userId:role:timestamp
  const timestamp = Date.now()
  return `${user.id}:${user.role}:${timestamp}`
}

export function verifyToken(token) {
  try {
    const [userId, role, timestamp] = token.split(':')

    // Check if token is not too old (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours

    if (tokenAge > maxAge) {
      return null
    }

    return { id: userId, role: role || 'user' }
  } catch (error) {
    return null
  }
}

export function getAuthHeaders(user) {
  const token = createToken(user)
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}
