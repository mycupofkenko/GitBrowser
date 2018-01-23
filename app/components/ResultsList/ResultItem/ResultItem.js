'use strict';

import React, { Component } from 'react'
import {
    View,
    Image,
    TouchableHighlight,
    Text,
} from 'react-native';

import styles from './styles';

import {
    color,
    shadow
} from 'globals/values';

export default class ReultItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }

    render() {
        const {item} = this.props;

        return (
            <TouchableHighlight
                onPress={this._onPress}
                underlayColor={color.SECONDARY}
                style={[styles.card, shadow.SMALL]}>
                <View style={styles.cardContainer}>
                    <View style={styles.topContainer}>
                            <View style={styles.topLine}>
                                <Text style={styles.name}
                                    numberOfLines={1}>{item.name}
                                </Text>

                                {!this.props.showIndex ||
                                    <Text style={styles.index}>
                                        {this.props.index + 1}
                                    </Text>   
                                }

                            </View>
                            <Text 
                                numberOfLines={3} 
                                style={styles.description}>

                                {item.description}
                            </Text>
                    </View>

                    <View style={styles.bottomContainer}>
                            <View style={styles.bottomCell}>
                                <Text style={styles.bottomLabel}>
                                    stars
                                </Text>
                                <Text style={styles.bottomText}>
                                    {item.stargazers_count}
                                </Text>
                            </View>
                            <View style={styles.bottomCell}>
                                <Text style={styles.bottomLabel}>
                                    forks
                                </Text>
                                <Text style={styles.bottomText}>
                                    {item.forks_count}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.bottomLabel}>
                                    owner
                                </Text>
                                <Text style={[styles.bottomText, styles.owner]}>
                                    {item.owner.login}
                                </Text>
                            </View>
                            <View style={styles.bottomCell}>
                                <Image 
                                    style={styles.avatar} 
                                    source={{uri: item.owner.avatar_url}} />
                            </View>
                        </View>
                </View>
            </TouchableHighlight>
        );
    }
}
