export const isActivePage = (page, id = null) => {
    const params = {};
    if (id) { params.id = id; }

    return route().current(page, params);
};
export const getClassName = classes => Object.keys(classes).filter(name => classes[name]).join(' ');
export const getInputName = data => data.relation ? `${data.relation}.${data.name}` : data.name;
export const getVideoType = video => {
    const paths = video.split('/');

    return paths[paths.length - 1].split('.')[1];
};
