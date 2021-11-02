import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Collapse, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@mui/material';
import { AddCircle, StarBorder } from '@mui/icons-material';
import { Link } from '@inertiajs/inertia-react';

const drawerWidth = 240;
const menu = [
    // { text: 'მომხმარებლები', model: 'course' },
    // { text: 'სლაიდერი', model: 'slider' },
    { text: 'გვერდები', model: 'page' },
    { text: 'გუნდი', model: 'team' },
    { text: 'მედია', model: 'media' },
    { text: 'კატეგორია', model: 'category' },
    {
        list: [
            { text: 'ქალაქები', model: 'city' },
            { text: 'ინსტრუქტორები', model: 'instructor' },
            { text: 'კურსები', model: 'course' },
        ]
    },
    // { text: 'გამოწერები', model: 'subscribe' },
    { text: 'პარამეტრები', model: 'option' },
];

const LocalListItem = ({ item }) => {
    return (
        <ListItemButton
            href={route(`${item.model}.index`)}
            LinkComponent={'li'}
            component={Link}
        >
            <ListItemText primary={item.text} />
            <ListItemSecondaryAction>
                <Link href={route(`${item.model}.create`)}>
                    <IconButton color={'success'} edge={'end'} children={<AddCircle />} />
                </Link>
            </ListItemSecondaryAction>
        </ListItemButton>
    )
}

export const AdminLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Erudio Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {menu.map((item, key) => {
                        if (!item.list) {
                            return <LocalListItem key={key} item={item} />
                        }

                        return (
                            <>
                                <Divider />
                                {item.list.map((item, key) => <LocalListItem key={key} item={item} />)}
                                <Divider />
                            </>
                        )
                    })}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};
