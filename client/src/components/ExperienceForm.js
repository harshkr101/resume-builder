import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function ExperienceForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Experience Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id="title"
                        name="title"
                        label="Job Title"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="organisation"
                        name="organisation"
                        label="Organisation"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="startDate"
                        name="startDate"
                        label="Start Date"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="endDate"
                        name="endDate"
                        label="End Date"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
