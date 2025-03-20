'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'
import { GiHamburger } from 'react-icons/gi'
import { RxCross2 } from 'react-icons/rx'
import { SiGmail, SiInstagram, SiTwitter, SiWhatsapp } from 'react-icons/si'

const routes = [
    { title: 'Home', route: `/` },
    { title: 'Members', route: `/members` },
    { title: 'Projects', route: `/projects` },
    { title: 'Publications', route: `/publications` },
    { title: 'Events', route: '/events' },
    { title: 'Join Us', route: `/` },
    { title: 'Our History', route: `/history` },
    // {
    //     title: 'Events',
    //     route: `/events`,
    //     subMenus: [
    //         { title: 'Incito', route: `/incito` },
    //         { title: 'Summer', route: `/summer` },
    //         { title: 'HashCode', route: `/hashcode` },
    //         { title: 'RoadShow', route: `/roadshow` },
    //     ],
    // },
    // { title: 'Join Us', route: `/join_us` },
    // { title: 'Articles', route: `/articles` },
]

export const socials = [
    {
        link: 'https://www.instagram.com/innovationlab.pes/',
        name: 'Instagram',
        icon: <SiInstagram />,
    },
    {
        link: 'https://chat.whatsapp.com/ELOGHQUFDjUAWpBmhOMnRR',
        name: 'FAQ Whatsapp Group',
        icon: <SiWhatsapp />,
    },
    {
        link: 'https://twitter.com/innovation_pes',
        name: 'Twitter',
        icon: <SiTwitter />,
    },
    { link: 'mailto:pes.mlab@gmail.com', name: 'Email', icon: <SiGmail /> },
]

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 	  	flexGrow: 1,
// 	},
// 	menuButton: {
// 	  	marginRight: theme.spacing(2),
// 	},
// 	title: {
// 	  	flexGrow: 1,
// 	  	display: 'none',
// 	  	[theme.breakpoints.up('sm')]: {
// 			display: 'block',
// 	  	},
// 	},
// 	search: {
// 	  	position: 'relative',
// 	  	borderRadius: theme.shape.borderRadius,
// 	  	backgroundColor: fade(theme.palette.common.white, 0.15),
// 	  	'&:hover': {
// 			backgroundColor: fade(theme.palette.common.white, 0.25),
// 	  	},
// 	  	marginLeft: 0,
// 	  	width: '100%',
// 	  	[theme.breakpoints.up('sm')]: {
// 			marginLeft: theme.spacing(1),
// 			width: 'auto',
// 	  	},
// 	},
// 	searchIcon: {
// 	  	padding: theme.spacing(0, 2),
// 	  	height: '100%',
// 	  	position: 'absolute',
// 	  	pointerEvents: 'none',
// 	  	display: 'flex',
// 	  	alignItems: 'center',
// 	  	justifyContent: 'center',
// 	},
// 	inputRoot: {
// 	  	color: 'inherit',
// 	},
// 	inputInput: {
// 	  	padding: theme.spacing(1, 1, 1, 0),
// 	  	paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
// 	  	transition: theme.transitions.create('width'),
// 	  	width: '100%',
// 	  	[theme.breakpoints.up('sm')]: {
// 			width: '12ch',
// 			'&:focus': {
// 		  		width: '20ch',
// 			},
// 	  	},
// 	},
// }));

// const makeMenu = (nav, active, mobile) => {
// 	if(!nav.subMenus) {
// 		if(mobile) {
// 			return (
// 				<Link href={nav.route}>
// 					<ListItem button key={nav.title} className='drawerMenu'>
// 						<ListItemText className={`drawerNavText${active == nav.title ? ' active' : ''}`} primary={nav.title} />
// 					</ListItem>
// 				</Link>
// 			)
// 		} else {
// 			return (
// 				<Link href={nav.route}>
// 					<Button disableRipple disableFocusRipple className={`navButton${active == nav.title ? ' active' : ''}`}>
// 						{nav.title}
// 					</Button>
// 				</Link>
// 			)
// 		}
// 	} else {
// 		return (
// 			<PopupState variant="popover" popupId="demo-popup-menu">
// 				{(popupState) => (
// 					<React.Fragment>
// 						{mobile ?
// 								<ListItem button key={nav.title} className='drawerMenu'>
// 									<Link href={nav.route}>
// 										<ListItemText className={`drawerNavText${active == nav.title ? ' active' : ''}`} primary={nav.title} />
// 									</Link>
// 									<IconButton size="small" {...bindTrigger(popupState)}>
// 							  			<ExpandMoreIcon fontSize="inherit" style={{'color': 'white'}}/>
// 									</IconButton>
// 								</ListItem>
// 							:
// 							<Link href={nav.route}>
// 								<Button disableRipple disableFocusRipple className={`navButton${active == nav.title ? ' active' : ''}`}>
// 									{nav.title}
// 								</Button>
// 							</Link>
// 						}
// 						{!mobile? <IconButton size="small" {...bindTrigger(popupState)} className='dropdown-desktop'>
// 							  <ExpandMoreIcon fontSize="inherit" style={{'color': 'white'}}/>
// 						</IconButton>: null}
// 						<Menu {...bindMenu(popupState)} className='navDropdownMenu'>
// 							{nav.subMenus.map(subMenu => (
// 								<MenuItem>
// 									{ mobile? <Link href={subMenu.route}>
// 										<ListItem button key={nav.title} className='drawerMenu'>
// 											<ListItemText className={`drawerNavText${active == subMenu.title ? ' active' : ''}`} primary={subMenu.title} />
// 										</ListItem>
// 									</Link>: <Link href={subMenu.route}>
// 										<Button disableRipple disableFocusRipple className={`navButton`}>
// 											{subMenu.title}
// 										</Button>
// 									</Link> }
// 								</MenuItem>
// 							))}
// 						</Menu>
// 					</React.Fragment>
// 				)}
// 			</PopupState>
// 		)
// 	}
// }

