export const MainMenu = (translate) => ([
    { name: 'home', value: translate.home },
    {
        name: 'about', value: 'ჩვენს შესახებ', list: [
            { name: 'about', value: 'ჩვენს შესახებ' },
            { name: 'team', value: 'ჩვენი გუნდი' },
            { name: 'social', value: 'სოც. პასუხისმგებლობა' },
            { name: 'media', value: 'მედია' },
        ]
    },
    { name: 'category', value: 'კატეგორიები' },
    { name: 'course', value: 'კურსები' },
    { name: 'contact', value: 'კონტაქტი' },
    // {
    //     name: 'login', value: 'შესლვა', list: [
    //         { name: 'profile', value: 'ჩემი გვერდი' },
    //         { name: 'settings', value: 'პარამეტრები' },
    //         { name: 'settings', value: 'სისტემიდან გასვლა' }
    //     ]
    // },
]);
