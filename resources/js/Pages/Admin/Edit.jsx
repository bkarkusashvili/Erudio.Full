import React from 'react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Grid, Stack, Typography, Button } from '@mui/material';
import { useForm } from '@inertiajs/inertia-react';
import { Field } from './Components';
import { getInputName } from '@/Helper';

const Files = new Set(['file', 'image', 'video']);

const Edit = ({ model, data, fields }) => {
    const initForm = { _method: 'PUT' };
    fields.forEach(field => field.list
        .forEach(item => {
            const key = item.name;
            const value = Files.has(item.type) ? null : data[item.name];

            if (item.relation) {
                if (!initForm[item.relation]) {
                    initForm[item.relation] = {}
                }
                initForm[item.relation][key] = value;
            } else {
                initForm[key] = value;
            }
        })
    );

    const { post, errors, processing, data: formData, setData } = useForm(initForm);

    const submit = () => post(
        route(`${model}.update`, data.id)
    );
    const getError = item => errors[item.relation ? `${item.relation}.${item.name}` : item.name];

    return (
        <AdminLayout>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} mb={4}>
                <Typography variant="h4" component="h3" children="რედაქტირება" />
                <Button variant="contained" onClick={submit} children="განახლება" disabled={processing} />
            </Stack>
            <Grid container spacing={2}>
                {fields.map((field, key) => (
                    <Grid item key={key} xs={field.size}>
                        <Stack spacing={2}>
                            {field.list.map((item, key) => (
                                <Field key={key} data={item} error={getError(item)} value={data[item.name]} setChange={setData} />
                            ))}
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </AdminLayout>
    );
};

export default Edit;
