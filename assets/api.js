(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("secret");

    window.fetchApi = (url, opts) => {
        return fetch(url, {
            ...opts,
            headers: {
                ...opts.headers,
                "X-Zhiva-Token": token
            }
        });
    };
})();