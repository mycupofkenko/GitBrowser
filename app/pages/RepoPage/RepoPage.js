'use strict';

import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	FlatList,
	ActivityIndicator,
	WebView,
	SegmentedControlIOS,
	Dimensions
} from 'react-native';

import {GitHubAPI} from 'lib/GitHubAPI';

import PieChartView from 'components/PieChartView';
import LinkingWebView from 'components/LinkingWebView';

import styles from './styles';
import { 
	color,
	shadow,
	padding
} from 'globals/values';

export default class RepoPage extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			readme: '',
			message: '',
			languages: [],
			tab: 0
		};

		this.params = this.props.navigation.state.params;
	}

	componentDidMount() {
		// get contents
		var url = this.params.item.contents_url.replace(/\/{.*}/, '');

		fetch(url)
			.then(res => res.json())
			.then(res => {

				var promises = [
					GitHubAPI.languages(this.params.item.languages_url)
				];

				// find readme
				if (Object.keys(res).length > 0) {
					var readmeItem = res.find(item => {
						return /readme(\.txt|\.md|$)$/i.test(item.name);
					});

					if (readmeItem) {
						promises.push(
							GitHubAPI.markdown(readmeItem, this.params.item.full_name)
						);
					}
				}

				Promise.all(promises)
					.then(blob => {

					this.setState({
						languages: blob[0],
						readme: blob[1] || '',
						loading: false
					});
				});
			});
	}

	_handleSegControlsOnChange = (e) => {
		this.setState({
			tab: e.nativeEvent.selectedSegmentIndex
		});
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.loading ?
					<ActivityIndicator
						size='large'
						style={styles.loading} />
					:
					<View style={styles.content}>
						<View style={[styles.head, shadow.LARGE]}>
							<Text
								style={styles.name}
								numberOfLines={1}
								elipsizeMode='head'>
								{this.params.item.full_name}
							</Text>
							<SegmentedControlIOS
								values={this.state.readme ? ['Stats', 'Readme'] : ['Stats']}
								selectedIndex={0}
								onChange={this._handleSegControlsOnChange}
								tintColor={color.SECONDARY}
								style={styles.tab} />
						</View>
						{this.state.tab != 0 ||
							<ScrollView 
								style={styles.scrollContent}
								contentContainerStyle={{flex: 1}}>
								{this.state.message != '' ?
									<View style={styles.content}>
										<Text style={styles.message}>
											{this.state.message}
										</Text>
									</View>
									:
									<View style={styles.card}>
										<Text style={styles.title}>
											languages
										</Text>
										{this.state.languages.length ?
											<View style={styles.cardContent}>
												<PieChartView
													data={this.state.languages}/>
											</View>
											:
											<View style={styles.cardContent}>
												<Text style={styles.message}>
													No languages
												</Text>
											</View>
										}
									</View>
								}
							</ScrollView>
						}
						{this.state.tab != 1 ||
							<LinkingWebView source={{html: this.state.readme}}/>
						}
					</View>
				}
			</View>
		);
	}
}
