import GitHubIcon from '@mui/icons-material/GitHub';

import styles from './github-button.module.css';

interface GithubButtonProps extends React.PropsWithChildren {
  onClick: () => void;
}

export const GithubButton = ({ children, onClick }: GithubButtonProps) => {
  return (
    <button className={styles.GithubButton} onClick={onClick}>
      <GitHubIcon />
      <span className={styles.GithubButtonLabel}>{children}</span>
    </button>
  );
}