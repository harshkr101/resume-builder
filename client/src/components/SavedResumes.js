import React from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { fetchData, setData, deleteData } from '../redux/actionCreators';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(4)
    },
    container: {
        maxWidth: '40%',
        marginLeft: '30%',
        marginRight: '0',
        display: 'inline-block',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            marginLeft: 'unset',
        },
    },
    paper: {
        //marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        display: 'inline-block',
        width: '48%'
    },
    actions: {
        marginLeft: '33px',
        display: 'inline-block'
    }
}));


const Dashboard = (props) => {
    const classes = useStyles();
    const history = useHistory();

    React.useEffect(() => {
        props.fetchData(props.token, function () {
            //history.push("/builder")
        })
    }, []) //eslint-disable-line

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

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs" className={classes.container}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" className={classes.title}>
                        Saved Resumes
                </Typography>
                    <Grid container spacing={8}>
                        {(props.resume.data.length) && props.resume.data.map((item, id) => (
                            <Grid item key={id} md={12} >
                                <Card className={classes.card} color="secondary">
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.title}
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
                </div>
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
    setData: (props, callback) => { dispatch(setData(props, callback)) },
    deleteData: (token, resume) => { dispatch(deleteData(token, resume)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);