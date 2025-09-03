'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoClose } from 'react-icons/io5'
import {
    SiGmail,
    SiInstagram,
    SiTwitter,
    SiWhatsapp,
    SiLinkedin,
    SiGithub,
} from 'react-icons/si'

const routes = [
    { title: 'Home', route: `/` },
    { title: 'Members', route: `/members` },
    { title: 'Projects', route: `/projects` },
    { title: 'Publications', route: `/publications` },
    { title: 'Events', route: '/events' },
    { title: 'Blog', route: '/blog' },
    { title: 'Our History', route: `/history` },
]

export const socials = [
    {
        link: 'https://www.instagram.com/innovationlab.pes/',
        name: 'Instagram',
        icon: <SiInstagram size={18} />,
    },
    {
        link: 'https://www.linkedin.com/company/pes-innovation-lab',
        name: 'LinkedIn',
        icon: <SiLinkedin size={18} />,
    },
    {
        link: 'https://github.com/PES-Innovation-Lab',
        name: 'GitHub',
        icon: <SiGithub size={18} />,
    },
    {
        link: 'https://chat.whatsapp.com/ELOGHQUFDjUAWpBmhOMnRR',
        name: 'FAQ Whatsapp Group',
        icon: <SiWhatsapp size={18} />,
    },
    {
        link: 'https://twitter.com/innovation_pes',
        name: 'Twitter',
        icon: <SiTwitter size={18} />,
    },
    {
        link: 'mailto:innovationlab@pes.edu',
        name: 'Email',
        icon: <SiGmail size={18} />,
    },
]

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    //close mobile menu
    useEffect(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false)
        }
    }, [pathname])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    // need to add the right link here
    const JoinUsButton = ({ isMobile = false }) => (
        <Link href="/events/recruitment">
            <span
                className={`block whitespace-nowrap bg-lab-green text-black font-bold rounded-md hover:bg-green-400 transition-colors duration-300 ${isMobile ? 'text-lg px-6 py-3' : 'text-sm px-4 py-2'}`}
            >
                Join Us
            </span>
        </Link>
    )

    return (
        <>
            <header className="sticky top-0 z-50 px-3 bg-black/80 backdrop-blur-lg border-b border-b-navbar-border font-martian-mono">
                <div className="relative sm:px-10 flex justify-between items-center py-3 text-white">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative h-8 w-8">
                            <Image
                                alt="PES Innovation Lab Logo"
                                src="/images/mlab/mlab_logo.png"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                        <h1 className="hidden sm:block text-lg md:text-xl font-bold">
                            PES Innovation Lab
                        </h1>
                    </Link>

                    <h1 className="sm:hidden absolute left-1/2 -translate-x-1/2  font-bold">
                        Innovation Lab
                    </h1>

                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        {routes.map((route) => (
                            <Link key={route.title} href={route.route}>
                                <span
                                    className={`relative transition-colors duration-300 hover:text-lab-green ${
                                        pathname === route.route
                                            ? 'text-lab-green font-semibold'
                                            : 'text-gray-300'
                                    }`}
                                >
                                    {route.title}
                                    {pathname === route.route && (
                                        <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-lab-green rounded-full" />
                                    )}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-5">
                        <div className="flex items-center gap-4 text-gray-400">
                            {socials.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.link}
                                    referrerPolicy="no-referrer"
                                    target="_blank"
                                    className="hover:text-lab-green transition-colors duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                        <JoinUsButton />
                    </div>

                    <div className="md:hidden">
                        <button onClick={toggleMenu} aria-label="Open menu">
                            <GiHamburgerMenu size={24} />
                        </button>
                    </div>
                </div>
            </header>

            <div
                onClick={toggleMenu}
                className={`fixed inset-0 bg-black/70 z-50 transition-opacity duration-300 ease-in-out md:hidden ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            />

            <div
                className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-black border-l border-green-900/50 shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-end mb-8">
                        <button onClick={toggleMenu} aria-label="Close menu">
                            <IoClose size={30} className="text-white" />
                        </button>
                    </div>

                    <nav className="flex flex-col items-center flex-grow gap-6 text-white text-xl">
                        {routes.map((r) => (
                            <Link key={r.title} href={r.route}>
                                <p
                                    className={
                                        pathname === r.route
                                            ? 'text-lab-green font-bold'
                                            : ''
                                    }
                                >
                                    {r.title}
                                </p>
                            </Link>
                        ))}
                    </nav>

                    <div className="flex flex-col items-center gap-8">
                        <JoinUsButton isMobile={true} />
                        <div className="flex justify-center items-center gap-6 text-white">
                            {socials.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.link}
                                    referrerPolicy="no-referrer"
                                    target="_blank"
                                    className="hover:text-lab-green transition-colors duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar
