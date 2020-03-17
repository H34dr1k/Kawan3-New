import React from 'react';
import { AppLoading } from 'expo';
import { Root } from "native-base";
import * as Font from 'expo-font';
import Text from './customText.js';s

class ErrorFont extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Roboto-Bold': require("../assets/font/roboto/Roboto-Bold.ttf"),
            'Roboto-Regular': require("../assets/font/roboto/Roboto-Regular.ttf"),
            'Roboto-Italic': require("../assets/font/roboto/Roboto-Italic.ttf"),
            'Roboto-Thin': require("../assets/font/roboto/Roboto-Thin.ttf"),
            'Roboto-Medium': require("../assets/font/roboto/Roboto-Medium.ttf"),
            'Roboto-Black': require("../assets/font/roboto/Roboto-Black.ttf"),
        });
        this.setState({ loading: false }); 
    }

    render() {
        if (this.state.loading) {
            return (
                <Root>
                    <AppLoading />
                </Root>
            );
        }
        return (
            <Root>
                <AppNavigator />
            </Root>
        );
    }
}

export { ErrorFont };