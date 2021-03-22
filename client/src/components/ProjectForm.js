import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function ProjectForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Project Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id="projectName"
                        name="projectName"
                        label="Project Name"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="keywords"
                        name="keywords"
                        label="Related Keywords"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="projectDescription"
                        name="projectDescription"
                        label="Project Description"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="projectLink"
                        name="projectLink"
                        label="Project Link"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
