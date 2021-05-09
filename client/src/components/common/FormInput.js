import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Description from './Description';
var _ = require('lodash');

export default function FormSection(props) {
    const handleChange = (e) => {
        const updatedSection = [...props.section];
        var keywords = e.target.value.split(',');
        updatedSection[props.id][e.target.name] = (e.target.name === 'keywords') ? keywords : e.target.value;
        props.update(updatedSection);
    };

    const inputAttributes = (item) => {
        const value = {
            type: 'text',
            shrink: false
        }
        if (item === 'date' || item === 'startDate' || item === 'endDate') {
            value.type = 'date'
            value.shrink = true
        }

        return value;
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {
                    Object.entries(props.input).map((name, idx) => {
                        return (
                            <Grid key={idx} item xs={12}>
                                {(name[0] === 'description' || name[0] === 'projectDescription') ?
                                    <Description
                                        section={props.name}
                                        index={props.id}
                                        name={name[0]}
                                    /> :
                                    <TextField
                                        id={Math.random().toString(36).substring(2, 7)}
                                        name={name[0]}
                                        label={(name[0] === 'keywords') ? (_.startCase(name[0]) + ' (separated by a `,`)') : _.startCase(name[0])}
                                        value={props.section[props.id][name[0]]}
                                        onChange={handleChange}
                                        type={inputAttributes(name[0]).type}
                                        InputLabelProps={{
                                            shrink: (inputAttributes(name[0]).type === 'date' ? true :
                                                props.section[props.id][name[0]] ? true : false),
                                            //color: props.section[props.id][name[0]].length < 3 ? 'primary' : 'secondary'
                                        }}
                                        fullWidth
                                    />
                                }
                            </Grid>
                        );
                    })
                }
            </Grid>
        </React.Fragment>
    );

}
