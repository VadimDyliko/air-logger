import React, { useMemo } from 'react';
import JSONFormatter from 'json-formatter-js';
import { colors } from '../../constants';
import { useSettings } from '../containers/SettingsProvider/SettingsProvider';
import { SETTINGS_KEYS } from '../containers/SettingsProvider/hooks/useSettingsState';
import generate from 'shortid';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';

function ValueView({ item }) {
    const { time: timestamp, data, type, color } = item || {};
    const { state } = useSettings();
    const classes = useStyles();

    const viewConfig = useMemo(
        () => ({
            hoverPreviewEnabled: state[SETTINGS_KEYS.PORT],
            hoverPreviewArrayCount: state[SETTINGS_KEYS.PREVIEW_ARRAY_COUNT],
            hoverPreviewFieldCount: state[SETTINGS_KEYS.PREVIEW_FIELD_COUNT],
            theme: 'dark',
            animateOpen: false,
            animateClose: false,
        }),
        [state]
    );

    const timeString = useMemo(() => moment(timestamp).format('mm:SSS'), [timestamp]);

    return (
        <div className={classes.valueView} style={color && { background: colors.color }}>
            <div className={classes.time}>
                [{type}] {timeString}
            </div>
            {data.map(value => (
                <Value
                    key={value?.id || generate()}
                    vanillaChildren={formatterFactory(value, viewConfig)}
                />
            ))}
        </div>
    );
}

export default ValueView;

class Value extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return (
            <div
                className={'value-view-item'}
                ref={ref => ref?.appendChild(this.props.vanillaChildren)}
            />
        );
    }
}

function formatterFactory(data, viewConfig) {
    return new JSONFormatter(data, 1, viewConfig).render();
}

const useStyles = makeStyles({
    valueView: {
        margin: 10,
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
    },
    time: {
        display: 'flex',
        alignItems: 'baseline',
        fontSize: 8,
        color: 'white',
        marginRight: 10,
    },
});
