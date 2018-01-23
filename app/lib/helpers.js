export const URLFormat = {
    packParameters: (params, defaultParams) => {
        if (defaultParams) {
            Object.keys(defaultParams).forEach((key) => {
                params[key] = defaultParams[key]
            });
        }

        return Object.keys(params)
            .map(key => key + '=' + encodeURIComponent(params[key]))
            .join('&');
    }
}