'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SiGithub, SiInstagram, SiLinkedin } from 'react-icons/si'

const Footer = () => {
    const pathname = usePathname()
    const isHome = pathname === '/'

    return (
        <div
            className={`${isHome ? 'snap-start' : ''} bg-black/30 backdrop-blur-sm py-8`}
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-6 text-center">
                    <div className="flex gap-6">
                        <a
                            href="https://github.com/PES-Innovation-Lab"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-lab-accent transition-colors"
                        >
                            <SiGithub size={20} />
                        </a>
                        <a
                            href="https://www.instagram.com/innovationlab.pes"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-lab-accent transition-colors"
                        >
                            <SiInstagram size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/pes-innovation-lab"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-lab-accent transition-colors"
                        >
                            <SiLinkedin size={20} />
                        </a>
                    </div>

                    <div className="text-gray-400 text-xs sm:text-sm">
                        <p>innovationlab@pes.edu</p>
                        <p className="mt-1">
                            Pes University, 100 Feet Ring Rd, Banashankari 3rd
                            Stage, Bengaluru, Karnataka 560085
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