// const handleSearch = (query, searchSettings) => {
// 	query = query.toLowerCase();
// 	const elements = document.getElementsByClassName(searchSettings.targetClass);
// 	for(let ele of elements) {
// 		if(ele.textContent.toLowerCase().search(query) === -1)
// 			ele.style.display = 'none';
// 		else
// 			ele.style.display = searchSettings.default;
// 	}
// }

// function NavBar({ active, search, searchSettings }) {
// 	const [ drawerOpen, setDrawerOpen ] = useState(false);
// 	const classes = useStyles();

//     /* For fancy navbar */
// 	const [_document, set_document] = useState(null)
// 	const [sticky, setSticky] = useState(true);
// 	const [hasInitialised, setHasInitialised] = useState(false)
// 	const [scrollPosition, setScrollPosition] = useState(null);
// 	const [navbarMenu, setNavbarMenu] = useState(null, [false, false, false]);

// 	useEffect(() => {
// 		set_document(document)
// 		setScrollPosition(1)
// 	}, [])

// 	useEffect(() => {
// 		if (scrollPosition) setHasInitialised(true);
// 	}, [scrollPosition])

// 	const getScrollPosition = () => {
// 		const scrollPosition = _document.body.getBoundingClientRect()
//         return scrollPosition.y;

//     }

//     useEffect(() => {
// 		if (_document && scrollPosition != null){
// 			const handleScroll = () => {
// 				const currentScrollPosition = getScrollPosition();
// 				setSticky(currentScrollPosition > scrollPosition);
// 				setScrollPosition(currentScrollPosition);
// 			}
// 			window.addEventListener('scroll', handleScroll);
// 			return () => window.removeEventListener('scroll', handleScroll);
// 		}
// 	}, [sticky, hasInitialised, scrollPosition]);

//     return (
//         <AppBar className='navbar' style={
// 				{transform: sticky ? "translateY(0%)" : "translateY(-100%)",
// 				transition: 'transform 0.3s ease-in',
// 			    position: 'sticky',
//     			top: '0'}
//             }>
//             <Toolbar>
//               	<IconButton onClick={() => { setDrawerOpen(true) }} edge="start" className='menuButton' >
//                 	<MenuIcon />
//               	</IconButton>
// 				<Link href={`/`}>
// 					<IconButton disableFocusRipple edge="start" className='logoButton'>
// 						<img className='logo' src={`/images/mlab/mlab_logo_icon.png`}/>
// 					</IconButton>
// 				</Link>

// 				{navs.map((nav) => (
// 					makeMenu(nav, active, false)
// 				))}

// 				{search ? (
// 					<div className={classes.search}>
// 						<div className={classes.searchIcon}>
// 							<SearchIcon />
// 						</div>
// 						<InputBase
// 							placeholder="Search…"
// 							classes={{
// 								root: classes.inputRoot,
// 								input: classes.inputInput,
// 							}}
// 							inputProps={{ 'aria-label': 'search' }}
// 							onInput={(e) => {handleSearch(e.target.value, searchSettings)}}
// 						/>
// 					</div>) : null}

//             </Toolbar>
// 			<SwipeableDrawer
//       			anchor={'left'}
//       			open={ drawerOpen }
//       			onClose={ () => { setDrawerOpen(false) } }
// 				onOpen={ () => { setDrawerOpen(true) } }
//     		>
// 				<List className='navDrawer'>
// 					<ListItem button className='drawerMenu' style={{borderBottom: '1px solid grey'}}>
// 						<img className='logo' src={`/images/mlab/mlab_logo.png`} style={{width: 250}}/>
// 					</ListItem>
// 					{navs.map((nav) => (
// 						makeMenu(nav, active, true)
// 					))}
// 				</List>
//     		</SwipeableDrawer>
//         </AppBar>
//     );
// }

