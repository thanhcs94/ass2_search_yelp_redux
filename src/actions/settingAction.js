import * as types from '../constants';

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
