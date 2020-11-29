import { useCallback } from 'react';

const { ipcRenderer } = window?.require?.('electron') || {};

export default function useIpcRenderer() {
    const getStoreValue = useCallback(async key => {
        return await ipcRenderer?.invoke('getStoreValue', key);
    }, []);

    const setStoreValue = useCallback(async (key, value) => {
        await ipcRenderer?.invoke('setStoreValue', key, value);
    }, []);

    return [getStoreValue, setStoreValue];
}
