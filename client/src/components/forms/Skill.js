import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormSection from '../../common/FormSection';

export default function Skill() {

    const skill = {
        skillName: '',
        keywords: ''
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Skills
            </Typography>
            <FormSection input={skill} name="Skill" />
        </React.Fragment>
    );
}