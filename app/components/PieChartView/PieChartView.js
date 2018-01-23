'use strict';

import React, {Component} from 'react'
import {
    Dimensions,
    View,
    FlatList,
    Text
} from 'react-native';

import PieChart from './PieChart';

import {
    padding
} from 'globals/values';

import styles from './styles';

export default class PieChartView extends React.PureComponent {
    render() {
        return (
            <View style={styles.content}>
                <PieChart
                    style={styles.pie}
                    width={Dimensions.get("screen").width / 2}
                    height={Dimensions.get("screen").width / 2}
                    padding={padding.LARGE}
                    data={this.props.data}/>
                <FlatList
                    automaticallyAdjustContentInsets={false}
                    keyExtractor={(item, index) => item.language}
                    style={[
                        {height: Dimensions.get("screen").width / 2 - padding.LARGE * 2},
                        styles.keys
                    ]}
                    data={this.props.data}
                    renderItem={({item, index}) => (
                        <View
                            style={styles.keyItem}>
                            <Text
                                numberOfLines={1}
                                style={[styles.keyText, {color: item.color}]}>

                                {item.language}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={[styles.keyText, {color: item.color}]}>

                                {(item.value < 1? '<1' : Math.round(item.value)) + '% '}
                            </Text>
                        </View>
                    )}/>
            </View>
        )
    }
};
