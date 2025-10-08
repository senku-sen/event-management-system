'use client';

import { useState } from 'react';
import styles from './GroupCreateForm.module.css';

export default function GroupCreateForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    visibility: 'public',
    maxEvents: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Group name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Group name must be at least 3 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.maxEvents || formData.maxEvents < 1) {
      newErrors.maxEvents = 'Max events must be at least 1';
    } else if (formData.maxEvents > 1000) {
      newErrors.maxEvents = 'Max events cannot exceed 1000';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to create the group
      console.log('Creating group:', formData);
      
      // Reset form on success
      setFormData({
        name: '',
        description: '',
        visibility: 'public',
        maxEvents: ''
      });
      
      alert('Group created successfully!');
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Group Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="Enter group name"
            disabled={isSubmitting}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
            placeholder="Describe the purpose and goals of this group"
            rows="4"
            disabled={isSubmitting}
          />
          {errors.description && <span className={styles.error}>{errors.description}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="visibility" className={styles.label}>
            Visibility
          </label>
          <select
            id="visibility"
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className={styles.select}
            disabled={isSubmitting}
          >
            <option value="public">Public - Anyone can see and join</option>
            <option value="private">Private - Invitation only</option>
            <option value="restricted">Restricted - Visible but approval required</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="maxEvents" className={styles.label}>
            Maximum Events *
          </label>
          <input
            type="number"
            id="maxEvents"
            name="maxEvents"
            value={formData.maxEvents}
            onChange={handleChange}
            className={`${styles.input} ${errors.maxEvents ? styles.inputError : ''}`}
            placeholder="Maximum number of events (1-1000)"
            min="1"
            max="1000"
            disabled={isSubmitting}
          />
          {errors.maxEvents && <span className={styles.error}>{errors.maxEvents}</span>}
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            disabled={isSubmitting}
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Creating...
              </>
            ) : (
              'Create Group'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
