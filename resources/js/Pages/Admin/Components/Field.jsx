import React, { useState } from 'react';
import { FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { Button } from '@mui/material';
import { usePage } from '@inertiajs/inertia-react';
import { getInputName } from '@/Helper';

// import { createReactEditorJS } from 'react-editor-js'
// const ReactEditorJS = createReactEditorJS()

export const Field = ({ data, error, value = null, setChange }) => {
    const { base } = usePage().props;
    const [image, setImage] = useState(value ? `${base}/storage/${value}` : '');
    const isMultiline = data.type === 'textarea';
    const isFile = data.type === 'file';
    const isImage = data.type === 'image';
    const isToggle = data.type === 'toggle';
    const isSelect = data.type === 'select';
    const isDate = data.type === 'date';

    const fileChange = (e) => {
        const file = e.target.files[0];
        setChange(getInputName(data), file);

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
    ) : isSelect ? (
        <FormControl fullWidth error={!!error}>
            <InputLabel>{data.label}</InputLabel>
            <Select
                disabled={data.disabled}
                defaultValue={value}
                label={data.label}
                onChange={e => setChange(getInputName(data), e.target.value)}
            >
                {data.options?.map(option => <MenuItem value={option.value} children={option.text} />)}
            </Select>
            <FormHelperText children={error} />
        </FormControl>
    ) : isDate ? (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
                disabled={data.disabled}
                label="თარიღი"
                value={value}
                onChange={value => setChange(getInputName(data), value.toDate())}
                renderInput={params => <TextField {...params} />}
            />
        </LocalizationProvider>
    ) : isToggle ? (
        <FormControlLabel
            style={{ marginLeft: 0 }}
            disabled={data.disabled}
            control={
                <Switch
                    onChange={e => setChange(getInputName(data), e.target.checked)}
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
            onChange={e => setChange(getInputName(data), e.target.value)}
            multiline={isMultiline}
            minRows={3}
            fullWidth
        />
    );
};
