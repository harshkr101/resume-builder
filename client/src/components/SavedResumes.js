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
    cardGrid: {
        marginTop: theme.spacing(4),
        marginLeft: '15%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

    React.useEffect(() => {
        props.fetchData(props.token, function () {
            //history.push("/builder")
        })
    }, [])

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
    setData: (props, callback) => { dispatch(setData(props, callback)) },
    deleteData: (token, resume) => { dispatch(deleteData(token, resume)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);