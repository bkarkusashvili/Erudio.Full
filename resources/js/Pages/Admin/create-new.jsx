import React, { useEffect } from 'react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Grid, Stack, Typography, Button, Divider, IconButton } from '@mui/material';
import { useForm } from '@inertiajs/inertia-react';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { Field } from './Components/Field';

const getFields = list => {
    const result = {};

    list.forEach(item => {
        let value = item.value || null;
        if (item.addMore) {
            value = [{
                text_ka: ''
            }];
        }

        result[item.name] = value;
    });

    return result;
};

const parseFields = fields => {
    const result = {};

    fields.forEach(field => Object.assign(result, getFields(field.list)));

    return result;
};

const Create = ({ model, fields }) => {
    const {
        post,
        errors,
        processing,
        data,
        setData
    } = useForm(parseFields(fields));

    useEffect(() => {
        // setData('days[0].text_ka', 1);
    }, []);

    const submit = () => {
        // console.log(data);
        post(
            route(`${model}.store`)
        )
    };

    const onchange = (value, name, group = null) => {
        setData(old => {
            const result = { ...old };

            if (group) {

            }

            result

            return result;
        });
    };

    const isGroup = type => type === 'group';
    const addGroup = (name, group) => {
        console.log(data, data[name]);
        data[name].push(getFields(group));
    };
    const getGroupInputs = data => (
        <>
            {data.divider === 'top' && <Divider />}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant={'subtitle1'} component="h3" children={data.title} />
                <IconButton color={'primary'} onClick={() => addGroup(data.name, data.list)} children={<AddCircleOutlineOutlined />} />
            </Stack>
            {getInputs(data.list, data)}
        </>
    );
    const getInputs = (list, group) => list.map((item, key) => isGroup(item.type) ?
        getGroupInputs(item) :
        <Field key={key} data={item} error={errors[item.name]} setChange={(value) => onchange(value, item.name, group)} />
    );


    return (
        <AdminLayout>
            {console.log(data)}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} mb={4}>
                <Typography variant="h4" component="h3" children="ახლის დამატება" />
                <Button variant="contained" onClick={submit} children="დამატება" disabled={processing} />
            </Stack>
            <Grid container spacing={2}>
                {fields.map((field, key) => (
                    <Grid item key={key} xs={field.size}>
                        <Stack spacing={2}>
                            {getInputs(field.list)}
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </AdminLayout>
    );
};

export default Create;
