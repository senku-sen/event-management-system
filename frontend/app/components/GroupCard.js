'use client';

import { useState } from 'react';
import EventCard from './EventCard';
import styles from './GroupCard.module.css';

export default function GroupCard({ group, animationDelay = 0, isAdmin = false }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'public': return '🌍';
      case 'private': return '🔒';
      case 'restricted': return '🔐';
      default: return '🌍';
    }
  };

  const getVisibilityColor = (visibility) => {
    switch (visibility) {
      case 'public': return '#10b981';
      case 'private': return '#ef4444';
      case 'restricted': return '#f59e0b';
      default: return '#10b981';
    }
  };

  const upcomingEvents = group.events.filter(event => event.status === 'upcoming');
  const completedEvents = group.events.filter(event => event.status === 'completed');

  return (
    <div 
      className={styles.card}
      style={{ 
        animationDelay: `${animationDelay}s`,
        '--visibility-color': getVisibilityColor(group.visibility)
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.groupInfo}>
          <div className={styles.titleRow}>
            <h3 className={styles.groupName}>{group.name}</h3>
            <div className={styles.visibilityBadge}>
              <span className={styles.visibilityIcon}>
                {getVisibilityIcon(group.visibility)}
              </span>
              <span className={styles.visibilityText}>
                {group.visibility.charAt(0).toUpperCase() + group.visibility.slice(1)}
              </span>
            </div>
          </div>
          <p className={styles.groupDescription}>{group.description}</p>
        </div>
        
        {isAdmin && (
          <div className={styles.adminActions}>
            <button className={styles.editButton}>✏️</button>
            <button className={styles.deleteButton}>🗑️</button>
          </div>
        )}
      </div>

      <div className={styles.groupStats}>
        <div className={styles.stat}>
          <span className={styles.statIcon}>👥</span>
          <span className={styles.statValue}>{group.memberCount}</span>
          <span className={styles.statLabel}>Members</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>📅</span>
          <span className={styles.statValue}>{group.events.length}</span>
          <span className={styles.statLabel}>Events</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>🎯</span>
          <span className={styles.statValue}>{group.maxEvents}</span>
          <span className={styles.statLabel}>Max Events</span>
        </div>
      </div>

      <div className={styles.eventsSection}>
        <button 
          className={styles.eventsToggle}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className={styles.eventsTitle}>
            Events ({upcomingEvents.length} upcoming)
          </span>
          <span className={`${styles.toggleIcon} ${isExpanded ? styles.expanded : ''}`}>
            ▼
          </span>
        </button>

        <div className={`${styles.eventsContainer} ${isExpanded ? styles.expanded : ''}`}>
          {upcomingEvents.length > 0 && (
            <div className={styles.eventGroup}>
              <h4 className={styles.eventGroupTitle}>Upcoming Events</h4>
              {upcomingEvents.map((event, index) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  animationDelay={index * 0.1}
                />
              ))}
            </div>
          )}

          {completedEvents.length > 0 && (
            <div className={styles.eventGroup}>
              <h4 className={styles.eventGroupTitle}>Completed Events</h4>
              {completedEvents.slice(0, 3).map((event, index) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  animationDelay={(upcomingEvents.length + index) * 0.1}
                />
              ))}
              {completedEvents.length > 3 && (
                <div className={styles.moreEvents}>
                  +{completedEvents.length - 3} more completed events
                </div>
              )}
            </div>
          )}

          {group.events.length === 0 && (
            <div className={styles.noEvents}>
              <span className={styles.noEventsIcon}>📭</span>
              <span className={styles.noEventsText}>No events scheduled</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <button className={styles.joinButton}>
          {isAdmin ? 'Manage Group' : 'View Details'}
        </button>
      </div>
    </div>
  );
}
