// Initialize demo data
if (typeof window !== 'undefined') {
  // Only run on client side
  const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

  // Add demo admin user if not exists
  const adminExists = registeredUsers.find(u => u.email === "admin@eventhub.com")
  if (!adminExists) {
    registeredUsers.push({
      id: "admin",
      email: "admin@eventhub.com",
      firstName: "Admin",
      lastName: "User",
      phone: "+1234567890",
      role: "admin",
      createdAt: new Date().toISOString()
    })
  }

  // Add demo regular user if not exists
  const userExists = registeredUsers.find(u => u.email === "user@eventhub.com")
  if (!userExists) {
    registeredUsers.push({
      id: "user1",
      email: "user@eventhub.com",
      firstName: "Demo",
      lastName: "User",
      phone: "+1234567890",
      role: "user",
      createdAt: new Date().toISOString()
    })
  }

  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))
}
