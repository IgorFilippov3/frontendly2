import { Session } from 'next-auth';
import styles from './header.module.css';
import Link from 'next/link';

interface HeaderProps {
  session: Session | null;
}

export const Header = ({ session }: HeaderProps) => {

  const renderButtons = (isUserAuthenticated: boolean) => {
    if (!isUserAuthenticated) {
      return (
        <>
          <Link href="/auth/signin" className={styles.login}>
            Log in
          </Link>
          <Link href="/auth/signup" className={styles.register}>
            Become a creator
          </Link>
        </>
      );
    }

    return (
      <>
        <Link href="/me/lessons" className={styles.register}>
          Create tutorial
        </Link>
      </>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/" className={styles.logo}>
          Frontendly
        </Link>
        <div className={styles.right}>
          {renderButtons(session !== null)}
        </div>
      </div>
    </header>
  );
}