import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";

export const drawerWidth = 240;

export default function MyDrawer({open}) {
    return (
        <Drawer variant="persistent" anchor="left" open={open} sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
            }
        }}>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem button disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Inbox" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}