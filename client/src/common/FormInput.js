import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

var _ = require('lodash');

export default function FormSection(props) {

    const handleSchoolChange = (e) => {
        const updatedSection = [...props.section];
        updatedSection[props.id][e.target.name] = e.target.value;
        props.setSection(updatedSection);
    };

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {
                    Object.entries(props.input).map((name, idx) => {

                        return (
                            <Grid item xs={12}>
                                <TextField
                                    id={name}
                                    name={name}
                                    label={_.startCase(name[0])}
                                    value={props.section[props.id].name}
                                    onChange={handleSchoolChange}
                                    fullWidth
                                />
                            </Grid>
                        );
                    })
                }
            </Grid>
        </React.Fragment>
    );

}
