# EventHub - Navigation & Usage Guide

## 🚀 Quick Start

### Demo Accounts
- **Admin**: `admin@eventhub.com` (any password)
- **User**: `user@eventhub.com` (any password)

## 📍 Page Navigation

### Public Pages (No Login Required)
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page

### User Pages (Login Required)
- `/groups` - View public groups
- `/events` - View events (placeholder)

### Admin Pages (Admin Login Required)
- `/groups/create` - Create new groups
- `/admin/groups` - Advanced group management
- `/admin/users` - User management

## 🎯 Features by Role

### Regular Users
- ✅ View public groups
- ✅ Search and filter groups
- ✅ View events within groups
- ❌ Cannot create/edit/delete groups

### Administrators
- ✅ All user features
- ✅ Create new groups
- ✅ Edit existing groups
- ✅ Delete groups
- ✅ View all groups (public/private/hidden)
- ✅ Access admin management pages

## 🔧 UI Components

### Navigation Bar
**Location**: Top of every page (sticky)

**User View**:
- Home | Events | Groups | Sign In

**Admin View**:
- Home | Events | Groups | Create Group | Group Management | User Management
- Shows "ADMIN" badge next to name

### Groups Page (`/groups`)

**Layout**:
1. **Header** - Title with admin badge (if admin)
2. **Create Button** - Only visible to admins
3. **Search & Filters**:
   - Search bar (searches name, description, events)
   - Visibility filter (all/public/private/hidden)
   - Sort by (name/events/maxEvents/newest)
   - Clear filters button
   - **Refresh button** (inline, right side of results count)
4. **Results Count** - Shows number of groups found
5. **Groups Grid** - Cards with group information

**Admin Features on Group Cards**:
- ✏️ Edit button
- 🗑️ Delete button (with confirmation)

### Group Creation Page (`/groups/create`)

**Access**: Admin only (redirects non-admins)

**Form Fields**:
- Group Name (min 3 characters)
- Description (textarea, min 10 characters)
- Visibility (dropdown: Public/Private/Hidden)
- Max Events (number, min 1)

**Actions**:
- Create Group button (with loading spinner)
- Back to Groups link

## 🎨 UI Improvements Made

### Refresh Button
**Before**: Separate button in action-buttons section
**After**: Inline button next to results count
- ✅ More compact and organized
- ✅ Contextually placed with search results
- ✅ Smaller size (0.75rem font)
- ✅ Green color (#10b981) for positive action
- ✅ Shows spinner during refresh

### Layout Organization
1. **Header** - Page title and description
2. **Admin Actions** - Create button (if admin)
3. **Search/Filter Panel** - All search and filter controls
4. **Results Bar** - Count + Refresh button
5. **Content Grid** - Group cards

## 🐛 Fixes Applied

### 1. Removed Duplicate Action Buttons Section
- Removed old `action-buttons` container
- Moved create button directly under header
- Removed standalone refresh button

### 2. Reorganized Refresh Button
- Moved to results count area
- Made inline with results text
- Reduced size for better visual hierarchy

### 3. Improved Role Restrictions
- Clear messaging for non-logged-in users
- Admin-only features properly hidden
- Automatic redirects for unauthorized access

### 4. Responsive Design
- Refresh button scales down on mobile
- All buttons stack properly on small screens
- Touch-friendly sizes maintained

## 📱 Responsive Breakpoints

### Desktop (1200px+)
- Multi-column grid
- Full navigation bar
- All features visible

### Tablet (768px-1199px)
- Single column grid
- Adjusted spacing
- Hamburger menu

### Mobile (480px-767px)
- Compact layout
- Stacked elements
- Smaller buttons and text

## 🔐 Authentication Flow

1. **Register** → Creates account with 'user' role
2. **Login** → Validates and stores user session
3. **Navigation** → Updates based on role
4. **API Calls** → Include auth headers
5. **Backend** → Validates role and filters data

## 🧪 Testing Guide

### Test as Admin
```
1. Go to http://localhost:3000/login
2. Email: admin@eventhub.com
3. Password: (anything)
4. Verify:
   - Red ADMIN badge in navigation
   - 6 navigation links
   - Create Group button visible
   - Edit/Delete buttons on groups
   - Can see all groups
```

### Test as User
```
1. Go to http://localhost:3000/login
2. Email: user@eventhub.com
3. Password: (anything)
4. Verify:
   - No admin badge
   - 3 navigation links
   - No create button
   - No edit/delete buttons
   - Only public groups visible
```

### Test Refresh Button
```
1. Login as any user
2. Go to /groups
3. Look at results count area
4. Click "🔄 Refresh" button on the right
5. Verify:
   - Button shows spinner
   - Text changes to "Refreshing..."
   - Groups reload
   - Success message appears
```

## 📂 File Structure

```
frontend/app/
├── page.js                    # Home page
├── login/page.js              # Login page
├── register/page.js           # Registration page
├── groups/
│   ├── page.js               # Groups list (main page)
│   └── create/page.js        # Group creation form
├── events/page.js            # Events placeholder
├── admin/
│   ├── groups/page.js        # Admin group management
│   └── users/page.js         # Admin user management
├── components/
│   └── Navigation.js         # Navigation bar
├── api/
│   └── groups/route.js       # Groups API endpoints
└── lib/
    ├── auth.js               # Authentication utilities
    └── demoData.js           # Demo accounts setup
```

## 🎯 Key Features

- ✅ Role-based access control
- ✅ Responsive design (desktop/tablet/mobile)
- ✅ Search and filter functionality
- ✅ Loading states and spinners
- ✅ Success/error messages
- ✅ Form validation
- ✅ API integration
- ✅ Clean, organized UI
- ✅ Intuitive navigation

## 🚀 Next Steps

To enhance the system further:
1. Implement actual backend API
2. Add JWT authentication
3. Create event management pages
4. Add user profile pages
5. Implement group editing functionality
6. Add image upload for groups
7. Create notification system
8. Add analytics dashboard

---

**Last Updated**: 2025-01-09
**Version**: 1.0.0
**Status**: ✅ All Developer 5 tasks completed
