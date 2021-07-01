import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Profile from './Profile';
import SavedResumes from './SavedResumes';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    menu: {
        // display: 'flex',
        // position: 'absolute'
        margin: 'auto',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        flexGrow: 1,
        borderRadius: theme.spacing(3)
    },
    menuPaper: {
        marginTop: theme.spacing(10),
        height: 'fit-content',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: '240px',
        display: 'none'
    },
    label: {
        fontWeight: '900'
    },
    line: {
        height: '10px',
        marginLeft: '25%',
        border: 'none',
        backgroundColor: theme.palette.primary.main,
        opacity: '0.75',
        width: '50%',
        textAlign: 'center'
    },

}));


const Dashboard = (props) => {
    const classes = useStyles();

    const [content, setContent] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setContent(newValue);
    };

    function getContent(id) {
        switch (id) {
            case 0:
                return <Profile />;
            case 1:
                return <SavedResumes />;
            default:
                throw new Error('Unknown');
        }
    }

    return (
        <React.Fragment>
            <div className={classes.menu}>
                <Tabs
                    onChange={handleChange}
                    indicatorColor="default"
                    textColor="default"
                    centered
                >
                    <Tab className={classes.label} label="Profile" />
                    <Tab className={classes.label} disabled={(Array.isArray(props.resume.data)) ? '' : 'true'} label="Saved Resumes" />
                </Tabs>
            </div>
            <hr className={classes.line}></hr>
            {getContent(content)}
        </React.Fragment>
    )

}


const mapStateToProps = state => {
    return {
        resume: state.resume,
    }
}

export default connect(mapStateToProps)(Dashboard);