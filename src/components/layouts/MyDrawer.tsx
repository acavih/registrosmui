import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const drawerWidth = 240;

export default function MyDrawer({open}) {
    const path = usePathname();
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
                    <ListItem disablePadding>
                        <ListItemButton selected={path.includes("users")} component={Link} href="/users" >
                            <ListItemText primary="Usuarios" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton selected={path.includes("partners")} component={Link} href="/partners" >
                            <ListItemText primary="Socios" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} href="/partners" >
                            <ListItemText primary="Últimas atenciones" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} href="/resources" selected={path.includes("resources")}>
                            <ListItemText primary="Recursos" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} href="/stats" >
                            <ListItemText primary="Estadísticas" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}