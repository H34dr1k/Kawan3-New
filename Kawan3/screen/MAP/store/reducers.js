import { combineReducers } from "redux";
import { HomeReducer as home } from "../routes/Home/module/Home";
// import { TrackDriverReducer as trackDriver } from "../routes/TrackDriver/module/trackDriver";

// export const makeRootReducer = () => {
//     return combineReducers({
//         home,
//         trackDriver
//     });
// }

// export default makeRootReducer;

    export const makeRootReducer = () => {
        return combineReducers({});
    }
export default makeRootReducer;