import React, { useCallback, useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import './App.css';
import ValueView from './components/ValueView/ValueView';
import ToolBar from './components/ToolBar';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const socket = openSocket('/');
        socket.on('debugLog', loggedData => {
            setData(prev => [loggedData, ...prev]);
        });
    }, []);

    const clearData = useCallback(() => {
        setData([]);
    }, []);

    return (
        <div className="App">
            <ToolBar clearData={clearData} />
            <div className={'data-container'}>
                {data.map(item => {
                    const { time: timestamp, data, type, color, device, id } = item || {};
                    return (
                        <div key={id}>
                            <ValueView
                                data={data}
                                timestamp={timestamp}
                                type={type}
                                color={color}
                                //device={device} // TODO: Add device info
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
