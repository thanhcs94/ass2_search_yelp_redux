import {createStore, applyMiddleware} from 'redux'
import dataReducer from '../reducers'
import thunk from 'redux-thunk'
export default function configureStore() {
    let store = createStore(dataReducer, applyMiddleware(thunk));
    return store;
}