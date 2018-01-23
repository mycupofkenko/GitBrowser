import {StyleSheet} from 'react-native';

import {
	color, 
    margin
} from 'globals/values';

const styles = StyleSheet.create({
	container: {
		flex: 1,
    },
    header: {
        backgroundColor: color.PRIMARY,
        zIndex: 1
    },
	results: {
		flex: 1,
		backgroundColor: color.HIDDEN_BACKGROUND
	},
	rangeTabs: {
		height: 32,
		margin: margin.SMALL
	}
});

export default styles;