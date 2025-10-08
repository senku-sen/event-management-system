'use client';

import { useState, useEffect } from 'react';
import SearchFilter from '../components/SearchFilter';
import EventCard from '../components/EventCard';
import styles from './page.module.css';

// Extended mock data with categories and more events
const mockEvents = [
  {
    id: 1,
    title: 'React Workshop: Building Modern UIs',
    date: '2024-01-15',
    time: '14:00',
    attendees: 32,
    status: 'upcoming',
    category: 'technology',
    groupName: 'Tech Enthusiasts',
    groupId: 1,
    description: 'Learn the fundamentals of React and build your first component.',
    location: 'Conference Room A',
    maxAttendees: 50
  },
  {
    id: 2,
    title: 'AI/ML Meetup: Future of Machine Learning',
    date: '2024-01-22',
    time: '18:30',
    attendees: 18,
    status: 'upcoming',
    category: 'technology',
    groupName: 'Tech Enthusiasts',
    groupId: 1,
    description: 'Discuss the latest trends in artificial intelligence and machine learning.',
    location: 'Virtual Meeting',
    maxAttendees: 30
  },
  {
    id: 3,
    title: 'Street Photography Walk',
    date: '2024-01-20',
    time: '10:00',
    attendees: 15,
    status: 'upcoming',
    category: 'photography',
    groupName: 'Photography Club',
    groupId: 2,
    description: 'Explore the city and capture stunning street photography.',
    location: 'City Center',
    maxAttendees: 20
  },
  {
    id: 4,
    title: 'Portrait Lighting Workshop',
    date: '2024-01-25',
    time: '14:00',
    attendees: 12,
    status: 'upcoming',
    category: 'photography',
    groupName: 'Photography Club',
    groupId: 2,
    description: 'Master the art of portrait lighting techniques.',
    location: 'Studio B',
    maxAttendees: 15
  },
  {
    id: 5,
    title: 'Discussing "The Midnight Library"',
    date: '2024-01-18',
    time: '19:00',
    attendees: 28,
    status: 'upcoming',
    category: 'literature',
    groupName: 'Book Club',
    groupId: 3,
    description: 'Monthly book discussion and literary analysis.',
    location: 'Library Meeting Room',
    maxAttendees: 40
  },
  {
    id: 6,
    title: 'Morning Yoga Session',
    date: '2024-01-16',
    time: '07:00',
    attendees: 25,
    status: 'upcoming',
    category: 'fitness',
    groupName: 'Fitness Warriors',
    groupId: 4,
    description: 'Start your day with energizing yoga practice.',
    location: 'Fitness Center',
    maxAttendees: 30
  },
  {
    id: 7,
    title: 'HIIT Training Session',
    date: '2024-01-19',
    time: '18:00',
    attendees: 20,
    status: 'upcoming',
    category: 'fitness',
    groupName: 'Fitness Warriors',
    groupId: 4,
    description: 'High-intensity interval training for all fitness levels.',
    location: 'Gym Floor',
    maxAttendees: 25
  },
  {
    id: 8,
    title: 'JavaScript Fundamentals',
    date: '2024-01-08',
    time: '16:00',
    attendees: 45,
    status: 'completed',
    category: 'technology',
    groupName: 'Tech Enthusiasts',
    groupId: 1,
    description: 'Comprehensive introduction to JavaScript programming.',
    location: 'Conference Room B',
    maxAttendees: 50
  },
  {
    id: 9,
    title: 'Nutrition Workshop',
    date: '2024-01-12',
    time: '15:00',
    attendees: 35,
    status: 'completed',
    category: 'fitness',
    groupName: 'Fitness Warriors',
    groupId: 4,
    description: 'Learn about healthy eating and meal planning.',
    location: 'Community Center',
    maxAttendees: 40
  },
  {
    id: 10,
    title: 'Digital Art Showcase',
    date: '2024-01-14',
    time: '17:00',
    attendees: 22,
    status: 'completed',
    category: 'arts',
    groupName: 'Creative Artists',
    groupId: 5,
    description: 'Exhibition of digital artwork by local artists.',
    location: 'Art Gallery',
    maxAttendees: 50
  },
  {
    id: 11,
    title: 'Business Networking Event',
    date: '2024-01-30',
    time: '19:00',
    attendees: 8,
    status: 'upcoming',
    category: 'business',
    groupName: 'Entrepreneurs Hub',
    groupId: 6,
    description: 'Connect with fellow entrepreneurs and business professionals.',
    location: 'Business Center',
    maxAttendees: 100
  },
  {
    id: 12,
    title: 'Classical Music Concert',
    date: '2024-02-05',
    time: '20:00',
    attendees: 45,
    status: 'upcoming',
    category: 'music',
    groupName: 'Music Lovers',
    groupId: 7,
    description: 'Evening of classical music performances.',
    location: 'Concert Hall',
    maxAttendees: 200
  }
];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    visibility: 'all',
    category: 'all',
    dateRange: 'all',
    status: 'all',
    sortBy: 'date'
  });

  useEffect(() => {
    // Simulate API call
    const fetchEvents = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, events]);

  const applyFilters = () => {
    let filtered = [...events];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(event => event.category === filters.category);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(event => event.status === filters.status);
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        
        switch (filters.dateRange) {
          case 'today':
            return eventDate.toDateString() === today.toDateString();
          case 'week':
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            return eventDate >= today && eventDate <= weekFromNow;
          case 'month':
            const monthFromNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
            return eventDate >= today && eventDate <= monthFromNow;
          case 'upcoming':
            return eventDate >= today && event.status === 'upcoming';
          case 'past':
            return eventDate < today || event.status === 'completed';
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'attendees':
          return b.attendees - a.attendees;
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const getEventStats = () => {
    const total = events.length;
    const upcoming = events.filter(e => e.status === 'upcoming').length;
    const completed = events.filter(e => e.status === 'completed').length;
    const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0);
    
    return { total, upcoming, completed, totalAttendees };
  };

  const stats = getEventStats();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Discover Events</h1>
        <p className={styles.subtitle}>Find and join events that interest you</p>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.total}</div>
          <div className={styles.statLabel}>Total Events</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.upcoming}</div>
          <div className={styles.statLabel}>Upcoming</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.completed}</div>
          <div className={styles.statLabel}>Completed</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.totalAttendees}</div>
          <div className={styles.statLabel}>Total Attendees</div>
        </div>
      </div>

      <SearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        showCategoryFilter={true}
        showDateFilter={true}
        placeholder="Search events by title, description, group, or location..."
        type="events"
      />

      <div className={styles.resultsHeader}>
        <h2 className={styles.resultsTitle}>
          {filteredEvents.length} Event{filteredEvents.length !== 1 ? 's' : ''} Found
        </h2>
        {(searchTerm || Object.values(filters).some(f => f !== 'all' && f !== 'date')) && (
          <p className={styles.resultsSubtitle}>
            Showing filtered results
          </p>
        )}
      </div>

      <div className={styles.eventsGrid}>
        {filteredEvents.map((event, index) => (
          <div key={event.id} className={styles.eventWrapper}>
            <EventCard 
              event={event} 
              animationDelay={index * 0.1}
              showGroupName={true}
              showLocation={true}
            />
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3 className={styles.emptyTitle}>No events found</h3>
          <p className={styles.emptyText}>
            {searchTerm || Object.values(filters).some(f => f !== 'all' && f !== 'date')
              ? 'Try adjusting your search or filter criteria'
              : 'No events are available at the moment'}
          </p>
        </div>
      )}
    </div>
  );
}
