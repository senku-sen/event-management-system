'use client';

import GroupCreateForm from '../../../components/GroupCreateForm';
import styles from './page.module.css';

export default function CreateGroupPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create New Group</h1>
        <p className={styles.subtitle}>Set up a new group for your events</p>
      </div>
      <GroupCreateForm />
    </div>
  );
}
