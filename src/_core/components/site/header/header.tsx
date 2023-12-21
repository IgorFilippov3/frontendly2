import styles from './header.module.css';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/" className={styles.logo}>
          Frontendly
        </Link>
        <div className={styles.right}>
          <Link href="/auth/signin" className={styles.login}>
            Log in
          </Link>
          <Link href="/auth/signup" className={styles.register}>
            Become a creator
          </Link>
        </div>
      </div>
    </header>
  );
}