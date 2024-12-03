"use client"

import { GridRowModel } from '@mui/x-data-grid-premium';
import { format } from 'date-fns';

export function exportToCSV(rows: GridRowModel[], filename: string = 'data-export') {
  // Format the rows for CSV
  const headers = [
    'ID',
    'Desk',
    'Commodity',
    'Trader Name',
    'Trader Email',
    'Quantity',
    'Status',
    'Month',
    'Created At',
    'Last Modified'
  ];

  const csvContent = [
    // Headers
    headers.join(','),
    // Data rows
    ...rows.map(row => [
      row.id,
      `"${row.desk || ''}"`,
      `"${row.commodity || ''}"`,
      `"${row.traderName || ''}"`,
      `"${row.traderEmail || ''}"`,
      row.quantity,
      `"${row.status || ''}"`,
      `"${row.month || ''}"`,
      row.createdAt ? `"${format(new Date(row.createdAt), 'MM/dd/yyyy HH:mm:ss')}"` : '',
      row.lastModified ? `"${format(new Date(row.lastModified), 'MM/dd/yyyy HH:mm:ss')}"` : ''
    ].join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToExcel(rows: GridRowModel[], filename: string = 'data-export') {
  // Convert data to Excel-compatible CSV format
  const headers = [
    'ID',
    'Desk',
    'Commodity',
    'Trader Name',
    'Trader Email',
    'Quantity',
    'Status',
    'Month',
    'Created At',
    'Last Modified'
  ];

  const excelContent = [
    // Excel UTF-8 BOM
    '\ufeff' +
    // Headers
    headers.join(','),
    // Data rows
    ...rows.map(row => [
      row.id,
      `"${row.desk || ''}"`,
      `"${row.commodity || ''}"`,
      `"${row.traderName || ''}"`,
      `"${row.traderEmail || ''}"`,
      row.quantity,
      `"${row.status || ''}"`,
      `"${row.month || ''}"`,
      row.createdAt ? `"${format(new Date(row.createdAt), 'MM/dd/yyyy HH:mm:ss')}"` : '',
      row.lastModified ? `"${format(new Date(row.lastModified), 'MM/dd/yyyy HH:mm:ss')}"` : ''
    ].join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}.xls`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}