import React from 'react';
import TextField from '@material-ui/core/TextField';
import {
    Button,
    Container,
    FormGroup,
    Switch,
    Slider,
    Typography,
    ButtonGroup,
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Save as SaveIcon, ArrowBack as BackIcon } from '@material-ui/icons';
import { useSettings } from './SettingsProvider/SettingsProvider';
import { SETTINGS_KEYS } from './SettingsProvider/hooks/useSettingsState';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

export default function SettingsPage() {
    const { state, actions } = useSettings();
    const history = useHistory();
    const classes = useStyles();

    return (
        <Container className={classes.settingsPage} maxWidth="sm">
            <FormGroup>
                <TextField
                    fullWidth
                    id="standard-basic"
                    label="Port"
                    variant="standard"
                    color="primary"
                    value={state[SETTINGS_KEYS.PORT]}
                    onChange={({ target: { value } }) =>
                        actions.setValue(SETTINGS_KEYS.PORT, value)
                    }
                />
                <FormControlLabel
                    control={
                        <Switch
                            size={'small'}
                            name="hoverPreviewEnabled"
                            color="primary"
                            checked={state[SETTINGS_KEYS.PREVIEW_HOVER]}
                            onChange={({ target: { checked } }) =>
                                actions.setValue(SETTINGS_KEYS.PREVIEW_HOVER, checked)
                            }
                        />
                    }
                    label="HOVER PREVIEW"
                />
                <Typography id="discrete-slider" gutterBottom>
                    Hover preview array count
                </Typography>
                <Slider
                    value={state[SETTINGS_KEYS.PREVIEW_ARRAY_COUNT]}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={20}
                    onChange={({ target: { value } }) =>
                        actions.setValue(SETTINGS_KEYS.PREVIEW_ARRAY_COUNT, value)
                    }
                />
                <Typography id="discrete-slider" gutterBottom>
                    Hover preview field count
                </Typography>
                <Slider
                    value={state[SETTINGS_KEYS.PREVIEW_FIELD_COUNT]}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={20}
                    onChange={({ target: { value } }) =>
                        actions.setValue(SETTINGS_KEYS.PREVIEW_FIELD_COUNT, value)
                    }
                />
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => actions.saveState(state)}
                        startIcon={<SaveIcon />}
                    >
                        SAVE
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={history.goBack}
                        startIcon={<BackIcon />}
                    >
                        Go BACK
                    </Button>
                </ButtonGroup>
            </FormGroup>
        </Container>
    );
}

const useStyles = makeStyles({
    settingsPage: {
        paddingTop: 30,
    },
});
