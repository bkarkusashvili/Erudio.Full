import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, Stack, TextField } from '@mui/material';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';

import { AdminLayout } from '@/Layouts/AdminLayout';
import { DataGrid } from '@/Components';

const getParam = name => route().params[name] || null;

const List = ({ rows, columns, model, paginate, search = [] }) => {
    const initForm = {};
    search = search.map(item => ({ ...item, value: getParam(item.name) }));
    search.forEach(item => initForm[item.name] = item.value);

    const [page, setPage] = useState(paginate.page);
    const pageChange = (e, value) => setPage(value);

    const isSelect = item => item.type === 'select';

    const { setData, get, processing } = useForm(initForm);

    const submit = () => get(route(`${model}.index`));

    return (
        <AdminLayout>
            {!!search.length && (
                <Stack spacing={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack spacing={2} direction={'row'} marginBottom={2}>
                        {search.map((item, key) =>
                            <React.Fragment key={key}>
                                {isSelect(item) ?
                                    <FormControl style={{ width: 200 }}>
                                        <InputLabel children={item.label} />
                                        <Select
                                            label={item.label}
                                            defaultValue={item.value}
                                            onChange={e => setData(item.name, e.target.value)}
                                        >
                                            {item.options.map((option, opKey) =>
                                                <MenuItem
                                                    key={opKey}
                                                    value={option.value}
                                                    children={option.text}
                                                />
                                            )}
                                        </Select>
                                    </FormControl>
                                    :
                                    <TextField
                                        label={item.label}
                                        defaultValue={item.value}
                                        type={item.type}
                                        onChange={e => setData(item.name, e.target.value)}
                                    />
                                }
                            </React.Fragment>
                        )}
                    </Stack>
                    <Stack spacing={2} direction={'row'}>
                        <Button
                            disabled={processing}
                            onClick={() => submit()}
                            variant="contained"
                            children="გაფილტვრა"
                        />
                        <Button
                            disabled={processing}
                            href={route(`${model}.index`)}
                            LinkComponent={Link}
                            variant="outlined"
                            children="გასუფთავება"
                        />
                        <Button
                            disabled={processing}
                            href={route(`${model}.export`)}
                            variant="contained"
                            children="გადმოწერა"
                        />
                    </Stack>
                </Stack>
            )}
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
                            href={route(`${model}.index`, { ...route().params, page: item.page })}
                            {...item}
                        />
                    }
                />
            )}
        </AdminLayout>
    );
};

export default List;
