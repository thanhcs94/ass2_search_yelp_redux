import { combineReducers } from 'redux'
import appData from './dataReducer'
import loginReducer from './loginReducer'
import saveSetting from './settingReducer'
const rootReducer = combineReducers({
    appData,
    loginReducer,
    saveSetting
})
export default rootReducer;