import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormSection from '../common/FormSection';

export default function Experience({ resume }) {

    const workEx = {
        title: "",
        organisation: "",
        startDate: "",
        endDate: "",
        description: [""]
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Experience Details
            </Typography>
            <FormSection input={workEx} name="Experience" section="experience" resume={resume} />
        </React.Fragment>
    );
}
