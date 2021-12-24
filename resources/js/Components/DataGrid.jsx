import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, usePage } from '@inertiajs/inertia-react';
import { IconButton, Dialog, DialogTitle, DialogActions, Button, Checkbox } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useForm } from '@inertiajs/inertia-react'

export const DataGrid = ({ rows, columns, model }) => {
    const isCheckbox = column => column.type === 'checkbox';

    const getValue = (column, row) => column.relation ? row[column.relation][column.field] : row[column.field];

    // const [open, setOpen] = useState(false);
    // const [id, setId] = useState();
    // const { delete: destroy } = useForm();

    // const handleOpen = id => {
    //     setOpen(true);
    //     setId(id);
    // };
    // const handleClose = () => setOpen(false);
    // const handleDelete = () => {
    //     destroy(route(`${model}.destroy`, id));
    //     handleClose();
    // };
    const { actions } = usePage().props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column, key) => (
                            <TableCell
                                key={key}
                                align={key === 0 ? 'left' : 'right'}
                                width={column.width}
                                style={{ fontWeight: 'bold' }}
                            >
                                {column.headerName}
                            </TableCell>
                        ))}
                        {(actions.edit || actions.delete) && (
                            <TableCell align={'right'} style={{ fontWeight: 'bold' }}>
                                მოქმედება
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {columns.map((column, key) => (
                                <TableCell
                                    key={key}
                                    align={key === 0 ? 'left' : 'right'}
                                >
                                    {
                                        isCheckbox(column) ?
                                            <Checkbox readOnly checked={!!getValue(column, row)} /> :
                                            getValue(column, row)
                                    }
                                </TableCell>
                            ))}
                            {(actions.edit || actions.delete) && (
                                <TableCell align="right">
                                    {actions.edit && (
                                        <Link href={route(`${model}.edit`, row.id)}>
                                            <IconButton color={'success'} edge={'end'} children={<Edit />} />
                                        </Link>
                                    )}
                                    {actions.delete && (
                                        <Link href={route(`${model}.destroy`, row.id)} method={'delete'}>
                                            <IconButton
                                                // onClick={() => handleOpen(row.id)}
                                                color={'error'}
                                                edge={'end'}
                                                children={<Delete />}
                                            />
                                        </Link>
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* <Dialog open={open} onClose={handleClose}>
                <DialogTitle children="მონაცემის წაშლა" />
                <DialogActions>
                    <Button onClick={handleClose} children="გაუქმება" />
                    <Button onClick={handleDelete} children="წაშლა" color={'error'} autoFocus />
                </DialogActions>
            </Dialog> */}
        </TableContainer>
    );
}
