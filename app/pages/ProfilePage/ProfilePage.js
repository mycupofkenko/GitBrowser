'use strict';

import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	Image,
	TouchableHighlight
} from 'react-native';

import {GitHubAPI} from 'lib/GitHubAPI';

import Button from 'components/Button';

import styles from './styles';

import {
	color,
	shadow
} from 'globals/values';

export default class ProfilePage extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			signedIn: false
		};
	}

	componentDidMount = () => {
		GitHubAPI.getAuthorizationStatus()
			.then(res => {
				if (res) this._getUserData();
			});
	}

	_authorize = () => {
		GitHubAPI.authorize()
			.then(this._getUserData)
			.catch(error => {
				console.log(error);
			});
	}

	_deauthorize = () => {
		GitHubAPI.deauthorize();

		this.setState({
			signedIn: false,
			data: []
		});
	}

	_getUserData = () => {
		GitHubAPI.user()
			.then(res => {
				this.setState({
					data: res,
					signedIn: true
				});
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.topContainer, shadow.LARGE]}>
					{this.state.signedIn ?
						<Image
							style={styles.avatar}
							source={{uri: this.state.data.avatar_url}}/>
					:
						<Image 
							style={[styles.avatar, {tintColor: color.PRIMARY_LIGHT}]}
							source={require('assets/icons/account_circle_48pt_3x.png')}/>
					}
				</View>
				<ScrollView 
					style={styles.bottomContainer}
					contentContainerStyle={{flex: 1}}>
					<View style={styles.bottomContent}>
						{!this.state.signedIn? 
							<TouchableHighlight
								style={styles.button}
								onPress={this._authorize}>

								<Text style={styles.buttonText}>
									Sign in
								</Text>
							</TouchableHighlight>
						:
							<TouchableHighlight
								style={styles.button}
								onPress={this._deauthorize}>

								<Text style={styles.buttonText}>
									Sign out
								</Text>
							</TouchableHighlight>
						}
					</View>
				</ScrollView>
			</View>
		);
	}
}
