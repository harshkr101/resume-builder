import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormSection from '../common/FormSection';

export default function Project({ resume }) {

    const project = {
        projectName: '',
        keywords: '',
        projectLink: '',
        projectDescription: [''],
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Project Details
            </Typography>
            <FormSection input={project} name="Project" section="projects" resume={resume} />
        </React.Fragment>
    );
}
