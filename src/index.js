import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { allReducers } from "./redux/reducers";
import { createStore } from 'redux';
import { Provider } from 'react-redux';


const store = createStore(allReducers)

store.subscribe(() => {
    const data = JSON.stringify(store.getState())
    // const abc = data.replace(/"([^"]+)":/g, '$1:')
    localStorage.setItem('storeReduxValues', data)
})

ReactDOM.render(<Provider store={store}>
    <App />
    </Provider>, document.getElementById('root'));


