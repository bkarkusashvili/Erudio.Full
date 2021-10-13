import React from 'react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Grid, Stack, Typography, Button } from '@mui/material';
import { useForm } from '@inertiajs/inertia-react';
import { Field } from './Components';

const Edit = ({ model, data, fields }) => {
    const initForm = {};
    fields.forEach(field => field.list
        .forEach(item => initForm[item.name] = data[item.name])
    );

    const { post, errors, processing, data: formData, setData } = useForm(initForm);

    const submit = () => post(route(`${model}.store`));

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
                                <Field key={key} data={item} error={errors[item.name]} value={formData[item.name]} setChange={setData} />
                            ))}
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </AdminLayout>
    );
};

export default Edit;
