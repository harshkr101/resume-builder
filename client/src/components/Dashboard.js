import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Profile from './Profile';
import SavedResumes from './SavedResumes';

const useStyles = makeStyles((theme) => ({
    menu: {
        display: 'flex',
        position: 'absolute'
    },
    menuPaper: {
        marginTop: theme.spacing(10),
        height: 'fit-content',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: '240px',
    },
}));


const Dashboard = (props) => {
    const classes = useStyles();

    const [content, setContent] = React.useState(1);

    const handleClick = (id) => {
        setContent(id);
    };

    const mainListItems = (
        <div>
            <ListItem button onClick={() => { handleClick(1) }}>
                <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={() => { handleClick(2) }}>
                <ListItemText primary="Saved Resumes" />
            </ListItem>
        </div>
    );

    function getContent(id) {
        switch (id) {
            case 0:
                return <div></div>
            case 1:
                return <Profile />;
            case 2:
                return <SavedResumes />;
            default:
                throw new Error('Unknown');
        }
    }

    return (
        <React.Fragment>
            <div className={classes.menu}>
                <Drawer
                    variant="permanent"
                    classes={{ paper: classes.menuPaper }}
                    open='true'
                >
                    <List>{mainListItems}</List>
                </Drawer>
            </div>
            {getContent(content)}
        </React.Fragment>
    )

}

export default Dashboard;