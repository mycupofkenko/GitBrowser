'use strict';

import React, { Component } from 'react'
import {
    View,
    FlatList,
    Image,
    Text,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';

import HistoryItem from './HistoryItem';
import styles from './styles';

export default class HistoryList extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount = () => {
        AsyncStorage.getItem(this.props.query)
            .then(res => JSON.parse(res))
            .then(res => {
                if (!Array.isArray(res)) return; // no history

                this.setState({
                    items: res
                });
            })
            .catch(error => {
                console.log('Error: broken storage item: ' + error);
                this._clearHistory();
            });
    }

    _clearHistory = () => {
        AsyncStorage.removeItem(this.props.query, (error) => {
            if (error) {
                console.log('Error: error clearing storage item: ' + error);
            }

            this.setState({
                items: []
            });
        });
    }

    _renderItem = ({ item, index }) => (
        <HistoryItem
            item={item}
            index={index}
            onPressItem={this._onPressItem}
            onPressDeleteItem={this._onPressDeleteItem}
        />
    );

    _onPressItem = (index) => {
        const {items} = this.state;

        // move to top of list and save
        items.unshift(items.splice(index, 1)[0]);

        AsyncStorage.setItem(this.props.query, JSON.stringify(items), error => {
            if (error) console.log('Error: error saving storage item: ' + error);
        });

        this.props.onPressItem(items[0]);
    };

    _onPressDeleteItem = (index) => {
        AsyncStorage.getItem(this.props.query)
            .then(value => JSON.parse(value))
            .then(json => {
                json.splice(index, 1);

                this.setState({
                    items: json
                });

                AsyncStorage.setItem(this.props.query, JSON.stringify(json), error => {
                    if (error) console.log('Error: error saving storage item: ' + error);
                });
            })
            .catch(error => {
                console.log('Error: broken history storage item: ' + error);
                this._clearHistory();
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={this.state.items}
                    keyExtractor={(item, index) => index}
                    renderItem={this._renderItem}
                    onEndReached={this.props.onEndReached}
                    automaticallyAdjustContentInsets={false}
                    scrollEnabled={false}
                />
                <TouchableHighlight
                    style={styles.footer}
                    onPress={this._clearHistory}>

                    {this.state.items.length == 0 ?
                        <View style={styles.footerContent}>
                            <Text style={styles.text}>
                                No history
                            </Text>
                        </View>
                        :
                        <View style={styles.footerContent}>
                            <Image
                                style={styles.icon}
                                source={require('assets/icons/delete_sweep_18pt_2x.png')} />
                            <Text style={styles.text}>
                                Clear all
                            </Text>
                        </View>
                    }

                </TouchableHighlight>
            </View>
                );
    }
}