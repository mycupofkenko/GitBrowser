'use strict';

import React, { Component } from 'react';
import {
	TextInput,
	View,
	AsyncStorage,
	AlertIOS
} from 'react-native';

import ResultsList from 'components/ResultsList';
import HistoryList from 'components/HistoryList';

import styles from './styles';
import { shadow } from 'globals/values';

export default class SearchPage extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: null,
			searchText: '',
			searchPage: 1,
			showSearch: false,
			historyQuery: 'searchHistory'
		};
	}

	saveToSearchHistory(value) {
		var currentHistory = [];

		AsyncStorage.getItem(this.state.historyQuery)
			.then(value => JSON.parse(value))
			.then(json => {
				if (!json) json = [];

				var dupe = json.indexOf(value);
				if (dupe != -1) json.splice(dupe, 1);

				json.unshift(value);
				if (json.length > 10) json.pop();

				AsyncStorage.setItem(this.state.historyQuery, JSON.stringify(json));
			})
			.catch(() => {
				console.log('history not found');
			});
	}

	_onQueryFail = () => {
		this.setState({
			searchQuery: null
		});

		AlertIOS.alert(
			'No Results',
			'please try again'
		);
	}

	_onSubmitSearch = (event) => {
		const searchQuery = {
			q: event.nativeEvent.text
		};
		this.setState({
			searchQuery: searchQuery,
		});

		this.saveToSearchHistory(event.nativeEvent.text);
	};

	_onChangeText = (text) => {
		if (text == '') {
			this.setState({
				searchQuery: null,
			});
		}

		this.setState({
			searchText: text
		});
	}

	_onPressHistoryItem = (item) => {
		this.setState({
			searchText: item,
			searchQuery: {q: item},
		});
	}

	_onCardClicked = (item) => {
		this.props.navigation.navigate('Repo', { item: item });
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.header, shadow.LARGE]}>
					<TextInput
						style={styles.searchInput}
						value={this.state.searchText}
						placeholder='Search Git repositories'
						onChangeText={this._onChangeText}
						onSubmitEditing={this._onSubmitSearch} />
				</View>
				<View style={styles.results}>
					{!this.state.searchQuery ?
						<HistoryList
							query={this.state.historyQuery}
							style={styles.results}
							onPressItem={this._onPressHistoryItem} />
						:
						<ResultsList
							where={'repositories'}
							query={this.state.searchQuery}
							pageSize={10}
							onQueryFailed={this._onQueryFail}
							onEndReachedThreshold={2}
							onPressItem={this._onCardClicked} />
					}
				</View>
			</View>
		);
	}
}
