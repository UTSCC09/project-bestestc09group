import React from 'react';
import Browse from './Browse';
import Welcome from './Welcome';

const Auth = ({ auth }) => {
    if (auth) return <Browse/>
    else return <Welcome/>
}

export default Auth;
