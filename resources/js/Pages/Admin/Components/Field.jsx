import React from 'react';
import { TextField } from '@mui/material';

export const Field = ({ data, error, value, setChange }) => {
    const isMultiline = data.type === 'textarea';

    return (
        <TextField
            variant="outlined"
            label={data.label}
            error={!!error}
            helperText={error}
            defaultValue={value}
            onChange={e => setChange(data.name, e.target.value)}
            multiline={isMultiline}
            minRows={3}
            fullWidth
        />
    );
};
