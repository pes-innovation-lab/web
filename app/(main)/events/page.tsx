'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    HiChevronRight,
    HiCalendar,
    HiArrowTopRightOnSquare,
} from 'react-icons/hi2'

interface Event {
    id: string
    title: string
    subtitle: string
    description: string
    timing: string
    image: string
    link?: string
    isExternal?: boolean
    features: string[]
}

function Events() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)

    const events: Event[] = [
        {
            id: 'hashcode',
            title: 'HashCode',
            subtitle: 'Annual 24-Hour Hackathon',
            description:
                'Our flagship hackathon where innovation meets execution. Students propose groundbreaking ideas and build solutions across diverse domains with mentorship from industry experts.',
            timing: 'October',
            image: '/images/mlab/hackathon.png',
            link: 'https://hashcode.theinnovationlab.in',
            isExternal: true,
            features: [
                '24-Hour Challenge',
                'Cash Prizes up to ₹1L',
                'Industry Mentors',
                'Multi-Domain Projects',
            ],
        },
        {
            id: 'hunt',
            title: 'The Hunt',
            subtitle: 'Ultimate Treasure Hunt Challenge',
            description:
                'Prove your mettle in our intensive 24-hour online treasure hunt. Top performers get direct interview opportunities for our prestigious internship program.',
            timing: 'March',
            image: '/images/mlab/recruitment.png',
            link: 'https://hunt.theinnovationlab.in',
            isExternal: true,
            features: [
                '24-Hour Online Hunt',
                'Direct Interview Access',
                'Top 15 Participants',
                'Skill Assessment',
            ],
        },
        {
            id: 'recruitment',
            title: 'Summer Internship Recruitment',
            subtitle: 'Join Our Innovation Community',
            description:
                'We seek passionate individuals to join our community. Through aptitude challenges and assessments, we identify those ready to tackle real-world engineering problems.',
            timing: 'March - April',
            image: '/images/mlab/recruitment.png',
            link: '/events/recruitment',
            isExternal: false,
            features: [
                'Aptitude Challenge',
                'Passion Assessment',
                'Real-World Problems',
                'Community Selection',
            ],
        },
        {
            id: 'internship',
            title: 'Summer Internship Program',
            subtitle: 'Cutting-Edge Research Experience',
            description:
                'Work on groundbreaking research projects in various domains for an entire summer.',
            timing: 'June - July',
            image: '/images/mlab/internship.png',
            link: '/events/internship',
            isExternal: false,
            features: [
                'Research Projects',
                'Multiple Domains',
                'Roadshow Presentation',
                'Prototype Development',
            ],
        },
        {
            id: 'roadshow',
            title: 'Roadshow',
            subtitle: 'Innovation Expo & Project Showcase',
            description:
                'Our annual innovation expo where summer interns showcase their groundbreaking projects.',
            timing: 'September - October',
            image: '/images/mlab/roadshow.png',
            link: '/events/roadshow',
            isExternal: false,
            features: [
                'Project Showcase',
                'Expert Feedback',
                'Knowledge Platform',
                'Innovation Expo',
            ],
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    return (
        <div className="min-h-screen bg-lab-bg">
            {/* Hero Section */}
            <div className="pt-20 pb-16 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-step-8 font-bold text-lab-green mb-6">
                        What We Do
                    </h1>
                    <h2 className="text-step-4 text-white font-dm-sans font-medium mb-4">
                        A Year at PES Innovation Lab
                    </h2>
                </motion.div>
            </div>

            {/* Events Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto px-6 pb-20"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 [&>*:last-child:nth-child(odd)]:col-span-2 [&>*:last-child:nth-child(odd)]:lg:mx-auto lg:[&>*:last-child:nth-child(odd)]:max-w-[calc(50%-1rem)]">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            onHoverStart={() => setHoveredCard(event.id)}
                            onHoverEnd={() => setHoveredCard(null)}
                            className={`relative overflow-hidden rounded-2xl backdrop-blur-sm border border-lab-green/20 group cursor-pointer transition-all duration-500 ${
                                hoveredCard === event.id
                                    ? 'scale-[1.02] shadow-2xl shadow-lab-green/20'
                                    : ''
                            }`}
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />

                            {/* Content */}
                            <div className="relative p-8 h-full flex flex-col">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <HiCalendar className="w-5 h-5 text-lab-light-green" />
                                            <span className="text-lab-light-green font-medium text-sm tracking-wide">
                                                {event.timing}
                                            </span>
                                        </div>
                                        <Link
                                            href={event.link || '#'}
                                            target={
                                                event.isExternal
                                                    ? '_blank'
                                                    : '_self'
                                            }
                                            rel={
                                                event.isExternal
                                                    ? 'noopener noreferrer'
                                                    : undefined
                                            }
                                            className="block"
                                        >
                                            <h3 className="text-step-3 font-bold text-white mb-2 group-hover:text-lab-light-green transition-colors duration-300 cursor-pointer hover:text-lab-light-green">
                                                {event.title}
                                            </h3>
                                        </Link>
                                        <p className="text-step-0 text-gray-300 font-medium">
                                            {event.subtitle}
                                        </p>
                                    </div>

                                    {/* Event Image */}
                                    <div className="w-16 h-16 ml-4 rounded-xl overflow-hidden border-2 border-lab-green/30 group-hover:border-lab-green transition-colors duration-300">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-300 text-step--1 leading-relaxed mb-6 flex-1">
                                    {event.description}
                                </p>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-2 mb-6">
                                    {event.features.map(
                                        (feature, featureIndex) => (
                                            <motion.div
                                                key={featureIndex}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay:
                                                        0.3 +
                                                        featureIndex * 0.1,
                                                }}
                                                className="flex items-center gap-2 text-sm text-gray-400"
                                            >
                                                <div className="w-1.5 h-1.5 bg-lab-green rounded-full" />
                                                <span>{feature}</span>
                                            </motion.div>
                                        )
                                    )}
                                </div>

                                {/* CTA Button */}
                                <Link
                                    href={event.link || '#'}
                                    target={
                                        event.isExternal ? '_blank' : '_self'
                                    }
                                    rel={
                                        event.isExternal
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                    className="group/btn"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-between bg-lab-green/20 hover:bg-lab-green/30 border border-lab-green/50 hover:border-lab-green rounded-xl px-6 py-3 transition-all duration-300"
                                    >
                                        <span className="text-white font-medium">
                                            Learn More
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {event.isExternal && (
                                                <HiArrowTopRightOnSquare className="w-4 h-4 text-lab-light-green" />
                                            )}
                                            <HiChevronRight className="w-4 h-4 text-lab-light-green group-hover/btn:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </motion.div>
                                </Link>
                            </div>

                            {/* Hover Effect Overlay */}
                            <motion.div className="absolute inset-0 bg-gradient-to-br from-lab-green/5 via-transparent to-lab-light-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default Events
