import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SortDropdownProp {
  options: Option[];
}

const SortDropdown = ({ options }: SortDropdownProp) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    const value = event.target.value;
    const newValue = typeof value === 'string' ? [value] : value;

    setSelectedOptions(newValue);
  };

  return (
    <FormControl fullWidth>
      <Select
        displayEmpty
        value={selectedOptions}
        onChange={handleChange}
        onClose={handleClose}
        onOpen={handleOpen}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <>
                <span className='placeholder'>No.of Votes</span>
              </>
            );
          }

          return selected;
        }}
        MenuProps={{
          PaperProps: {
            style: {
              boxShadow: 'none',
              borderRadius: ' 0 0 4px 4px',
              border: '1px solid #E9EDEE',
              borderTop: open ? '0' : 'inherit',
              padding: '8px 0',
            },
          },
          MenuListProps: {
            style: {
              padding: '0',
              boxShadow: 'none',
            },
          },
        }}
        IconComponent={SelectIcon}
        sx={{
          fontFamily: 'Figtree-SemiBold, sans-serif',
          fontWeight: '600',
          fontSize: '12px',
          lineHeight: '1.5',
          color: 'var(--input-color)',
          background: 'var(--primary-color)',
          border: '1px solid #E9EDEE',
          borderBottom: open ? '0' : 'inherit',
          borderRadius: open ? '4px 4px 0 0' : '4px',
          boxSizing: 'border-box',
          fieldset: {
            display: 'none',
          },

          '.placeholder': {
            opacity: '0.2',
          },

          '>.MuiList': {
            border: '1px solid #E9EDEE',
          },
          '> .MuiSelect-select': {
            padding: '7px 3px 7px 11px!important',
          },
          svg: {
            position: 'absolute',
            right: '4px',
          },
        }}
      >
        {/* <MenuItem disabled value=''>
          No. of Votes
        </MenuItem> */}
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disableRipple
            sx={{
              fontFamily: 'Figtree-Medium',
              fontWeight: '500',
              fontSize: '12px',
              lineHeight: '18px',
              color: 'rgba(29, 36, 79, 0.3)',
              padding: '0 12px',
              background: 'var(--primary-color)',
              '&:not(:first-of-type)': {
                marginTop: '8px',
              },

              '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                color: 'rgba(29, 36, 79, 1)',
                background: 'transparent',
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const SelectIcon = () => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.66797 6.66406L8.0013 9.9974L11.3346 6.66406H4.66797Z'
        fill='#1D244F'
      />
    </svg>
  );
};

export default SortDropdown;
