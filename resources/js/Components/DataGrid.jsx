import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from '@inertiajs/inertia-react';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export const DataGrid = ({ rows, columns, model }) => {
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
                        <TableCell align={'right'} style={{ fontWeight: 'bold' }}>
                            მოქმედება
                        </TableCell>
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
                                    {row[column.field]}
                                </TableCell>
                            ))}
                            <TableCell align="right">
                                <Link href={route(`${model}.edit`, row.id)}>
                                    <IconButton color={'success'} edge={'end'} children={<Edit />} />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
