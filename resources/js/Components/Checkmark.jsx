import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { getClassName } from '@/Helper';

export const Checkmark = ({ checked, onClick }) => {

    return (
        <i
            className={getClassName({ checkmark: true })}
            children={checked && <CheckIcon />}
            onClick={onClick}
        />
    );
};
