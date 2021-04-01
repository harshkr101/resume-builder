import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormSection from '../../common/FormSection';

export default function Project() {

    const project = {
        projectName: '',
        keywords: '',
        projectDescription: '',
        projectLink: ''
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
