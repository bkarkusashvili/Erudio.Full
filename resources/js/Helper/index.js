export const isActivePage = page => route().current() === page;
export const getClassName = classes => Object.keys(classes).filter(name => classes[name]).join(' ');
