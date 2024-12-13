import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OpenFirstFile from '../openFile/OpenFirstFile';


function RouteList() {
    return (
        <div>
            <Routes>
              <Route path='/' element={<OpenFirstFile/>} />
            </Routes>
        </div>
    )
}

export default RouteList