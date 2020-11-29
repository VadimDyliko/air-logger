import { useCallback, useMemo, useReducer } from 'react';
import useIpcRenderer from '../../../hooks/useIpcRenderer';
import useMountCallback from '../../../hooks/useMountCallback';
export const SETTINGS_ACTIONS = {
    SET_STATE: 'SETSTATE',
    SET_VALUE: 'SET_VALUE',
    SAVE_STATE: 'SAVE_STATE',
};

export const SETTINGS_KEYS = {
    PORT: 'PORT',
    PREVIEW_HOVER: 'PREVIEW_HOVER',
    PREVIEW_ARRAY_COUNT: 'PREVIEW_ARRAY_COUNT',
    PREVIEW_FIELD_COUNT: 'PREVIEW_FIELD_COUNT',
};

const initialState = {
    [SETTINGS_KEYS.PORT]: 4000,
    [SETTINGS_KEYS.PREVIEW_HOVER]: true,
    [SETTINGS_KEYS.PREVIEW_ARRAY_COUNT]: 2,
    [SETTINGS_KEYS.PREVIEW_FIELD_COUNT]: 2,
};

export default function useSettingsState() {
    const [getStoreValue, setStoreValue] = useIpcRenderer();
    const [state, dispatch] = useReducer(reducer, initialState);
    const actions = useStateActions(dispatch, setStoreValue);

    const initState = useCallback(async () => {
        const storedState = await getStoreValue('SETTINGS');
        actions.setState(storedState);
    }, [actions, getStoreValue]);
    useMountCallback(initState);

    return [state, actions];
}

function reducer(state, action) {
    switch (action.type) {
        case SETTINGS_ACTIONS.SET_VALUE:
            return { ...state, [action.payload.key]: action.payload.value };
        case SETTINGS_ACTIONS.SAVE_STATE:
            return state;
        case SETTINGS_ACTIONS.SET_STATE:
            return { ...state, ...action.payload.state };
        default:
            return state;
    }
}

function useStateActions(dispatch, setStoreValue) {
    return useMemo(
        () => ({
            saveState: state => {
                setStoreValue('SETTINGS', state);
                dispatch({ type: SETTINGS_ACTIONS.SAVE_STATE });
            },
            setState: state => dispatch({ type: SETTINGS_ACTIONS.SET_STATE, payload: { state } }),
            setValue: (key, value) =>
                dispatch({ type: SETTINGS_ACTIONS.SET_VALUE, payload: { key, value } }),
        }),
        [dispatch, setStoreValue]
    );
}
