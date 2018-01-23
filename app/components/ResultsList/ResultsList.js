'use strict';

import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text
} from 'react-native';

import {GitHubAPI} from 'lib/GitHubAPI';

import ResultItem from './ResultItem';

export default class ResultsList extends Component < {} > {
    constructor(props) {
        super(props);

        this.state = {
            query: null,
            data: [],
            page: 1,
            refreshing: true
        };
    }

    componentDidMount() {
        if (this.props.query) {
            this.setState({
                query: this.props.query
            }, this._makeRemoteRequest);
        }
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.query === this.state.query) return;

        this.flatlist
            .scrollToOffset({offset: 0, animated: true});

        this.setState({
            page: 1,
            refreshing: true,
            query: newProps.query
        }, this._makeRemoteRequest);
    }

    _makeRemoteRequest = () => {
        const {page, data} = this.state;

        if (!this.props.query && this.props.where) return;

        GitHubAPI
            .search(this.props.where, {page: page, ...this.props.query})
            .then(res => {
                if (!res.items || res.items.length < 1) {
                    this.props.onQueryFailed(res.message);
                } else {
                    this.setState({
                        data: page === 1? res.items : [...data, ...res.items]
                    });
                }

                this.setState({
                    refreshing: false
                });
            });
    };

    handleRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        }, this._makeRemoteRequest());
    };

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, this._makeRemoteRequest());
    };

    _renderItem = ({item, index}) => (
        <ResultItem
            item={item}
            index={index}
            showIndex={this.props.showIndex}
            onPressItem={this.props.onPressItem}/>
    );

    render() {
        return (
            <FlatList
                ref={(ref) => {this.flatlist = ref}}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                onEndReached={this.handleLoadMore}
                data={this.state.data}
                keyExtractor={(item, index) => index}
                renderItem={this._renderItem}
                onEndReachedThreshold={2}
                automaticallyAdjustContentInsets={false}/>
        );
    }
}