import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,

  UserCircleIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

// import { MenuButton, MenuItems } from "@headlessui/react";
// import { Avatar } from "flowbite-react";
import {useDispatch, useSelector } from "react-redux";
// import { logout} from "../../redux/authSlice.js"; // Adjust import according to your file structure
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="large" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-black"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Study Material
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""}`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""}`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>

        {/* Desktop Menu */}
        <MenuList className="hidden rounded-xl lg:block mt-3">
          <MenuItem>React</MenuItem>
          <MenuItem>TailwindCSS</MenuItem>
        </MenuList>
      </Menu>

      {/* Mobile Menu */}
      <div className="block lg:hidden text-black">
        <Collapse open={isMobileMenuOpen}>
          <MenuItem>React</MenuItem>
          <MenuItem>TailwindCSS</MenuItem>
        </Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
      {/* Home */}
      <Typography as="div" variant="large" color="blue-gray" className="font-medium">
        <Link to="/">
          <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
        </Link>
      </Typography>

      {/* About */}
      <Typography as="div" variant="large" color="blue-gray" className="font-medium">
        <Link to="/about">
          <ListItem className="flex items-center gap-2 py-2 pr-4">About</ListItem>
        </Link>
      </Typography>
      <Typography as="div" variant="large" color="blue-gray" className="font-medium">
        <Link to="/about">
          <ListItem className="flex items-center gap-2 py-2 pr-4">Contest</ListItem>
        </Link>
      </Typography>
      

      {/* NavListMenu */}
      <NavListMenu />

      {/* Docs */}
      <Typography as="div" variant="large" color="blue-gray" className="font-medium">
        <Link to="/about">
          <ListItem className="flex items-center gap-2 py-2 pr-4">Interview</ListItem>
        </Link>
      </Typography>
    </List>
  );
}



const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: "/profile",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    link: "/edit-profile",
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    link: "/inbox",
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    link: "/help",
  },
];

function ProfileMenu() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 border-2 border-gray-400 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt=""
            width={"30px"}
            style={{ borderRadius: "20px" }}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {/* Menu Items */}
        {profileMenuItems.map(({ label, icon, link }) => {
          return (
            <Link to={link} key={label} onClick={closeMenu}>
              <MenuItem className="flex items-center gap-2 rounded hover:bg-gray-100">
                {React.createElement(icon, {
                  className: "h-4 w-4",
                  strokeWidth: 2,
                })}
                <Typography as="span" variant="small" className="font-normal">
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          );
        })}

        {/* Logout Item */}
        <MenuItem
          onClick={handleLogout}
          className="hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 flex items-center gap-2 p-3 rounded"
        >
          {React.createElement(PowerIcon, {
            className: "h-4 w-4 text-red-500",
            strokeWidth: 2,
          })}
          <Typography as="span" variant="small" className="font-normal text-red-500">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}


export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Access state from Redux
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="px-2 lg:px-8 max-w-[100%] py-3 rounded-none shadow-none border-b border-gray-500">
      <div className="ml-3 lg:mx-4 lg:px-2 flex items-center justify-between text-black ">
        {/* Logo */}
        <div>
          <Typography
            as="a"
            href="/"
           
            className="mr-4 cursor-pointer py-1.5 text-xl font-bold"
          >
            Placement
          </Typography>
        </div>
        {/* Navigation List */}
        <div className="flex flex-row gap-2">
          <div className="hidden lg:block">
            <NavList />
          </div>

          {/* Login or User Dropdown */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <ProfileMenu />
            ) : (
              <Button
                variant=""
                size="sm"
                onClick={handleLogin}
                className="bg-black rounded-3xl text-sm"
              >
                Log In
              </Button>
            )}
          </div>

          {/* Mobile Navigation Icon */}
          <IconButton 
            variant="text"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>

      {/* Mobile View Navigation */}
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
