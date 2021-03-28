import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3),
    },
    line: {
        height: '10px',
        marginLeft: '0',
        marginRight: '0',
        marginTop: '35px',
        marginBottom: '35px',
        border: 'none',
        backgroundColor: theme.palette.primary.main,
        opacity: '0.75',
        width: '100%'
    }
}));

export default function ExperienceForm() {

    const blankWorkEx = {
        title: "",
        organisation: "",
        startDate: "",
        endDate: "",
        description: ""
    };

    const [workEx, setWorkEx] = useState([
        { ...blankWorkEx },
    ]);

    const addWorkEx = () => {
        setWorkEx([...workEx, { ...blankWorkEx }]);
        console.log(workEx);
    };

    const handleSchoolChange = (e) => {
        const updatedWorkEx = [...workEx];
        updatedWorkEx[e.target.dataset.idx][e.target.name] = e.target.value;
        setWorkEx(updatedWorkEx);
    };

    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Experience Details
            </Typography>
            <Button onClick={addWorkEx}
                variant="contained"
                color="primary"
                className={classes.button}
            >
                Work Ex
            </Button>
            {
                workEx.map((val, idx) => {

                    const title = `title-${idx}`;
                    const organisation = `organisation-${idx}`;
                    const startDate = `startDate-${idx}`;
                    const endDate = `endDate-${idx}`;
                    const description = `description-${idx}`;

                    return (
                        <div key={`workEx-${idx}`}>
                            <hr className={classes.line}></hr>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        id={title}
                                        name="title"
                                        label="Title"
                                        value={workEx[idx].title}
                                        inputProps={{
                                            'data-idx': idx
                                        }}
                                        onChange={handleSchoolChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id={organisation}
                                        name="organisation"
                                        label="Organisation"
                                        value={workEx[idx].organisation}
                                        inputProps={{
                                            'data-idx': idx
                                        }}
                                        onChange={handleSchoolChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id={startDate}
                                        data-idx={idx}
                                        name="startDate"
                                        label="Start Date"
                                        value={workEx[idx].startDate}
                                        inputProps={{
                                            'data-idx': idx
                                        }}
                                        onChange={handleSchoolChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id={endDate}
                                        data-idx={idx}
                                        name="endDate"
                                        label="End Date"
                                        value={workEx[idx].endDate}
                                        inputProps={{
                                            'data-idx': idx
                                        }}
                                        onChange={handleSchoolChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id={description}
                                        data-idx={idx}
                                        name="description"
                                        label="Description"
                                        value={workEx[idx].gpa}
                                        inputProps={{
                                            'data-idx': idx
                                        }}
                                        onChange={handleSchoolChange}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    );
                })
            }
        </React.Fragment>
    );
}
