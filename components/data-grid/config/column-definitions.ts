export const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', width: 110, editable: true, type: 'number' },
  { field: 'email', headerName: 'Email', width: 200, editable: true },
  { field: 'role', headerName: 'Role', width: 150, editable: true },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 130, 
    editable: true,
    type: 'singleSelect',
    valueOptions: ['Activate', 'Deactivate']
  },
  {
    field: 'month',
    headerName: 'Month',
    width: 130,
    editable: true,
    type: 'singleSelect',
    valueOptions: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 180,
    editable: false,
    type: 'dateTime',
  },
  {
    field: 'lastModified',
    headerName: 'Last Modified',
    width: 180,
    editable: false,
    type: 'dateTime',
  }
];