import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Settings } from '@material-ui/icons';

function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Link to={'/settings'}>
                <Settings className={classes.icon} />
            </Link>
        </div>
    );
}

export default Footer;

const useStyles = makeStyles({
    container: {
        position: 'fixed',
        bottom: 0,
        height: 30,
        width: '100%',
        backdropFilter: 'blur(2px)',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    icon: {
        color: 'white',
        cursor: 'pointer',
        margin: 15,
        fontSize: 16,
    },
});
