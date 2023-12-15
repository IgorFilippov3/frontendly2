'use client';

import React from 'react';
import './part-header.css';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';
import { PartDropdown } from './part-dropdown';
import { toggle } from './state/task-open.slice';
import { useAppDispatch } from './state/hooks';
import { PartShortInfo } from '@/_core/models/part/part-short-info.model';

interface PartHeaderProps {
  name: string;
  parts: PartShortInfo[];
}

export const PartHeader = ({ name, parts }: PartHeaderProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const toggleTask = () => {
    dispatch(toggle());
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
      <PartDropdown name={name} parts={parts} />
    </header>
  );
};