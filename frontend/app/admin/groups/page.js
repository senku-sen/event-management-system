'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GroupCard from '../../components/GroupCard';
import SearchFilter from '../../components/SearchFilter';
import styles from './page.module.css';

// Extended mock data including private groups for admin view
const mockGroups = [
  {
    id: 1,
    name: 'Tech Enthusiasts',
    description: 'A community for technology lovers to share knowledge and network.',
    visibility: 'public',
    maxEvents: 50,
    memberCount: 245,
    category: 'technology',
    events: [
      {
        id: 1,
        title: 'React Workshop',
        date: '2024-01-15',
        time: '14:00',
        attendees: 32,
        status: 'upcoming'
      },
      {
        id: 2,
        title: 'AI/ML Meetup',
        date: '2024-01-22',
        time: '18:30',
        attendees: 18,
        status: 'upcoming'
      },
      {
        id: 3,
        title: 'JavaScript Fundamentals',
        date: '2024-01-08',
        time: '16:00',
        attendees: 45,
        status: 'completed'
      }
    ]
  },
  {
    id: 2,
    name: 'Photography Club',
    description: 'Capture moments, share stories, and improve your photography skills.',
    visibility: 'public',
    maxEvents: 30,
    memberCount: 89,
    category: 'photography',
    events: [
      {
        id: 4,
        title: 'Street Photography Walk',
        date: '2024-01-20',
        time: '10:00',
        attendees: 15,
        status: 'upcoming'
      },
      {
        id: 5,
        title: 'Portrait Lighting Workshop',
        date: '2024-01-25',
        time: '14:00',
        attendees: 12,
        status: 'upcoming'
      }
    ]
  },
  {
    id: 3,
    name: 'Executive Board',
    description: 'Private discussions and strategic planning for company leadership.',
    visibility: 'private',
    maxEvents: 15,
    memberCount: 8,
    category: 'business',
    events: [
      {
        id: 6,
        title: 'Q1 Strategy Meeting',
        date: '2024-01-17',
        time: '09:00',
        attendees: 8,
        status: 'upcoming'
      },
      {
        id: 7,
        title: 'Budget Review',
        date: '2024-01-24',
        time: '14:00',
        attendees: 6,
        status: 'upcoming'
      }
    ]
  },
  {
    id: 5,
    name: 'HR Team',
    description: 'Human resources coordination and employee engagement activities.',
    visibility: 'private',
    maxEvents: 25,
    memberCount: 12,
    category: 'business',
    events: [
      {
        id: 9,
        title: 'Team Building Workshop',
        date: '2024-01-21',
        time: '10:00',
        attendees: 12,
        status: 'upcoming'
      }
    ]
  },
  {
    id: 6,
    name: 'Fitness Warriors',
    description: 'Stay motivated and achieve your fitness goals together.',
    visibility: 'public',
    maxEvents: 100,
    memberCount: 312,
    category: 'fitness',
    events: [
      {
        id: 10,
        title: 'Morning Yoga Session',
        date: '2024-01-16',
        time: '07:00',
        attendees: 25,
        status: 'upcoming'
      },
      {
        id: 11,
        title: 'HIIT Training',
        date: '2024-01-19',
        time: '18:00',
        attendees: 20,
        status: 'upcoming'
      }
    ]
  }
];

export default function AdminGroupsPage() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    visibility: 'all',
    category: 'all',
    dateRange: 'all',
    status: 'all',
    sortBy: 'name'
  });

  useEffect(() => {
    // Simulate API call
    const fetchGroups = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Admin sees all groups
      setGroups(mockGroups);
      setFilteredGroups(mockGroups);
      setLoading(false);
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, groups]);

  const applyFilters = () => {
    let filtered = [...groups];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply visibility filter
    if (filters.visibility !== 'all') {
      filtered = filtered.filter(group => group.visibility === filters.visibility);
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(group => group.category === filters.category);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'members':
          return b.memberCount - a.memberCount;
        case 'events':
          return b.events.length - a.events.length;
        case 'recent':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    setFilteredGroups(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const getGroupStats = () => {
    const total = groups.length;
    const publicCount = groups.filter(g => g.visibility === 'public').length;
    const privateCount = groups.filter(g => g.visibility === 'private').length;
    const restrictedCount = groups.filter(g => g.visibility === 'restricted').length;
    
    return { total, publicCount, privateCount, restrictedCount };
  };

  const stats = getGroupStats();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Group Management</h1>
          <p className={styles.subtitle}>Manage all groups and their events</p>
        </div>
        
        <Link href="/admin/groups/create" className={styles.createButton}>
          + Create New Group
        </Link>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.total}</div>
          <div className={styles.statLabel}>Total Groups</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.publicCount}</div>
          <div className={styles.statLabel}>Public</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.privateCount}</div>
          <div className={styles.statLabel}>Private</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.restrictedCount}</div>
          <div className={styles.statLabel}>Restricted</div>
        </div>
      </div>

      <SearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        showVisibilityFilter={true}
        showCategoryFilter={true}
        placeholder="Search groups by name or description..."
        type="groups"
      />

      <div className={styles.groupsGrid}>
        {filteredGroups.map((group, index) => (
          <GroupCard 
            key={group.id} 
            group={group} 
            animationDelay={index * 0.1}
            isAdmin={true}
          />
        ))}
      </div>

      {filteredGroups.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📭</div>
          <h3 className={styles.emptyTitle}>No groups found</h3>
          <p className={styles.emptyText}>
            {searchTerm || Object.values(filters).some(f => f !== 'all' && f !== 'name')
              ? 'Try adjusting your search or filter criteria' 
              : 'No groups available at the moment'}
          </p>
        </div>
      )}
    </div>
  );
}
