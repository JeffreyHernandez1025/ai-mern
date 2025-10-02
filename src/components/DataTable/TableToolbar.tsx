import React from "react";
import type { GridRowId } from '@mui/x-data-grid';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import useGetRecords from "../../hooks/useGetRecords";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface TableToolbarProps {
    selected: GridRowId[];
    rows: { id: number;[key: string]: any }[];
    onClearSelection?: () => void;
}

const TableToolbar: React.FC<TableToolbarProps> = (props) => {
    const { selected, rows, onClearSelection } = props;
    const { sendRecordID } = useGetRecords()
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function handleDelete(selected: GridRowId[], rows: { id: number;[key: string]: any }[]) {
        for (let i = 0; i < selected.length; i++) {
            const record = rows.find((row: { id: number }) => row.id === selected[i])

            if (record) {
                sendRecordID(record._id)
                onClearSelection?.()
                handleClose()
            }

        }
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(selected[0] && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{...style, width: 400 }}>
                    <h2>Are you sure?</h2>
                    <Button onClick={() => handleDelete(selected, rows)}> Delete </Button>
                    <Button onClick={handleClose}> Cancel </Button>
                </Box>
            </Modal>

            <Typography
                sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Student Records
            </Typography>
            {selected[0] ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handleOpen}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
}


export default TableToolbar;