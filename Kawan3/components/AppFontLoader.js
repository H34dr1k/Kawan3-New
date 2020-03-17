import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Text from './customText.js';
class AppFontLoader extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    try {
      await Expo.Font.loadAsync({
          'Roboto-Bold': require("../assets/font/roboto/Roboto-Bold.ttf"),
          'Roboto-Regular': require("../assets/font/roboto/Roboto-Regular.ttf"),
          'Roboto-Italic': require("../assets/font/roboto/Roboto-Italic.ttf"),
          'Roboto-Thin': require("../assets/font/roboto/Roboto-Thin.ttf"),
          'Roboto-Medium': require("../assets/font/roboto/Roboto-Medium.ttf"),
          'Roboto-Black': require("../assets/font/roboto/Roboto-Black.ttf")
      });

      this.setState({ fontLoaded: true });

    } catch (error) {
      console.log('error loading fonts', error);
    }
  }


  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return this.props.children;

  }
}

export { AppFontLoader };

