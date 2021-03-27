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

export default function EducationForm() {

    const blankSchool = {
        university: "",
        degree: "",
        startDate: "",
        endDate: "",
        gpa: ""
    };

    const [school, setSchool] = useState([
        { ...blankSchool },
    ]);

    const addSchool = () => {
        setSchool([...school, { ...blankSchool }]);
        console.log(school);
    };

    const handleSchoolChange = (e) => {
        const updatedSchools = [...school];
        updatedSchools[e.target.dataset.idx][e.target.name] = e.target.value;
        setSchool(updatedSchools);
    };

    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Educational Details
            </Typography>
            <Button onClick={addSchool}
                variant="contained"
                color="primary"
                className={classes.button}
            >
                Add School
            </Button>
            {
                school.map((val, idx) => {

                    const university = `university-${idx}`;
                    const degree = `degree-${idx}`;
                    const startDate = `startDate-${idx}`;
                    const endDate = `endDate-${idx}`;
                    const gpa = `gpa-${idx}`;

                    return (
                        <div key={`school-${idx}`}>
                            <hr className={classes.line}></hr>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        id={university}
                                        className="university"
                                        name="university"
                                        label="University"
                                        value={school[idx].university}
                                        inputProps={{
                                            'data-idx': idx
                                        }}
                                        onChange={handleSchoolChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id={degree}
                                        className="degree"
                                        data-idx={idx}
                                        name="degree"
                                        label="Degree"
                                        value={school[idx].degree}
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
                                        className="startDate"
                                        data-idx={idx}
                                        name="startDate"
                                        label="Start Date"
                                        value={school[idx].startDate}
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
                                        className="endDate"
                                        data-idx={idx}
                                        name="endDate"
                                        label="End Date"
                                        value={school[idx].endDate}
                                        inputProps={{
                                            'data-idx': idx
                                        }}
                                        onChange={handleSchoolChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id={gpa}
                                        className="gpa"
                                        data-idx={idx}
                                        name="gpa"
                                        label="GPA"
                                        value={school[idx].gpa}
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