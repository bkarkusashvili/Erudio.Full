import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

export const Field = ({ data, error, value, setChange }) => {
    const [image, setImage] = useState(value ? `/storage/${value}` : '');
    const isMultiline = data.type === 'textarea';
    const isImage = data.type === 'file';

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
    ) : (
        <TextField
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
