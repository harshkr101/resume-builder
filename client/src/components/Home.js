import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchData, setData } from '../redux/actionCreators';
import { isArray } from 'lodash';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        textAlign: 'center'
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/800x450/?resume)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '66vh',
        margin: '0'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
    },
    button: {
        margin: theme.spacing(2),
        minWidth: 160,
    }
}));

const Home = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [title, setTitle] = React.useState('');

    console.log(props.data)

    React.useEffect(() => {
        if (props.token) {
            props.fetchData(props.token, function () {
                //history.push("/dashboard")
            })
        }
    }, [])

    const handleChange = (event) => {
        setTitle(event.target.value);
        props.setData(event.target.value, function () {
            console.log(event.target.value)
            history.push("/dashboard")
        })
    };

    const handleClick = () => {
        console.log(-1)
        props.setData(-1, function () {
            history.push("/dashboard")
        })
    };

    return (
        <div className={classes.root}>
            <img xs={false} sm={4} md={7} className={classes.image} alt-text="resume" />
            <Button onClick={handleClick} className={classes.button} variant="contained" color="primary">
                Let's Start
            </Button>
            {(props.token && isArray(props.data)) ?
                (
                    <React.Fragment>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Saved Resumes</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={title}
                                onChange={handleChange}
                                label="Saved Resumes"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    props.data.map((resume, idx) => {
                                        return (
                                            <MenuItem id={idx}
                                                name={resume.title}
                                                value={idx}
                                                onChange={handleChange}
                                            >
                                                {resume.title}
                                            </MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>
                    </React.Fragment>
                ) :
                (
                    <div></div>
                )
            }
        </div>
    )

}

const mapStateToProps = state => {
    return {
        token: state.resume.token,
        data: state.resume.data
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: (props, callback) => { dispatch(fetchData(props, callback)) },
    setData: (props, callback) => { dispatch(setData(props, callback)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);