// components/MainLayout.jsx
import styles from './MainLayout.module.css';

export default function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav>
          <h2>Divion Steps</h2>
          <ul>
            <li>Upload Staff</li>
            <li>Assign Programs</li>
            <li>Upload Documents</li>
            <li>View Compliance</li>
            <li>Export Report</li>
          </ul>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
