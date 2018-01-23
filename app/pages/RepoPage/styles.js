import { StyleSheet } from 'react-native';

import {
	color,
	padding,
	font,
	radius,
	height
} from 'globals/values';
import { margin } from '../../globals/values';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		flex: 1,
	},
	card: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: color.PRIMARY_LIGHT
	},
	cardContent: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	head: {
		zIndex: 1,
		justifyContent: 'center',
		backgroundColor: color.PRIMARY,
	},
	name: {
		alignSelf: 'center',
		fontSize: font.LARGE,
		color: color.SECONDARY,
		fontWeight: 'bold',
		margin: margin.LARGE,
	},
	tab: {
		margin: margin.SMALL,
		marginTop: 0,
	},
	content: {
		flex: 1,
	},
	scrollContent: {
		flex: 1,
		backgroundColor: color.HIDDEN_BACKGROUND
	},
	message: {
		fontSize: font.SMALL,
		padding: padding.SMALL,
		color: color.TEXT_ON_PRIMARY
	},
	title: {
		fontSize: font.LARGE,
		fontWeight: 'bold',
		color: color.TEXT_ON_LIGHT,
		margin: margin.LARGE,
	},
	loading: {
		flex: 1,
		justifyContent: 'center'
	}
});

export default styles;