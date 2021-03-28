import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormSection from '../../common/FormSection';

export default function Achievement() {

    const achievement = {
        title: '',
        date: '',
        organisation: '',
        description: ''
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Achievement Details
            </Typography>
            <FormSection input={achievement} name="Achievement" />
        </React.Fragment>
    );
}