'use strict';

import React, { Component } from 'react'
import {
    WebView,
    Linking,
} from 'react-native';

import styles from './styles';

export default class WebViewExt extends React.PureComponent {

    _onNavigationStateChange = (event) => {
        if (!event.url.includes('about:blank')) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
        }
    }

    render() {
        return (
            <WebView
                onNavigationStateChange={this._onNavigationStateChange}
                ref={ref => { this.webview = ref }}
                style={styles.webView}
                scalesPageToFit={false}
                source={this.props.source} />
        )
    }
};
