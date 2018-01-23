'use strict';

import React, {Component} from 'react'
import {
	Text,
	TouchableHighlight
} from 'react-native';

import styles from './styles';

export default class Button extends React.PureComponent {

    render() {
        return (
            <TouchableHighlight
                style={styles.container}
                onPress={this.props.onPress}>

                <Text style={styles.text}>
                    {this.props.text}
                </Text>
            </TouchableHighlight>
        )
    }
};
