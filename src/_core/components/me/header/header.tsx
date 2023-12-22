'use client';

import { signOut, useSession } from 'next-auth/react';
import styles from './header.module.css';
import Link from 'next/link';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

const {
  link,
  toolbar,
  logo,
} = styles;

export const MeHeader = () => {
  const router = useRouter();
  const { data } = useSession();

  const logout = async () => {
    await signOut();
    router.push('/');
  }

  return (
    <AppBar position="static">
      <Toolbar className={toolbar}>
        <Link href="/" className={logo}>
          Frontendly
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: 12 }}>
            <Link href="/me" passHref>
              <Button className={link}>Getting started</Button>
            </Link>
          </div>
          <div style={{ marginRight: 12 }}>
            <Link href="https://discord.gg/DattynRJ" passHref>
              <Button className={link}>Discord</Button>
            </Link>
          </div>
          <div style={{ marginRight: 12 }}>
            <Link href="/me/lessons" passHref>
              <Button className={link}>Lessons</Button>
            </Link>
          </div>
          <IconButton
            size="large"
            aria-label="logout"
            color="inherit"
            onClick={logout}>
            <LogoutIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}