"use client"

import { useState } from 'react';
import { Box, TextField, Select, MenuItem, InputAdornment, Chip, OutlinedInput } from '@mui/material';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExportMenu } from './export-menu';

interface GridHeaderProps {
  onSearch: (value: string) => void;
  onYearChange: (years: string[]) => void;
  onReset: () => void;
  onSave: () => void;
  onCancel: () => void;
  onRefresh: () => void;
  onAddRecord: () => void;
  onExportCSV: () => void;
  onExportExcel: () => void;
  selectedYears: string[];
}

const YEARS = ['2024', '2023', '2022', '2021', '2020'];

export function GridHeader({
  onSearch,
  onYearChange,
  onReset,
  onSave,
  onCancel,
  onRefresh,
  onAddRecord,
  onExportCSV,
  onExportExcel,
  selectedYears,
}: GridHeaderProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  const handleYearChange = (event: any) => {
    const value = event.target.value as string[];
    onYearChange(value);
  };

  const handleResetAll = () => {
    setSearchValue('');
    onReset();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Action Buttons */}
      <Box sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        backgroundColor: '#1a1a1a',
        borderRadius: '8px 8px 0 0',
      }}>
        <Button
          onClick={onAddRecord}
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-medium"
        >
          <Plus className="mr-2 h-5 w-5" />
          ADD RECORD
        </Button>
        <ExportMenu onExportCSV={onExportCSV} onExportExcel={onExportExcel} />
      </Box>

      {/* Search and Filters */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        backgroundColor: '#1a1a1a',
      }}>
        <TextField
          placeholder="Keyword Search"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#2a2a2a',
              color: '#ffffff',
              '& fieldset': {
                borderColor: '#3a3a3a',
              },
              '&:hover fieldset': {
                borderColor: '#4a4a4a',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5a5a5a',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#ffffff',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-400" size={20} />
              </InputAdornment>
            ),
          }}
        />

        <Select
          multiple
          value={selectedYears}
          onChange={handleYearChange}
          input={<OutlinedInput />}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span style={{ color: '#9ca3af' }}>Select Years</span>;
            }
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip 
                    key={value} 
                    label={value}
                    sx={{ 
                      backgroundColor: '#4a4a4a',
                      color: '#ffffff',
                      '& .MuiChip-deleteIcon': {
                        color: '#ffffff',
                        '&:hover': {
                          color: '#ff4444',
                        },
                      },
                    }}
                  />
                ))}
              </Box>
            );
          }}
          sx={{
            minWidth: 200,
            backgroundColor: '#2a2a2a',
            color: '#ffffff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3a3a3a',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a4a4a',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#5a5a5a',
            },
            '& .MuiSvgIcon-root': {
              color: '#ffffff',
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#2a2a2a',
                color: '#ffffff',
                '& .MuiMenuItem-root': {
                  padding: '8px 16px',
                  '&.Mui-selected': {
                    backgroundColor: '#4a4a4a',
                  },
                  '&:hover': {
                    backgroundColor: '#3a3a3a',
                  },
                },
              },
            },
          }}
        >
          {YEARS.map((year) => (
            <MenuItem 
              key={year} 
              value={year}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#4a4a4a',
                },
                '&:hover': {
                  backgroundColor: '#3a3a3a',
                },
              }}
            >
              {year}
            </MenuItem>
          ))}
        </Select>

        <Button
          onClick={handleResetAll}
          variant="outline"
          className="text-white border-gray-600 hover:bg-gray-700"
        >
          Reset All Filters
        </Button>

        <Button
          onClick={onSave}
          className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
        >
          Save Table
        </Button>

        <Button
          onClick={onCancel}
          className="bg-pink-500 hover:bg-pink-600 text-white"
        >
          Cancel
        </Button>

        <Button
          onClick={onRefresh}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Refresh
        </Button>
      </Box>
    </Box>
  );
}