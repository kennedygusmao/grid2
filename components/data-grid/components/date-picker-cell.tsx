"use client"

import { useState } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid-premium';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IconButton, Box } from '@mui/material';
import { CalendarIcon } from 'lucide-react';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: '#ffffff',
    backgroundColor: '#2a2a2a',
    borderRadius: '4px',
    border: '1px solid #3a3a3a',
    width: '100%',
    '&:hover': {
      borderColor: '#4a4a4a',
    },
    '&.Mui-focused': {
      borderColor: '#5a5a5a',
      boxShadow: '0 0 0 2px rgba(90, 90, 90, 0.2)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiIconButton-root': {
    color: '#ffffff',
    padding: '4px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  '& .MuiInputBase-input': {
    padding: '8px 12px',
    height: '20px',
    fontSize: '0.875rem',
  },
}));

interface DatePickerCellProps {
  params: GridRenderCellParams;
  onDateChange: (id: number, newDate: string) => void;
}

export function DatePickerCell({ params, onDateChange }: DatePickerCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const value = params.value ? dayjs(params.value) : null;

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      const isoString = newValue.toISOString();
      onDateChange(params.id as number, isoString);
    }
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          width: '100%',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
          padding: '4px 8px',
          borderRadius: '4px',
        }}
        onClick={() => setIsEditing(true)}
      >
        <span className="text-white">
          {value ? format(new Date(value.toString()), 'MM/dd/yyyy') : 'Select date'}
        </span>
        <IconButton 
          size="small" 
          sx={{ 
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <CalendarIcon size={16} />
        </IconButton>
      </Box>
    );
  }

  return (
    <StyledDatePicker
      value={value}
      onChange={handleDateChange}
      onClose={() => setIsEditing(false)}
      slotProps={{
        textField: {
          size: "small",
          fullWidth: true,
          autoFocus: true,
        },
        popper: {
          sx: {
            '& .MuiPaper-root': {
              backgroundColor: '#2a2a2a',
              color: '#ffffff',
              border: '1px solid #3a3a3a',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              '& .MuiPickersDay-root': {
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#3a3a3a',
                },
                '&.Mui-selected': {
                  backgroundColor: '#0ea5e9',
                  '&:hover': {
                    backgroundColor: '#0284c7',
                  },
                },
              },
              '& .MuiPickersCalendarHeader-root': {
                color: '#ffffff',
                '& .MuiIconButton-root': {
                  color: '#ffffff',
                },
              },
              '& .MuiDayCalendar-weekDayLabel': {
                color: '#9ca3af',
              },
              '& .MuiPickersYear-yearButton': {
                color: '#ffffff',
                '&.Mui-selected': {
                  backgroundColor: '#0ea5e9',
                },
              },
              '& .MuiPickersMonth-monthButton': {
                color: '#ffffff',
                '&.Mui-selected': {
                  backgroundColor: '#0ea5e9',
                },
              },
              '& .MuiPickersArrowSwitcher-button': {
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#3a3a3a',
                },
              },
              '& .MuiPickersCalendarHeader-label': {
                color: '#ffffff',
              },
            },
          },
        },
      }}
    />
  );
}