import * as type  from '../constants'
import dataSetting from '../actions/settingAction'
const initialState = {
    dataSetting:''
}

//&attributes=deals&radius=40000&sort_by=review_count&categories=

export default function settingReducer(state= initialState, action) {
    switch (action.type) {
        case type.SETTING_SUCCESS:
            console.log("SETTING_SUCCESS "+ action.dataSetting);
            return Object.assign({}, state,{
                dataSetting: action.dataSetting,
            });
        default:
            return state;
    }
}