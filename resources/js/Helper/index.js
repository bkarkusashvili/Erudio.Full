export const isActivePage = (page, id = null, list = []) => {
    const params = {};
    if (id) { params.id = id; }

    return route().current(page, params) ||
        list.some((item) => route().current(item.name, params));
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
export const baseShareText = {
    ka: 'erudio წარმოადგენს აუდიტორული და საკონსულტაციო კომპანია Loialté-ს საგანმანათლებლო მიმართულებას და გთავაზობთ პროფესიული ტრენინგების მრავალფეროვან ჩამონათვალს.',
    en: 'erudio is the educational direction of the audit and consulting company Loialté and offers a diverse list of professional trainings.',
};
