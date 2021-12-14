export const MainMenu = (translate) => ([
    { name: 'home', value: translate.home },
    {
        name: 'about', value: translate.about, list: [
            { name: 'about', value: translate.about },
            { name: 'team', value: translate.team },
            { name: 'social', value: translate.social },
            { name: 'media', value: translate.media },
        ]
    },
    { name: 'category', value: translate.categories },
    { name: 'course', value: translate.courses },
    { name: 'contact', value: translate.contact },
]);
