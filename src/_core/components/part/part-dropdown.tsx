
import './part-dropdown.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { PartContextType, usePart } from './part-provider';
import { PartShortInfo } from '@/_core/models/part/part-short-info.model';

export const PartDropdown = ({ name }: { name: string }) => {
  const ctx: PartContextType | null = usePart();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = (id: number) => {
    ctx?.navigateToPart(id);
  }

  const renderMenuItems = (parts: PartShortInfo[]) => {
    return parts.map(p => {
      return (
        <MenuItem key={p.id} onClick={() => navigate(p.id)}>{p.name}</MenuItem>
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
        {/* {renderMenuItems(ctx?.parts!)} */}
      </Menu>
    </div>
  );
}