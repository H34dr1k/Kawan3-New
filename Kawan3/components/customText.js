import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class CustomText extends Component {

    setFontType = (type) =>{
        switch (type){
            case 'rblack':
                  return 'Roboto-Black';
            case 'rbold':
                return 'Roboto-Bold';    
            case 'ritalic':
                return 'Roboto-Italic';    
            case 'rmedium':
                return 'Roboto-Medium';  
            case 'rthin':
                return 'Roboto-Thin';
            default:
                return 'Roboto-Regular';
        }
    };

    render() {
        const font = this.setFontType(this.props.type?this.props.type:'normal');
        const style = [{ fontFamily: font}, this.props.style || {} ];
        const allProps = Object.assign({}, this.props,{style: style});

        return <Text {...allProps}>{this.props.children}</Text>;
    }
}

export default CustomText;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }

});