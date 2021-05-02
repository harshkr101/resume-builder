import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormSection from '../common/FormSection';

export default function Skill({ resume }) {

    const skill = {
        skillName: '',
        keywords: ['']
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Skills
            </Typography>
            <FormSection input={skill} name="Skill" section="skills" resume={resume} />
        </React.Fragment>
    );
}