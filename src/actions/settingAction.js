import * as types from '../constants';

const dataSetting = {
    isRefresh :false,
    attributes: true,
    radius: 40000,
    sort_by: '',
    categories: ''
}
export function saveDataSetting(dataSetting) {
    return {
        type: types.SETTING_SUCCESS,
        dataSetting
    }
}

export function fetchDataSetting(dataSetting) {
    return (dispatch) => {
        dispatch(saveDataSetting(dataSetting))
    }
}
