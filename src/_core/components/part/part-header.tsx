'use client';

import React from 'react';
import './part-header.css';
import { PartContextType, usePart } from './part-provider';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';
import { PartDropdown } from './part-dropdown';

interface PartHeaderProps {
  name: string;
}

export const PartHeader = ({ name }: PartHeaderProps) => {
  const router = useRouter()
  const ctx: PartContextType | null = usePart();

  const toggleTask = () => {
    ctx?.toggleTaskOpen();
  }

  const navigateToMain = () => {
    router.push('/');
  }

  return (
    <header className="header">
      <div className="header-controls">
        <button
          className="btn"
          onClick={navigateToMain}>
          <HomeIcon sx={{ fontSize: 28 }} />
        </button>
        <button
          className="btn"
          onClick={toggleTask}>
          <MenuBookIcon sx={{ fontSize: 28 }} />
        </button>
      </div>
      <PartDropdown name={name} />
    </header>
  );
};