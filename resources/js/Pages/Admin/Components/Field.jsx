import React, { useState } from 'react';
import { FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { Button } from '@mui/material';
import { usePage } from '@inertiajs/inertia-react';

export const Field = ({ data, error, value = null, setChange }) => {
    const { base } = usePage().props;
    const [image, setImage] = useState(value ? `${base}/storage/${value}` : '');
    const isMultiline = data.type === 'textarea';
    const isImage = data.type === 'file';
    const isToggle = data.type === 'toggle';
    const isSelect = data.type === 'select';
    const isDate = data.type === 'date';

    const imageChange = (e) => {
        const file = e.target.files[0];
        setChange(data.name, file);

        setImage(URL.createObjectURL(file));
    };

    return isImage ? (
        <div className="image-input-wrap">
            <img src={image} />
            <Button variant="contained" onClick={e => e.target.nextSibling.click()} children="არჩევა" />
            <input type={data.type} onChange={imageChange} hidden />
        </div>
    ) : isSelect ? (
        <FormControl fullWidth error={!!error}>
            <InputLabel>{data.label}</InputLabel>
            <Select
                disabled={data.disabled}
                defaultValue={value}
                label={data.label}
                onChange={e => setChange(data.name, e.target.value)}
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
                onChange={value => setChange(data.name, value.toDate())}
                renderInput={params => <TextField {...params} />}
            />
        </LocalizationProvider>
    ) : isToggle ? (
        <FormControlLabel
            style={{ marginLeft: 0 }}
            disabled={data.disabled}
            control={
                <Switch
                    onChange={e => setChange(data.name, e.target.checked)}
                    defaultChecked={value}
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
            onChange={e => setChange(data.name, e.target.value)}
            multiline={isMultiline}
            minRows={3}
            fullWidth
        />
    );
};
