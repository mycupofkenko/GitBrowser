'use strict';

import React, { Component } from 'react';
import {
	View,
	SegmentedControlIOS,
	AlertIOS
} from 'react-native';

import ResultsList from 'components/ResultsList';

import styles from './styles';
import {
	shadow,
	color
} from 'globals/values';

export default class TrendingPage extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: 0
		};
	}

	componentDidMount() {
        this._createQuery();
    }

	_onSegmentedControlsChange = (event) => {console.log('set seg controls');
		var index = event.nativeEvent.selectedSegmentIndex;
		
		this.setState({
			selectedIndex: index
		}, this._createQuery);
	}

	_createQuery = () => {
		var date = new Date();

		switch (this.state.selectedIndex) {
			case 0: {
				date = null;
				break;
			}
			case 1: {
				date.setMonth(date.getMonth() - 1); // past month
				break;
			}
			case 2: {
				date.setDate(date.getDate() - 7) // past 7 days
				break;
			}
		}

		var dateString = '';

		if (date) {
			var dd = date.getDate();
			var mm = date.getMonth() + 1;

			dateString = [
				date.getFullYear(),
				(mm > 9 ? '' : '0') + mm,
				(dd > 9 ? '' : '0') + dd
			].join('-');
		}

		this.setState({
			query: {
				q: dateString ? 'created:>=' + dateString : 'stars:>0',
			}
		});
	}

	_onItemClicked = (item) => {console.log(item);
		this.props.navigation.navigate('Repo', { name: 'Test', item: item });
	}

	_onQueryFailed = (message) => {
		if (message) {
			switch (true) {
				case /rate limit exceeded/i.test(message) : {
					AlertIOS.alert(
						'You have exceeded the search rate limit',
						'please sign in to remove the limit'
					);

					return;
				}
				default : break;
			}
		}

		AlertIOS.alert(
			'There was a problem',
			'please try again later'
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.header, shadow.LARGE]}>
					<SegmentedControlIOS
						values={['All time', 'Past Month', 'Past Week']}
						tintColor={color.SECONDARY}
						selectedIndex={this.state.selectedIndex}
						onChange={this._onSegmentedControlsChange}
						style={styles.rangeTabs} />
				</View>
				<View style={styles.results}>
					<ResultsList
						where={'repositories'}
						query={this.state.query}
						showIndex={true}
						pageSize={10}
						onQueryFailed={this._onQueryFailed}
						onPressItem={this._onItemClicked} />
				</View>
			</View>
		);
	}
}
