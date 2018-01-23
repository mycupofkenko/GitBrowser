import OAuthManager from 'react-native-oauth';
import {URLFormat} from 'lib/helpers';

import languageColors from 'assets/values/languages.json';

const searchURL = 'https://api.github.com/search/';
const userURL = 'https://api.github.com/user';

const config = {
	github: {
		client_id: 'xxxxxxxxxxxxxxxxxx',
		client_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		callback_url: 'gitbrowser://oauth'
	}
};
const OManager = new OAuthManager('github');

const markdownCSS = 'https://raw.githubusercontent.com/sindresorhus/github-markdown-css/gh-pages/github-markdown.css';
const markdownAPI = 'https://api.github.com/markdown';

export const GitHubAPI = {
    authorize: () => {
        OManager.configure(config);

        return OManager.authorize('github');
    },
    deauthorize: () => {
        return OManager.deauthorize('github');
    },
    getAuthorizationStatus: () => {
        return new Promise((resolve, reject) => {
            OManager.savedAccounts()
                .then(res => {
                    resolve(res.accounts.length? true : false);
                });
        });
    },

    // main calls
    user: () => {
        return new Promise((resolve, reject) => {
            OManager.makeRequest('github', userURL)
                .then(res => res.data)
                .then(resolve)
                .catch(reject);
        });
    },
    search: (where, params) => {
        return new Promise((resolve, reject) => {
            requestAuthorizationRedirect()
                .then(res => {
                    var paramString = URLFormat.packParameters(params);

                    var url = searchURL + where + '?' + paramString;

                    resolve(res(url));
                });
        });
    },
    markdown: (readmeItem, full_name) => {
        return new Promise((resolve, reject) => {
            fetch(readmeItem.download_url)
                .then(res => res.text())
                .then(res => {
                    var promises = [
                        fetch(markdownCSS) // markdown CSS
                            .then(res => res.text()),
                        fetch(markdownAPI, { // markdown API
                            method: 'post',
                            headers: {
                                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                            },
                            body: JSON.stringify({
                                mode: 'gfm',
                                context: full_name,
                                text: res
                            })
                        })
                        .then(res => res.text())
                    ];
    
                    Promise.all(promises)
                        .then(blob => {
                            var css = `<style>${blob[0]}</style>`;
                            var html = `<div class="markdown-body">${blob[1]}</div>`;
    
                            resolve(css + html);
                        })
                        .catch(error => {
                            reject('');
                        });
                });
        });
    },
    languages: (languagesURL) => {
        return new Promise((resolve, reject) => {
            fetch(languagesURL)
                .then(res => res.json())
                .then(res => {
                    var languages = [];
    
                    if (Object.keys(res).length) {
                        var total = Object.values(res).reduce((a, b) => a + b);
    
                        Object.keys(res).map(lang => {
                            var color = languageColors[lang] ? languageColors[lang].color : '#000';
    
                            languages.push({
                                language: lang,
                                value: (res[lang] / total) * 100,
                                color: color
                            });
                        });
                    }
    
                    resolve(languages);
                })
                .catch(error => {
                    reject([]);
                });
        });
    }
};

requestAuthorizationRedirect = () => {
    return new Promise((resolve, reject) => {
        OManager
            .savedAccounts()
            .then(res => {
                if (res.accounts.length) {
                    resolve(makeAuthorizedRequest);
                } else {
                    resolve(makeUnauthorizedRequest);
                }
            });
    });
}

makeAuthorizedRequest = (url) => {
    return new Promise((resolve, reject) => {
        OManager
            .makeRequest('github', url)
            .then(res => res.data)
            .then(resolve)
            .catch(reject);
    });
}

makeUnauthorizedRequest = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(resolve)
            .catch(reject);
    });
}