// css classes at css/navbar.css

function NavBar(props) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [showHeader, setShowHeader] = useState(true)
    const [showContent, setShowContent] = useState(false)

    const handleOpen = () => {
        if (open) {
            setShowContent(false)
            let timer = setTimeout(() => {
                setShowHeader(true)
            }, 500)
        } else {
            setShowHeader(false)
            let timer = setTimeout(() => {
                setShowContent(true)
            }, 350)
        }
        setOpen((p) => !p)
    }

    const pathname = usePathname()

    useEffect(() => {
        const handleRouteChange = async (pathname: string) => {
            const url = 'https://theinnovationlab.in' + pathname
            const cookies = new Cookies()
            const jwt = cookies.get('jwt')
            const username = cookies.get('username')
            let uid = ''

            if (jwt) {
                const decoded: { user_id: string } = jwtDecode(jwt)
                uid = decoded['user_id'].toString()
                const body = {
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString(),
                    uid: uid,
                    name: username,
                    url: url,
                }
                try {
                    await fetch(
                        `https://gamekeeper.theinnovationlab.in/events/`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(body),
                        }
                    )
                } catch (error) {
                    console.error('Error sending event:', error)
                }
            }
        }

        handleRouteChange(pathname)
    }, [pathname])

    return (
        <div
            className={`navbar font-martian-mono  ${
                open ? 'navbar__open' : 'navbar__closed'
            }`}
        >
            {showHeader ? (
                <>
                    {/* navbar before open */}
                    <div className="navbar__closed__menu">
                        <div className="navbar__closed__menu-logo md:hidden flex">
                            <Link href="/">
                                <div className="navbar__logo">
                                    <Image
                                        alt="PES Innovation Lab"
                                        src="/images/mlab/mlab_logo.png"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            </Link>
                            <Link href="/">
                                <div>
                                    <h1 className="lg:text-2xl text-[125%]">
                                        PES Innovation Lab
                                    </h1>
                                </div>
                            </Link>
                            <div
                                className="navbar__menu cursor-pointer"
                                onClick={handleOpen}
                            >
                                {!open && <GiHamburger />}
                            </div>
                        </div>
                        <div className="navbar__closed__menu-logo md:flex hidden">
                            <Link href="/" className=" flex items-center gap-4">
                                <div className="navbar__logo">
                                    <Image
                                        alt="PES Innovation Lab"
                                        src="/images/mlab/mlab_logo.png"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                                <div>
                                    <h1 className="lg:text-2xl text-[125%]">
                                        PES Innovation Lab
                                    </h1>
                                </div>
                            </Link>
                            <div
                                className="navbar__menu cursor-pointer"
                                onClick={handleOpen}
                            >
                                {!open && <GiHamburger />}
                            </div>
                        </div>

                        {/* <div className="navbar__search">
                <input
                  type="text"
                  placeholder="Search"
                  className="p-2 rounded-lg text-black"
                />
              </div> */}
                    </div>
                </>
            ) : (
                <></>
            )}
            {showContent ? (
                <div className="flex flex-col w-[98%] h-full">
                    {/* navbar after open */}
                    <div
                        onClick={handleOpen}
                        className="cursor-pointer navbar_menu w-full flex justify-end md:p-2 p-6"
                    >
                        <RxCross2 className="h-10 w-10" />
                    </div>
                    <div className="flex md:flex-row flex-col justify-center items-center w-full h-full">
                        <div className="navbar__left">
                            <div className="navbar__l__content">
                                <div className="navbar__l__logo">
                                    <Image
                                        alt="PES Innovation Lab"
                                        src="/images/mlab/mlab_logo.png"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="navbar__l__content-title text-center">
                                        PES Innovation Lab
                                    </h1>
                                    <p className="navbar__l__content-tagline">
                                        Estd. 2011
                                    </p>
                                    <div className="navbar__l__content-socials">
                                        {socials.map((s) => {
                                            return (
                                                <a
                                                    className="navbar__l__content-social"
                                                    key={s.name}
                                                    href={s.link}
                                                    referrerPolicy="no-referrer"
                                                    target="_blank"
                                                >
                                                    {s.icon}
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="navbar__right">
                            <div className="navbar__r__routes">
                                {routes.map((r) => {
                                    return (
                                        <Link
                                            key={r.title}
                                            href={r.route}
                                            onClick={handleOpen}
                                        >
                                            <p
                                                // className={
                                                //     usePathname() === r.route
                                                //         ? 'route__active'
                                                //         : 'route__passive'
                                                // }
                                                // Fix this.
                                                className="route_passive"
                                            >
                                                {r.title}
                                            </p>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default NavBar
