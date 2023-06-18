import * as React from "react"
import {useContext, useState} from "react"
import {alpha, styled} from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import InputBase from "@mui/material/InputBase"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import AccountCircle from "@mui/icons-material/AccountCircle"
import MoreIcon from "@mui/icons-material/MoreVert"
import {routes} from "../../routes";
import {useNavigate} from "react-router-dom";
import {auth, AuthContext} from "../../auth/firebaseAuth";
import {Avatar} from "@mui/material";
import {StandaloneSearchBox} from "@react-google-maps/api";
import {MapContext} from "../Map/Map";
import ExploreIcon from '@mui/icons-material/Explore';

const Search = styled("div")(({theme}) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3), width: "auto"
    }
}))

const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit", "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0), // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch"
        }
    }
}))

export function AppMenu() {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const [searchBox, setSearchBox] = useState(null)
    const {setCenter, setZoom} = useContext(MapContext)

    const onPlacesChanged = () => {
        const catchedPlace = searchBox?.getPlaces()[0]
        if (catchedPlace) {
            const location = {
                lat: catchedPlace.geometry.location.lat(),
                lng: catchedPlace.geometry.location.lng()
            }
            console.log(location)
            setZoom(13)
            setCenter(location)
        }
    };
    const onLoad = ref => {
        setSearchBox(ref)
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    function handleLogOut() {
        auth.signOut().then((result) => {
            setCurrentUser(null)
            navigate(routes.loginView);
        }).catch(error => console.log(error.message))
    }

    const menuId = "primary-search-account-menu"
    const renderMenu = (<Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: "top", horizontal: "right"
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: "top", horizontal: "right"
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
        <MenuItem onClick={() => {
            handleMenuClose()
            navigate(routes.accountView)
        }}>Profile</MenuItem>

        <MenuItem onClick={() => {
            handleMenuClose()
            handleLogOut()
        }}>Log out</MenuItem>
    </Menu>)

    const mobileMenuId = "primary-search-account-menu-mobile"
    const renderMobileMenu = (<Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
            vertical: "top", horizontal: "right"
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
            vertical: "top", horizontal: "right"
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
    >
        {
            currentUser &&
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {
                        currentUser?.photoURL ?
                            <Avatar
                                src={currentUser.photoURL}
                                sx={{width: 50, height: 50}}
                            />
                            :
                            <AccountCircle style={{fill: 'white'}}/>
                    }

                </IconButton>
                <p>Profile</p>
            </MenuItem>
        }
    </Menu>)

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                        onClick={() => {
                            document.getElementById('left-main-content')
                                .scrollTo({top: 0, left: 0, behavior: "smooth"})
                        }}
                    >
                        <ExploreIcon fontSize='large' sx={{fill: 'white'}}
                        />
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        fontFamily='Koulen'
                        color='white'
                        sx={{display: {xs: "none", sm: "block"}}}
                    >
                        Travel planner
                    </Typography>
                    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search map"
                                inputProps={{"aria-label": "search"}}
                            />
                        </Search>
                    </StandaloneSearchBox>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: "none", md: "flex"}}}>
                        {currentUser &&
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {
                                    currentUser?.photoURL ?
                                        <Avatar
                                            src={currentUser.photoURL}
                                            sx={{width: 50, height: 50}}
                                        />
                                        :
                                        <AccountCircle fontSize='large' style={{color: 'white'}}/>
                                }
                            </IconButton>
                        }
                    </Box>
                    <Box sx={{display: {xs: "flex", md: "none"}}}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {currentUser && renderMobileMenu}
            {currentUser && renderMenu}
        </Box>
    )
}
