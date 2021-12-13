import React, { useState } from 'react';
import { Divider, FormControl, FormControlLabel, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { Button } from '@mui/material';
import { usePage } from '@inertiajs/inertia-react';
import { AddCircleOutlineOutlined } from '@mui/icons-material';

// import { createReactEditorJS } from 'react-editor-js'
// const ReactEditorJS = createReactEditorJS()

export const Field = ({ data, error, value = null, setChange }) => {
    const { base } = usePage().props;
    const [image, setImage] = useState(value ? `${base}/storage/${value}` : '');
    const [dateValue, setDateValue] = useState(value);
    const isMultiline = data.type === 'textarea';
    const isFile = data.type === 'file';
    const isImage = data.type === 'image';
    const isToggle = data.type === 'toggle';
    const isSelect = data.type === 'select';
    const isDate = data.type === 'date';
    const isGroup = data.type === 'group';

    const updateData = value => setChange(prev => {
        if (data.relation) {
            prev[data.relation][data.name] = value;
        } else {
            prev[data.name] = value;
        }

        return { ...prev };
    });

    const fileChange = (e) => {
        const file = e.target.files[0];
        updateData(file);

        setImage(URL.createObjectURL(file));
    };

    return isImage ? (
        <div className="image-input-wrap">
            <img src={image} />
            <Button variant="contained" onClick={e => e.target.nextSibling.click()} children="არჩევა" />
            <input type="file" onChange={fileChange} hidden />
        </div>
    ) : isFile ? (
        <TextField
            disabled={data.disabled}
            variant="outlined"
            error={!!error}
            helperText={error}
            type={data.type}
            onChange={fileChange}
            fullWidth
        />
    ) : isGroup ? (
        <>
            {data.divider === 'top' && <Divider />}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant={'subtitle1'} component="h3" children={data.title} />
                <IconButton color={'primary'} onClick={() => addGroup(data.name, data.list)} children={<AddCircleOutlineOutlined />} />
            </Stack>
            {data.list.map((item, key) =>
                <Field key={key} data={item} />
            )}
            {data.divider === 'top' && <Divider />}
        </>
    ) : isSelect ? (
        <FormControl fullWidth error={!!error}>
            <InputLabel>{data.label}</InputLabel>
            <Select
                disabled={data.disabled}
                defaultValue={value}
                label={data.label}
                onChange={e => updateData(e.target.value)}
            >
                {data.options?.map(option => <MenuItem value={option.value} children={option.text} />)}
            </Select>
            <FormHelperText children={error} />
        </FormControl>
    ) : isDate ? (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
                disabled={data.disabled}
                label={data.label}
                value={dateValue}
                onChange={moment => {
                    setDateValue(moment);
                    updateData(moment.format("YYYY-MM-DD HH:mm:ss"));
                }}
                renderInput={params =>
                    <TextField
                        {...params}
                        error={!!error}
                        helperText={error}
                    />}
            />
        </LocalizationProvider>
    ) : isToggle ? (
        <FormControlLabel
            style={{ marginLeft: 0 }}
            disabled={data.disabled}
            control={
                <Switch
                    onChange={e => updateData(e.target.checked)}
                    defaultChecked={!!value}
                />
            }
            label={data.label}
        />
    ) : (
        <TextField
            disabled={data.disabled}
            variant="outlined"
            label={data.label}
            error={!!error}
            helperText={error}
            defaultValue={value}
            type={data.type}
            onChange={e => updateData(e.target.value)}
            multiline={isMultiline}
            minRows={3}
            fullWidth
        />
    );
};
