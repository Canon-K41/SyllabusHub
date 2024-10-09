//setting pathname & Link
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ClassIcon from '@mui/icons-material/Class';
import SearchIcon from '@mui/icons-material/Search';
import Person2Icon from '@mui/icons-material/Person2';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import Collapse from '@mui/material/Collapse';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PreviewIcon from '@mui/icons-material/Preview';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface MiniDrawerProps {
  children: React.ReactNode;
}

const MiniDrawer: React.FC<MiniDrawerProps> = ({ children }) => {
  const theme = useTheme();
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [isSearchOpen, setSearchOpen] = React.useState(false);
  const [isHelpOpen, setHelpOpen] = React.useState(false);
  const [isCalendarOpen, setCalendarOpen] = React.useState(false);
  const pathname = usePathname();

  const handleDrawerOpen = () => {
    setSidebarOpen(true);
  };
  const handleDrawerClose = () => {
    setSidebarOpen(false);
    setSearchOpen(false);
    setHelpOpen(false);
    setCalendarOpen(false);
  };

  const handleClick = (isOpen: boolean, setOpen: (arg0: boolean) => void) => { 
    if (isOpen) {
      setOpen(false);
    } else {
      setSidebarOpen(true);
      setOpen(true);
    }
  };

  const menuItems = [
    { href: "/", text: "Home", icon: <HomeIcon /> },
    { href: "/myclass", text: "MyClass", icon: <ClassIcon /> },
  ];

  const menuLists = [
    {
      href: "/calendar",
      text: "Calendar",
      icon: <CalendarMonthIcon />,
      subItems: [
        { href: "/calendar/view", text: "View", icon: <PreviewIcon /> },
        { href: "/calendar/edit", text: "Edit", icon: <EditCalendarIcon /> },
      ],
      isOpen: isCalendarOpen,
      setOpen: setCalendarOpen,
    },
    {
      href: "/search",
      text: "Search",
      icon: <SearchIcon />,
      subItems: [
        { href: "/search/class", text: "Class", icon: <SchoolIcon /> },
        { href: "/search/teacher", text: "Teacher", icon: <Person2Icon /> },
      ],
      isOpen: isSearchOpen,
      setOpen: setSearchOpen,
    },
    {
      href: "/help",
      text: "Help",
      icon: <HelpIcon />,
      subItems: [
        { href: "/help/faq", text: "FAQ", icon: <QuestionAnswerIcon /> },
        { href: "/help/contact", text: "Contact", icon: <ContactMailIcon /> },
      ],
      isOpen: isHelpOpen,
      setOpen: setHelpOpen,
    },
  ];



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

        <AppBar position="fixed" open={isSidebarOpen}>
          <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isSidebarOpen && { display: 'none' }),
            }}
          >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
            SyllabusHub
          </Typography>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={isSidebarOpen}>

          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>

          <Divider />

          <List>

            {menuItems.map((item, index) => (
              <Link href={item.href} key={index}>
                <ListItem disablePadding sx={{ display: 'block', bgcolor: pathname === item.href ? 'lightgray' : 'white' }}>
                  <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isSidebarOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                    <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isSidebarOpen ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} sx={{ opacity: isSidebarOpen ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                </Link>
            ))}

            {menuLists.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding sx={{ display: 'block', bgcolor: pathname.includes(item.href) && !item.isOpen ? 'lightgray' : 'white' }}>
                  <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isSidebarOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => handleClick(item.isOpen, item.setOpen)}
                >
                    <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isSidebarOpen ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} sx={{ opacity: isSidebarOpen ? 1 : 0 }} />
                    {isSidebarOpen ? (item.isOpen ? <ExpandLess /> : <ExpandMore />) : null}
                  </ListItemButton>
                  {item.subItems && (
                    <Collapse in={item.isOpen} timeout="auto" unmountOnExit>
                      {item.subItems.map((subItem, subIndex) => (
                        <Link href={subItem.href} key={subIndex}>
                          <ListItem disablePadding sx={{ display: 'block', bgcolor: pathname === subItem.href ? 'lightgray' : 'white' }}>
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemIcon>{subItem.icon}</ListItemIcon>
                              <ListItemText primary={subItem.text} />
                            </ListItemButton>
                          </ListItem>
                          </Link>
                      ))}
                      </Collapse>
                  )}
                </ListItem>
                </React.Fragment>
            ))}

            <Divider />

            <ListItem disablePadding sx={{ display: 'block', bgcolor: pathname === '' ? 'light' : 'white' }}>
              <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isSidebarOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
                <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={'アカウント'} sx={{ opacity: isSidebarOpen ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>

        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 1, mt: 8 }}>
          {children}
        </Box>

      </Box>
  );
};

export default MiniDrawer;
