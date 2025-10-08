'use client';

import { useState } from 'react';
import styles from './SearchFilter.module.css';

export default function SearchFilter({ 
  onSearch, 
  onFilter, 
  showVisibilityFilter = false,
  showCategoryFilter = false,
  showDateFilter = false,
  placeholder = "Search...",
  type = "groups" // "groups" or "events"
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    visibility: 'all',
    category: 'all',
    dateRange: 'all',
    status: 'all',
    sortBy: 'name'
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    'Technology',
    'Photography',
    'Literature',
    'Fitness',
    'Business',
    'Education',
    'Arts',
    'Music',
    'Sports',
    'Travel'
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      visibility: 'all',
      category: 'all',
      dateRange: 'all',
      status: 'all',
      sortBy: 'name'
    };
    setFilters(defaultFilters);
    setSearchTerm('');
    onSearch('');
    onFilter(defaultFilters);
  };

  const hasActiveFilters = () => {
    return searchTerm || 
           filters.visibility !== 'all' || 
           filters.category !== 'all' || 
           filters.dateRange !== 'all' ||
           filters.status !== 'all' ||
           filters.sortBy !== 'name';
  };

  return (
    <div className={styles.searchFilterContainer}>
      <div className={styles.mainSearchRow}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <div className={styles.searchIcon}>🔍</div>
        </div>

        <button
          className={`${styles.filterToggle} ${isExpanded ? styles.active : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className={styles.filterIcon}>⚙️</span>
          <span className={styles.filterText}>Filters</span>
          <span className={`${styles.toggleArrow} ${isExpanded ? styles.expanded : ''}`}>
            ▼
          </span>
        </button>

        {hasActiveFilters() && (
          <button className={styles.clearButton} onClick={clearFilters}>
            <span className={styles.clearIcon}>✕</span>
            Clear
          </button>
        )}
      </div>

      <div className={`${styles.filtersPanel} ${isExpanded ? styles.expanded : ''}`}>
        <div className={styles.filtersGrid}>
          {/* Sort By Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className={styles.filterSelect}
            >
              <option value="name">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              {type === 'groups' && (
                <>
                  <option value="members">Most Members</option>
                  <option value="events">Most Events</option>
                  <option value="recent">Recently Created</option>
                </>
              )}
              {type === 'events' && (
                <>
                  <option value="date">Date (Earliest)</option>
                  <option value="date-desc">Date (Latest)</option>
                  <option value="attendees">Most Attendees</option>
                </>
              )}
            </select>
          </div>

          {/* Visibility Filter */}
          {showVisibilityFilter && (
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Visibility</label>
              <select
                value={filters.visibility}
                onChange={(e) => handleFilterChange('visibility', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Visibility</option>
                <option value="public">🌍 Public</option>
                <option value="private">🔒 Private</option>
                <option value="restricted">🔐 Restricted</option>
              </select>
            </div>
          )}

          {/* Category Filter */}
          {showCategoryFilter && (
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Date Range Filter */}
          {showDateFilter && (
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past Events</option>
              </select>
            </div>
          )}

          {/* Status Filter for Events */}
          {type === 'events' && (
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Status</option>
                <option value="upcoming">🕒 Upcoming</option>
                <option value="completed">✅ Completed</option>
                <option value="cancelled">❌ Cancelled</option>
              </select>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters() && (
          <div className={styles.activeFilters}>
            <span className={styles.activeFiltersLabel}>Active Filters:</span>
            <div className={styles.activeFiltersList}>
              {searchTerm && (
                <span className={styles.activeFilter}>
                  Search: "{searchTerm}"
                  <button onClick={() => { setSearchTerm(''); onSearch(''); }}>✕</button>
                </span>
              )}
              {filters.visibility !== 'all' && (
                <span className={styles.activeFilter}>
                  Visibility: {filters.visibility}
                  <button onClick={() => handleFilterChange('visibility', 'all')}>✕</button>
                </span>
              )}
              {filters.category !== 'all' && (
                <span className={styles.activeFilter}>
                  Category: {filters.category}
                  <button onClick={() => handleFilterChange('category', 'all')}>✕</button>
                </span>
              )}
              {filters.dateRange !== 'all' && (
                <span className={styles.activeFilter}>
                  Date: {filters.dateRange}
                  <button onClick={() => handleFilterChange('dateRange', 'all')}>✕</button>
                </span>
              )}
              {filters.status !== 'all' && (
                <span className={styles.activeFilter}>
                  Status: {filters.status}
                  <button onClick={() => handleFilterChange('status', 'all')}>✕</button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
