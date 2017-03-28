import {combineReducers} from 'redux';
const types = {
    SAVE_SETTING: 'SAVE_SETTING',
}

//attributes: true,
// radius: 40000,
//     sort_by: '',
//     categories: ''
// Defined actions
export const actionCreators = {
    storeDataSetting (attributes, radius, sort_by,categories){
        console.log("SETTING ACTION : " +JSON.stringify(radius));
        return {
            type: types.SAVE_SETTING,
            data: {attributes:attributes, radius:radius , sort_by:sort_by ,categories:categories},
        }
    }
}

const initialState = {
    isRefresh :false,
    attributes: true,
    radius: 1,
    sort_by: "",
    categories: ""
};
// Store your data to Redux based on your action
export default function saveSetting(state = initialState, action){
    console.log("SETTING REDUCER : " +JSON.stringify(action));
    switch(action.type) {
        case types.SAVE_SETTING: {
            return {
                isRefresh :true,
                attributes: action.data.attributes,
                radius: action.data.radius,
                sort_by: action.data.sort_by,
                categories: action.data.categories
            }
        }
        default:
            return state;
    }
}