import { useCallback, useEffect, useState } from 'react';
import openSocket from 'socket.io-client';

export default function useLoggedData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const socket = openSocket('/');
        socket.on('debugLog', loggedData => {
            setData(prev => [...prev, loggedData]);
        });
    }, []);

    const clearData = useCallback(() => {
        setData([]);
    }, []);

    return [data, clearData];
}
