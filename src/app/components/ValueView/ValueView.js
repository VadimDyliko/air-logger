import React from 'react';
import JSONFormatter from 'json-formatter-js';
import './ValueView.css';
import {colors} from "../../constants";

function ValueView({ data, timestamp, type, color = null, device = '' }) {
    return (
        <div className={'value-view'} style={color && { background: colors.color }}>
            <div className={'value-view-item value-view-time'}>
                {type}: {device}>{new Date(timestamp).toLocaleTimeString()} >>>
            </div>
            {data.map(value => (
                <Value vanillaChildren={formatterFactory(value)} />
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

function formatterFactory(data) {
    return new JSONFormatter(data, 1, {
        hoverPreviewEnabled: true,
        hoverPreviewArrayCount: 100,
        hoverPreviewFieldCount: 5,
        theme: 'dark',
        animateOpen: false,
        animateClose: false,
    }).render();
}
