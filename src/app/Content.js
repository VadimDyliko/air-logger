import React from 'react';
import ToolBar from './components/ToolBar';
import LogPage from './containers/LogPage';
import useLoggedData from './hooks/useLoggedData';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SettingsPage from './containers/SettingsPage';
import Footer from './components/Footer';

export default function Content() {
    const [data, clearData] = useLoggedData();
    return (
        <Router>
            <div className="App">
                <ToolBar clearData={clearData} />
                <Switch>
                    <Route exact path="/logView">
                        <LogPage data={data} />
                        <Footer />
                    </Route>
                    <Route exact path="/settings">
                        <SettingsPage data={data} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
