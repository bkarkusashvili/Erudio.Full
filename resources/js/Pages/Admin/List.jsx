import React, { useState } from 'react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { DataGrid } from '@/Components';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from '@inertiajs/inertia-react';

const List = ({ rows, columns, model, paginate }) => {
    const [page, setPage] = useState(paginate.page);

    const pageChange = (e, value) => {
        setPage(value);
    };

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
            {paginate.count > 1 && (
                <Pagination
                    style={{ marginTop: '30px' }}
                    page={page}
                    count={paginate.count}
                    onChange={pageChange}
                    color="primary"
                    renderItem={(item) =>
                        <PaginationItem
                            component={Link}
                            href={route(`${model}.index`, { page: item.page })}
                            {...item}
                        />
                    }
                />
            )}
        </AdminLayout>
    );
};

export default List;
