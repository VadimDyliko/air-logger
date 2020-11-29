import React from 'react';
import ValueView from '../components/ValueView';
import { makeStyles } from '@material-ui/core/styles';
import useLogViewScroll from '../hooks/useLogViewScroll';

export default function LogPage({ data }) {
    const classes = useStyles();
    useLogViewScroll(data);

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
