import React from 'react';
import CheckIcon from '@mui/icons-material/Check';

export const Checkmark = ({ checked, onClick }) => {

    return (
        <i
            className="checkmark"
            children={checked && <CheckIcon />}
            onClick={onClick}
        />
    );
};
