'use strict';

import React, { Component } from 'react'
import {
    View,
    Image,
    TouchableHighlight,
    Text,
} from 'react-native';

import {color} from 'globals/values';

import styles from './styles';

export default class HistoryItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.index);
    }

    _onDeletePress = () => {
        this.props.onPressDeleteItem(this.props.index);
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={color.SECONDARY_LIGHT}
                onPress={this._onPress}>
                <View style={styles.container}>
                    <View style={styles.columnLeft}>
                        <Image
                            style={styles.icon}
                            source={require('assets/icons/history_18pt_2x.png')}/>
                        <Text 
                            style={styles.text}
                            numberOfLines={1}>

                            {this.props.item}

                        </Text>
                    </View>
                    <TouchableHighlight
                        underlayColor={color.SECONDARY_LIGHT}
                        onPress={this._onDeletePress}
                        style={styles.columnRight}>
                        <Image
                            style={styles.icon}
                            onPress={this._onDeletePress}
                            source={require('assets/icons/delete_18pt_2x.png')}/>
                    </TouchableHighlight>
                </View>
            </TouchableHighlight>
        );
    }
}

