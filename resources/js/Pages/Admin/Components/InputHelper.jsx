import { mergeDeep } from "@/Helper";

const isNotFile = type => new Set(['file', 'image', 'video']).has(type);
const isGroup = type => type === 'group';

const getFieldList = (list, data = {}) => {
    const form = {};

    list.forEach(item => {
        const key = item.name;
        let value = isNotFile(item.type) ? data[key] : null;

        if (isGroup(item.type)) {
            value = getFieldList(item.list, data[key]);
        }

        form[key] = value;
    });

    return form;
};

export const getInitForm = (fields, data = {}) => {
    let form = {};

    fields.map(field => Object.assign(form, getFieldList(field.list, data)));

    console.log(form);

    return form;
};


// if (isGroup(item.type)) {
//     item.list.forEach()
// }


// if (item.relation) {
//     if (!form[item.relation]) {
//         form[item.relation] = {}
//     }
//     form[item.relation][key] = data[item.relation] ? data[item.relation][item.name] : null;
// }
