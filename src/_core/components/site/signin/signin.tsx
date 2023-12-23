'use client';

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { GithubButton } from "../github-button/github-button";

export const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn('login', {
        email,
        password,
        callbackUrl: '/me'
      });
    } catch (e) {
      console.error(e);
    }
  }

  const handleEmailChange = (e: any) => setEmail(e.target.value);

  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const signInWithGithub = () => {
    try {
      signIn('github', {
        callbackUrl: '/me'
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <GithubButton onClick={signInWithGithub}>Log in with github</GithubButton>
        <div style={{ textAlign: 'center', marginTop: 16, marginBottom: 6 }}>&mdash; OR &mdash;</div>
        <Typography component="h1" variant="h5" sx={{ color: '#24185b' }}>
          Log in with email
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => handleEmailChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => handlePasswordChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}>
            Sign In
          </Button>
          {/* <div style={{ textAlign: 'right', marginTop: 8 }}>
            <Link href="/auth/signup" style={{ color: '#24185b' }}>
              {"Don't have an account? Create"}
            </Link>
          </div> */}
        </Box>
      </Box>
    </Container>
  );
}