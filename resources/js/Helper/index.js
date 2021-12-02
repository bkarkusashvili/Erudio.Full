export const isActivePage = (page, id = null) => {
    const params = {};
    if (id) { params.id = id; }

    return route().current(page, params);
};
export const getClassName = classes => Object.keys(classes).filter(name => classes[name]).join(' ');
