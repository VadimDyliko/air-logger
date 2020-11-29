import React, { useEffect } from 'react';
import ValueView from '../components/ValueView';
import { makeStyles } from '@material-ui/core';

export default function LogPage({ data }) {
    const classes = useStyles();
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [data]);

    return (
        <div className={classes.container}>
            {data.map(item => (
                <ValueView key={item.id} item={item} />
            ))}
        </div>
    );
}

const useStyles = makeStyles({
    container: {
        paddingTop: 30,
        paddingBottom: 30,
    },
});
