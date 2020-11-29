import React, { useContext, useMemo } from 'react';
import useSettingsState from '../../containers/SettingsProvider/hooks/useSettingsState';

const SettingsContext = React.createContext({});

export default function SettingsProvider({ children }) {
    const [state, actions] = useSettingsState();
    const providerValue = useMemo(() => ({ state, actions }), [actions, state]);

    return <SettingsContext.Provider value={providerValue}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
    return useContext(SettingsContext);
}
