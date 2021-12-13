export const isActivePage = (page, id = null) => {
    const params = {};
    if (id) { params.id = id; }

    return route().current(page, params);
};
export const getClassName = classes => Object.keys(classes).filter(name => classes[name]).join(' ');
export const getVideoType = video => {
    const paths = video.split('/');

    return paths[paths.length - 1].split('.')[1];
};
export const getParams = () => {
    const search = location.search;
    const params = {};

    if (search) {
        const list = search.split('?')[1];

        list.split('&').forEach(item => {
            const [key, value] = item.split('=');

            params[key] = value;
        });
    }


    return params;
};


export const isObject = (item) => (item && typeof item === 'object' && !Array.isArray(item));
export const mergeDeep = (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}
