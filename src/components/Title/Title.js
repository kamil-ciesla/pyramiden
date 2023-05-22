import React, { useState } from 'react';
import { Card, CardContent, Typography, Input } from '@mui/material';

export const Title = (props) => {
    const [isEditable, setIsEditable] = useState(false);

    const handleClick = () => {
        setIsEditable(true);
    };

    const handleBlur = () => {
        setIsEditable(false);
    };

    const handleChange = (event) => {
        props.onUpdate(event.target.value);
    };

    return (
        <Card>
            <CardContent >
                {isEditable ? (
                    <Input value={props.title} onBlur={handleBlur} onChange={handleChange} />
                ) : (
                    <Typography variant="h4" onClick={handleClick}>
                        {props.title}
                    </Typography>
                )}
            </CardContent>
        </Card>

    );
};
