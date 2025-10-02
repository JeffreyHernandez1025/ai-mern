import * as React from 'react';
import useGetRecords from '../../hooks/useGetRecords';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import type { GridRowSelectionModel, GridColDef } from '@mui/x-data-grid';
import TableToolbar from './TableToolbar';

// columns of the data table
const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1
  },
  {
    field: 'primaryLanguage',
    headerName: 'Primary Language',
    flex: 1,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    flex: 1,
  },
  {
    field: 'grade',
    headerName: 'Grade',
    flex: .5,
  },
];

const DataTable: React.FC = () => {
  const { records } = useGetRecords() // student records retrieved from backend

  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>({ type: 'include', ids: new Set() }); // selected rows

  // prep student records for data display by adding an id property
  const rows = records.map((record: {}, i) => ({ ...record, id: i + 1 }))

  return (
    <Box sx={{
      height: '100%', width: '75%', border: 1,
      borderColor: 'divider',
      borderRadius: 1,
      overflow: 'hidden',
      bgcolor: 'background.paper',
    }}>
      <TableToolbar 
      selected={[...rowSelectionModel.ids]} 
      rows={rows} 
      onClearSelection={() => setRowSelectionModel({ type: 'include', ids: new Set() })}
      />
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            display: "none", // removes select all header (was buggy)
          },
          border: 0
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => setRowSelectionModel(newRowSelectionModel)}
        rowSelectionModel={rowSelectionModel}
        onRowClick={rowData => console.log(rowData.row)}
      />
    </Box>
  );
}

export default DataTable;