import React, { useState } from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { fetchData, setData, updateUser, deleteData } from '../redux/actionCreators';
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(4)
    },
    container: {
        maxWidth: '50%',
        marginLeft: '25%',
        marginRight: '0',
        display: 'inline-block',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            marginLeft: 'unset',
        },
    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    line: {
        height: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '35px',
        marginBottom: '20px',
        border: 'none',
        backgroundColor: theme.palette.primary.main,
        opacity: '0.75',
        width: '70%'
    },
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        textAlign: 'center'
    },
    card: {
        height: '100%',
        //display: 'inline-block',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    actions: {
        marginLeft: '33px'
    }
}));


const Dashboard = (props) => {
    const classes = useStyles();
    const history = useHistory();
    var base64Url = props.token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const user = JSON.parse(window.atob(base64));
    console.log(user)

    const [values, setValues] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    })

    React.useEffect(() => {
        props.fetchData(props.token, function () {
            //history.push("/builder")
        })
    }, [])

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }


    const handleEdit = (index) => {
        props.setData(index, function () {
            history.push("/builder")
        })
    };

    const callDelete = async (index) => {
        await props.deleteData(props.token, props.resume.data[index])
    }

    const handleDelete = (index) => {
        callDelete(index)
            .then(() => {
                props.fetchData(props.token, function () {
                    //history.push("/builder")  
                })
            })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        const user = {
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined,
            email: values.email || undefined,
        }
        //console.log(user, props.token)
        props.updateUser(user, props.token)
    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs" className={classes.container}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" className={classes.title}>
                        Personal Details
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="firstName"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    onChange={handleChange('firstName')}
                                    value={values.firstName}
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    onChange={handleChange('lastName')}
                                    value={values.lastName}
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lastName"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    onChange={handleChange('email')}
                                    value={values.email}
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={clickSubmit}
                        >
                            Update Details
                        </Button>
                    </form>
                </div>
            </Container>
            <hr className={classes.line}></hr>
            <Container className={classes.cardGrid} maxWidth="md">
                <Typography component="h1" variant="h5" className={classes.title}>
                    Saved Resumes
                </Typography>
                <Grid container spacing={4}>
                    {props.resume.data.map((item, id) => (
                        <Grid item key={id} xs={12} sm={6} md={4}>
                            <Card className={classes.card} color="secondary">
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.title}
                                    </Typography>
                                    <Typography>
                                        You can use this section to describe the content.
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.actions}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => { handleEdit(id) }}
                                        startIcon={<EditIcon />}
                                    >
                                        Edit
                                </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={() => { handleDelete(id) }}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    )

}

const mapStateToProps = state => {
    return {
        resume: state.resume,
        token: state.resume.token
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: (props, callback) => { dispatch(fetchData(props, callback)) },
    updateUser: (user, token) => { dispatch(updateUser(user, token)) },
    setData: (props, callback) => { dispatch(setData(props, callback)) },
    deleteData: (token, resume) => { dispatch(deleteData(token, resume)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);