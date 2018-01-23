'use strict';

import React, { Component } from 'react';
import {
	View,
	Image,
	StatusBar
} from 'react-native';

import {
	TabViewAnimated,
} from 'react-native-tab-view'; // remove

import {
	StackNavigator, 
	TabNavigator, 
} from 'react-navigation';

import TrendingPage from 'pages/TrendingPage';
import SearchPage from 'pages/SearchPage';
import ProfilePage from 'pages/ProfilePage';
import RepoPage from 'pages/RepoPage';

import {
	color,
	padding,
	font,
	shadow
} from 'globals/values';

const getNavigationOptions = (title) => {
	return {
		title: title,
		headerStyle: {
			backgroundColor: color.SECONDARY,
			paddingBottom: padding.SMALL,
			paddingTop: padding.SMALL
		},
		headerTitleStyle: {
			fontSize: font.LARGE,
		},
		headerBackTitleStyle: {
			fontSize: font.SMALL
		},
		headerTintColor: color.TEXT_ON_DARK
	};
}

const pages = {
	Profile: {
		screen: ProfilePage,
		navigationOptions: getNavigationOptions('Profile')
	},
	Trending: {
		screen: TrendingPage,
		navigationOptions: getNavigationOptions('Trending Repos')
	},
	Search: {
		screen: SearchPage,
		navigationOptions: getNavigationOptions('Search')
	},
	Repo: {
		screen: RepoPage,
		navigationOptions: getNavigationOptions('Repo')
	}
}

const Tabs = TabNavigator({
	Profile: {
		screen: StackNavigator({
			Profile: pages.Profile
		}),
		navigationOptions: {
			tabBarLabel: 'Profile',
			tabBarIcon: ({ tintColor }) => (
				<Image
					source={require('assets/icons/profile_18pt_2x.png')}
					style={[{width: 28, height: 28}, { tintColor: tintColor }]} />
			)
		}
	},
	Trending: {
		screen: StackNavigator({
			Trending: pages.Trending,
			Repo: pages.Repo
		}),
		navigationOptions: {
			tabBarLabel: 'Trending',
			tabBarIcon: ({ tintColor }) => (
				<Image
					source={require('assets/icons/trending_18pt_2x.png')}
					style={[{width: 28, height: 28}, { tintColor: tintColor }]} />
			)
		}
	},
	Search: {
		screen: StackNavigator({
			Search: pages.Search,
			Repo: pages.Repo
		}),
		navigationOptions: {
			tabBarLabel: 'Search',
			tabBarIcon: ({ tintColor }) => (
				<Image
					source={require('assets/icons/search_18pt_2x.png')}
					style={[{width: 28, height: 28}, { tintColor: tintColor }]} />
			)}
		},
	},
	{
		tabBarPosition: 'bottom',
		animationEnabled: true,
		swipeEnabled: true,
		initialRouteName: 'Trending',
		tabBarOptions: {
			activeTintColor: color.SECONDARY,
			inactiveTintColor: color.PRIMARY_DARK,
			style: [
				{
					backgroundColor: color.PRIMARY,
					borderTopWidth: 0
				},
				shadow.LARGE
			]
		},
	});

export default class App extends Component<{}> {
	render() {
		return (
			<View style={{flex: 1}}>
				<StatusBar
					barStyle="light-content"/>
				<Tabs/>
			</View>
		);
	}
}
