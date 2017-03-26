import { TYPE_SAMPLE } from '../constants'

const initialState = {
    data: [],
    something_esle :""
}
export default function dataReducer(state=  initialState, action) {
    switch (action.type) {
        case TYPE_SAMPLE:
            return {
                ...state,
                data: [],
                something_else: "Login ok"
            }
        default:
            return state
    }
}