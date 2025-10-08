'use client';

import styles from './EventCard.module.css';

export default function EventCard({ event, animationDelay = 0, showGroupName = false, showLocation = false }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return '#10b981';
      case 'completed': return '#6b7280';
      case 'cancelled': return '#ef4444';
      default: return '#10b981';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming': return '🕒';
      case 'completed': return '✅';
      case 'cancelled': return '❌';
      default: return '🕒';
    }
  };

  return (
    <div 
      className={styles.eventCard}
      style={{ 
        animationDelay: `${animationDelay}s`,
        '--status-color': getStatusColor(event.status)
      }}
    >
      <div className={styles.eventHeader}>
        <div className={styles.eventInfo}>
          <h5 className={styles.eventTitle}>{event.title}</h5>
          <div className={styles.eventMeta}>
            <span className={styles.eventDate}>
              📅 {formatDate(event.date)}
            </span>
            <span className={styles.eventTime}>
              🕐 {formatTime(event.time)}
            </span>
            {showGroupName && event.groupName && (
              <span className={styles.eventGroup}>
                👥 {event.groupName}
              </span>
            )}
            {showLocation && event.location && (
              <span className={styles.eventLocation}>
                📍 {event.location}
              </span>
            )}
          </div>
        </div>
        
        <div className={styles.statusBadge}>
          <span className={styles.statusIcon}>
            {getStatusIcon(event.status)}
          </span>
          <span className={styles.statusText}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
      </div>

      <div className={styles.eventFooter}>
        <div className={styles.attendeeInfo}>
          <span className={styles.attendeeIcon}>👥</span>
          <span className={styles.attendeeCount}>
            {event.attendees} {event.attendees === 1 ? 'attendee' : 'attendees'}
          </span>
        </div>
        
        {event.status === 'upcoming' && (
          <button className={styles.joinEventButton}>
            Join Event
          </button>
        )}
        
        {event.status === 'completed' && (
          <button className={styles.viewEventButton}>
            View Details
          </button>
        )}
      </div>
    </div>
  );
}
