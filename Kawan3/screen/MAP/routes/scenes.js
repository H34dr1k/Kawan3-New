import React from "react";
import { Actions, Scene } from "react-native-router-flux";
import HomeContainer from "./Home/container/HomeContainer";

const scenes = Actions.create(
    <Scene key="root" >
        <Scene key="home" component={HomeContainer} title="home" initial />
        {/* <Scene key="trackDriver" component={TrackDriverContainer} title="trackDriver" /> */}
    </Scene>

);

export default scenes;