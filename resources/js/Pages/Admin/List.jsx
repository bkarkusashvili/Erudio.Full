import React from 'react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { DataGrid } from '@/Components';

const List = ({ rows, columns, model }) => {
    return (
        <AdminLayout>
            <DataGrid
                model={model}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </AdminLayout>
    );
};

export default List;
