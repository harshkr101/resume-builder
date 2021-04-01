import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormSection from '../../common/FormSection';

export default function Education() {

    const school = {
        university: "",
        degree: "",
        startDate: "",
        endDate: "",
        gpa: ""
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Educational Details
            </Typography>
            <FormSection input={school} name="School" />
        </React.Fragment>
    );
}
