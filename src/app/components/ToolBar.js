import React from 'react';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

function ToolBar({ clearData }) {
    const classes = useStyles();
    return (
        <div className={classes.toolbar}>
            <DeleteIcon className={classes.icon} onClick={clearData} />
        </div>
    );
}

export default ToolBar;

const useStyles = makeStyles({
    icon: {
        color: 'white',
        cursor: 'pointer',
        margin: 5,
        fontSize: 16,
    },
    toolbar: {
        position: 'fixed',
        top: 0,
        height: 30,
        width: '100%',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        backdropFilter: 'blur(2px)',
    },
});
