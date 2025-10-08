// Mock data for groups - in a real app, this would be a database
let groups = [
  {
    id: 1,
    name: "Tech Meetup Group",
    description: "A community for tech enthusiasts",
    visibility: "public",
    maxEvents: 50,
    eventCount: 3,
    events: [
      { id: 1, title: "React Workshop", date: "2024-01-15", attendees: 25 },
      { id: 2, title: "Node.js Bootcamp", date: "2024-01-20", attendees: 30 },
      { id: 3, title: "AI/ML Discussion", date: "2024-01-25", attendees: 15 }
    ],
    createdBy: "admin",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    name: "Photography Club",
    description: "Capturing moments together",
    visibility: "private",
    maxEvents: 20,
    eventCount: 2,
    events: [
      { id: 4, title: "Portrait Session", date: "2024-01-18", attendees: 12 },
      { id: 5, title: "Nature Walk", date: "2024-01-22", attendees: 8 }
    ],
    createdBy: "admin",
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z"
  },
  {
    id: 3,
    name: "Book Club",
    description: "Monthly book discussions",
    visibility: "public",
    maxEvents: 30,
    eventCount: 1,
    events: [
      { id: 6, title: "January Book Discussion", date: "2024-01-28", attendees: 20 }
    ],
    createdBy: "user1",
    createdAt: "2024-01-03T00:00:00.000Z",
    updatedAt: "2024-01-03T00:00:00.000Z"
  }
]

// Helper function to get user from request headers
function getUserFromRequest(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) return null

    // In a real app, you'd verify JWT tokens
    // For demo, we'll use a simple header format: "Bearer userId:role"
    const token = authHeader.replace('Bearer ', '')
    const [userId, role] = token.split(':')

    return { id: userId, role: role || 'user' }
  } catch (error) {
    return null
  }
}

export async function GET(request) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Filter groups based on user role
    let filteredGroups = groups

    // If user is not admin, only show public groups
    if (user.role !== 'admin') {
      filteredGroups = groups.filter(group => group.visibility === 'public')
    }

    return Response.json(filteredGroups)
  } catch (error) {
    console.error('GET /api/groups error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admins can create groups
    if (user.role !== 'admin') {
      return Response.json({ error: 'Only administrators can create groups' }, { status: 403 })
    }

    const body = await request.json()
    const { name, description, visibility, maxEvents } = body

    // Validation
    if (!name || name.trim().length < 3) {
      return Response.json({ error: 'Group name must be at least 3 characters' }, { status: 400 })
    }

    if (!description || description.trim().length < 10) {
      return Response.json({ error: 'Description must be at least 10 characters' }, { status: 400 })
    }

    if (!maxEvents || maxEvents < 1) {
      return Response.json({ error: 'Maximum events must be at least 1' }, { status: 400 })
    }

    if (!['public', 'private', 'hidden'].includes(visibility)) {
      return Response.json({ error: 'Invalid visibility setting' }, { status: 400 })
    }

    const newGroup = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      visibility,
      maxEvents: parseInt(maxEvents),
      eventCount: 0,
      events: [],
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    groups.push(newGroup)

    return Response.json(newGroup, { status: 201 })
  } catch (error) {
    console.error('POST /api/groups error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admins can update groups
    if (user.role !== 'admin') {
      return Response.json({ error: 'Only administrators can update groups' }, { status: 403 })
    }

    const body = await request.json()
    const { id, name, description, visibility, maxEvents } = body

    const groupIndex = groups.findIndex(g => g.id === parseInt(id))
    if (groupIndex === -1) {
      return Response.json({ error: 'Group not found' }, { status: 404 })
    }

    // Validation
    if (name && name.trim().length < 3) {
      return Response.json({ error: 'Group name must be at least 3 characters' }, { status: 400 })
    }

    if (description && description.trim().length < 10) {
      return Response.json({ error: 'Description must be at least 10 characters' }, { status: 400 })
    }

    if (maxEvents && maxEvents < 1) {
      return Response.json({ error: 'Maximum events must be at least 1' }, { status: 400 })
    }

    if (visibility && !['public', 'private', 'hidden'].includes(visibility)) {
      return Response.json({ error: 'Invalid visibility setting' }, { status: 400 })
    }

    // Update group
    const updatedGroup = {
      ...groups[groupIndex],
      ...(name !== undefined && { name: name.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(visibility !== undefined && { visibility }),
      ...(maxEvents !== undefined && { maxEvents: parseInt(maxEvents) }),
      updatedAt: new Date().toISOString()
    }

    groups[groupIndex] = updatedGroup

    return Response.json(updatedGroup)
  } catch (error) {
    console.error('PUT /api/groups error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admins can delete groups
    if (user.role !== 'admin') {
      return Response.json({ error: 'Only administrators can delete groups' }, { status: 403 })
    }

    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return Response.json({ error: 'Group ID is required' }, { status: 400 })
    }

    const groupIndex = groups.findIndex(g => g.id === parseInt(id))
    if (groupIndex === -1) {
      return Response.json({ error: 'Group not found' }, { status: 404 })
    }

    groups.splice(groupIndex, 1)

    return Response.json({ message: 'Group deleted successfully' })
  } catch (error) {
    console.error('DELETE /api/groups error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
