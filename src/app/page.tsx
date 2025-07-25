import LoginPage from './auth/login/page';
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.page}>
            <LoginPage />
        </div>
    );
}
