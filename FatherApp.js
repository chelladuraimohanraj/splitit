import React from 'react';
import App from './App'
import Store from './Components/reduxstuff/Store'
import { Provider } from 'react-redux'


const FatherApp = () =>{
    return(
        <Provider store={Store}>
            <App/>
        
        </Provider>
    )
}

export default FatherApp;