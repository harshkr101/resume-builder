import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormSection from '../common/FormSection';

export default function ProjectForm() {

    const project = {
        title: "",
        organisation: "",
        startDate: "",
        endDate: "",
        description: ""
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Project Details
            </Typography>
            <FormSection input={project} name="Project" />
        </React.Fragment>
    );
}
