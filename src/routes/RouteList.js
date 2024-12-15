import React from 'react';
import { Switch,Route } from 'react-router-dom';
import OpenFirstFile from '../openFile/OpenFirstFile';


function RouteList() {
    return (
        <div>
            <Switch>
              <Route exact path='/' component={OpenFirstFile}></Route>
            </Switch>
        </div>
    )
}

export default RouteList