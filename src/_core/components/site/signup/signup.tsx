'use client';

import { validateEmail } from "@/_core/utils/validate-email";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GithubButton } from "../github-button/github-button";

interface ValidationError {
  error: boolean;
  text?: string;
}

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState<ValidationError | null>(null);
  const [emailError, setEmailError] = useState<ValidationError | null>(null);
  const [passwordError, setPasswordError] = useState<ValidationError | null>(null);

  const [disabledSubmit, setDisabledSubmit] = useState(true);

  useEffect(() => {
    if (!nameError || !emailError || !passwordError) return;

    if (!nameError.error && !emailError.error && !passwordError.error) {
      setDisabledSubmit(false);
    }

  }, [nameError, emailError, passwordError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signIn('register', {
        name,
        email,
        password,
        callbackUrl: '/me'
      });
    } catch (e) {
      console.error(e);
    }
  }

  const handleNameChange = (e: any) => {
    const value: string = e.target.value;

    setName(value);

    if (value.length >= 3) {
      setNameError({ error: false });
    } else {
      setNameError({
        error: true,
        text: 'Name should contain at least 3 characters'
      })
    }
  }

  const handleEmailChange = (e: any) => {
    const value: string = e.target.value;

    setEmail(value);

    if (validateEmail(value)) {
      setEmailError({ error: false });
    } else {
      setEmailError({
        error: true,
        text: 'Invalid email format'
      });
    }
  }

  const handlePasswordChange = (e: any) => {
    const value: string = e.target.value;

    setPassword(value);

    if (value.length >= 6) {
      setPasswordError({ error: false });
    } else {
      setPasswordError({
        error: true,
        text: 'Password should contain at least 6 characters'
      })
    }
  }

  const signUpWithGithub = () => {
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
        <GithubButton onClick={signUpWithGithub}>Sign up with github</GithubButton>
        <div style={{ textAlign: 'center', marginTop: 16, marginBottom: 6 }}>&mdash; OR &mdash;</div>
        <Typography component="h1" variant="h5" sx={{ color: '#24185b' }}>
          Create account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="text"
            label="Your name"
            name="name"
            autoComplete="name"
            autoFocus
            error={nameError?.error}
            helperText={nameError?.text}
            value={name}
            onChange={e => handleNameChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={emailError?.error}
            helperText={emailError?.text}
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
            error={passwordError?.error}
            helperText={passwordError?.text}
            value={password}
            onChange={e => handlePasswordChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            disabled={disabledSubmit}>
            Create
          </Button>
          <div style={{ textAlign: 'right', marginTop: 8 }}>
            <Link href="/auth/signin" style={{ color: '#24185b' }}>
              Already have an account? Log in
            </Link>
          </div>
        </Box>
      </Box>
    </Container>
  );
}