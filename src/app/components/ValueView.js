import React, { useMemo } from 'react';
import JSONFormatter from 'json-formatter-js';
import { colors, colorNames } from '../../constants';
import { useSettings } from '../containers/SettingsProvider/SettingsProvider';
import { SETTINGS_KEYS } from '../containers/SettingsProvider/hooks/useSettingsState';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

function ValueView({ item }) {
    const { time: timestamp, data, type, color } = item || {};
    const { state } = useSettings();
    const classes = useStyles();

    const viewConfig = useMemo(
        () => ({
            hoverPreviewEnabled: state[SETTINGS_KEYS.PREVIEW_HOVER],
            hoverPreviewArrayCount: state[SETTINGS_KEYS.PREVIEW_ARRAY_COUNT],
            hoverPreviewFieldCount: state[SETTINGS_KEYS.PREVIEW_FIELD_COUNT],
            theme: getThemeByColor(color),
            animateOpen: false,
            animateClose: false,
        }),
        [color, state]
    );

    const timeString = useMemo(() => moment(timestamp).format('mm:SSS'), [timestamp]);

    return (
        <div className={classes.valueView} style={color && { background: colors[color] }}>
            <div className={classes.time}>
                [{type}] {timeString}
            </div>
            {data.map((value, index) => (
                <Value
                    key={value?.id || index}
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

function getThemeByColor(color) {
    switch (color) {
        case colorNames.PINK:
        case colorNames.PURPLE:
        case colorNames.DEEP_PURPLE:
            return 'dark';
        case colorNames.RED:
        case colorNames.INDIGO:
        case colorNames.BLUE:
        case colorNames.CYAN:
        case colorNames.TEAL:
        case colorNames.GREEN:
        case colorNames.LIME:
        case colorNames.YELLOW:
        case colorNames.ORANGE:
        case colorNames.GREY:
        case colorNames.WHITE:
            return 'light';
        default:
            return 'dark';
    }
}
