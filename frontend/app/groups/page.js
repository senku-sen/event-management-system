'use client';

import { useState, useEffect } from 'react';
import GroupCard from '../components/GroupCard';
import SearchFilter from '../components/SearchFilter';
import styles from './page.module.css';

// Mock data for demonstration
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
    name: 'Book Club',
    description: 'Monthly discussions about literature, fiction, and non-fiction books.',
    visibility: 'public',
    maxEvents: 20,
    memberCount: 156,
    category: 'literature',
    events: [
      {
        id: 6,
        title: 'Discussing "The Midnight Library"',
        date: '2024-01-18',
        time: '19:00',
        attendees: 28,
        status: 'upcoming'
      }
    ]
  },
  {
    id: 4,
    name: 'Fitness Warriors',
    description: 'Stay motivated and achieve your fitness goals together.',
    visibility: 'public',
    maxEvents: 100,
    memberCount: 312,
    category: 'fitness',
    events: [
      {
        id: 7,
        title: 'Morning Yoga Session',
        date: '2024-01-16',
        time: '07:00',
        attendees: 25,
        status: 'upcoming'
      },
      {
        id: 8,
        title: 'HIIT Training',
        date: '2024-01-19',
        time: '18:00',
        attendees: 20,
        status: 'upcoming'
      },
      {
        id: 9,
        title: 'Nutrition Workshop',
        date: '2024-01-12',
        time: '15:00',
        attendees: 35,
        status: 'completed'
      }
    ]
  }
];

export default function GroupsPage() {
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
      
      // Filter to show only public groups for regular users
      const publicGroups = mockGroups.filter(group => group.visibility === 'public');
      setGroups(publicGroups);
      setFilteredGroups(publicGroups);
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
          return b.id - a.id; // Assuming higher ID means more recent
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
        <h1 className={styles.title}>Discover Groups</h1>
        <p className={styles.subtitle}>Join communities that match your interests</p>
      </div>

      <SearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
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
            isAdmin={false}
          />
        ))}
      </div>

      {filteredGroups.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📭</div>
          <h3 className={styles.emptyTitle}>No groups found</h3>
          <p className={styles.emptyText}>
            {searchTerm ? 'Try adjusting your search terms' : 'No public groups available at the moment'}
          </p>
        </div>
      )}
    </div>
  );
}
