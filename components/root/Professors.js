'use client'
import Image from 'next/image'
import { useState } from 'react'
import ProfessorSectionRight from './ProfessorSectionRight'

const profData = [
    {
        name: 'Prof. Rajasekar M',
        designation: 'Associate Professor',
        org: 'PES University',
        description:
            'Prof. M Rajasekar is an Associate Professor in the department of Electronics and Communication Engineering at PES University. He is an alumnus of IIT Madras (Computer Science and Engineering). He brings with him over two decades of rich and varied experience ranging from combatant in Indian Air Force to Systems Engineer and Project Manager in the IT Industry. He manages the PES Innovation Lab at the PES University. He has been actively involved in various projects undertaken at PES Innovation Lab. His research interests include wireless communications, embedded systems and healthcare systems. He handholds student projects in several domains viz. Robotics, IoT, Machine Learning, Sensor Networks and Virtual Reality. Recently, he presented his project works in the International Conferences (TENCON) held in Singapore, Malaysia and Jeju,South Korea. He is an astute listener and motivator.',
        image: `/images/mlab/Rajasekar_profile.jpg`,
    },
    {
        name: 'Dr. Venkatarangan MJ',
        designation: 'Professor',
        org: 'PES University',
        description:
            "After leaving Philips in 2015 to follow his passion towards teaching and research, Dr. Venkatarangan joined PES University as the Associate Professor in EEE to focus on Embedded Systems stream. Prior to joining PES University, he spent 20 years in Tektronix, Siemens, HCL Technologies and Philips working in India and abroad serving in roles right from Software Engineer to System Architect. As System Architect he was on technical lead for projects across sites and also supported cross functions like program or purchase management, quality and product strategy for platform evaluation, supplier evaluation and product road-mapping. A significant achievement has been to lead as Architect for first Digital TV for US market and also to develop MP3 Audio products adhering to Microsoft PlaysForSure specifications. Rangan is an alumnus of Chinese University of Hong Kong where he completed is PhD and holds M.Tech and B.E from Mysore University. He current teaches Microcontroller and Applications, Signals and Systems, 'C' Programming and Intoduction to Robotics. His research interests include embedded systems, IoT, Robotics, Automation and Sensor networks.He supports the PES Innovation Lab activities and summer internship projects in domains of embedded systems, IoT Robotics and Automation.",
        image: `/images/mlab/Venkatarangan_profile.jpg`,
    },
    {
        name: 'Dr. A Srinivas',
        designation: 'Founder',
        org: 'PES Innovation Lab',
        description:
            'Dr. A Srinivas is the faculty founder of PES Innovation Lab (formerly known as Microsoft Innovation Lab). He is presently the Dean, School of Engineering in Dayananda Sagar University. He has worked for 10 years in Companies/Research Organizations Such as Tata Consulting Engineers, Centre for AI & amp; Robotics (DRDO), Philips Software Centre and Nortel Networks (Sydney,Australia). Academic experience of 19 yrs with KREC, Surathkal, Amrita University, PES University and Monash University (Melbourne, Australia). His Areas of Research Interest: Wireless Networks, Healthcare Informatics. He is extremely passionate about promoting Undergraduate Research.',
        image: `/images/mlab/Srinivas_profile.jpg`,
    },
]

export default function ProfessorsInfo() {
    const [professorInView, setProfessorInView] = useState(profData[0].name)

    return (
        <>
            <div className="bg-black p-8">
                <h2 className="text-center text-step-6">PROFESSORS</h2>
            </div>

            <div className="flex flex-col md:flex-row">
                {/* LEFT STICKY CONTAINER */}
                <div className="sticky top-16 hidden h-screen flex-1 bg-black md:block">
                    <div className="grid h-full place-items-center">
                        <div className="relative h-3/4 w-full md:h-1/3 md:w-1/3">
                            <Image
                                src={
                                    profData[
                                        profData.findIndex(
                                            (p) => p.name === professorInView
                                        )
                                    ].image
                                }
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT NOT STICKY CONTAINER */}
                <div className="flex-1">
                    {profData.map((prof) => {
                        // Section for each prof
                        return (
                            <ProfessorSectionRight
                                key={prof.name}
                                prof={prof}
                                setProfessorInView={setProfessorInView}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
