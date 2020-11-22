import React from 'react';
import './ToolBar.css';
import { ReactComponent as ClearIcon } from '../../../assets/icons/clear.svg'
import { ReactComponent as MenuIcon } from '../../../assets/icons/menu.svg'

function ToolBar({clearData}) {

        return (
            <div className={'toolbar'}>
                <ClearIcon className={'toolbar-icon'} onClick={clearData}/>
                <MenuIcon className={'toolbar-icon'} onClick={clearData}/>

            </div>
        );

}


export default ToolBar;
