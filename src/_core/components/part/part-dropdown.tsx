'use client';

import './part-dropdown.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { PartShortInfo } from '@/_core/models/part/part-short-info.model';
import { useRouter } from 'next/navigation';

interface PartDropdownProps {
  name: string;
  parts: PartShortInfo[];
}

export const PartDropdown = ({ name, parts }: PartDropdownProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = (order: number) => {
    const { pathname } = window.location;
    const url = pathname.split('/').slice(0, 3).join('/');
    router.push(`${url}/${order}`);
  }

  const renderMenuItems = (parts: PartShortInfo[]) => {
    return parts.map(p => {
      return (
        <MenuItem key={p.id} onClick={() => navigate(p.order)}>{p.name}</MenuItem>
      );
    })
  }

  return (
    <div>
      <h1
        className="page-title"
        onClick={handleClick}>{name}
      </h1>
      <Menu
        classes={{
          list: 'dropdown-list'
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {renderMenuItems(parts)}
      </Menu>
    </div>
  );
}