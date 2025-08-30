'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoOpenOutline, IoCalendarOutline } from 'react-icons/io5'
import { publicationData } from '../../../public/data/publications.js'

interface Publication {
    year: string
    title: string
    short_description: string
    authors: string
    conference: string
    link: string
}

function PublicationCard({ publication }: { publication: Publication }) {
    const [isAbstractExpanded, setIsAbstractExpanded] = useState(false)

    return (
        <div className="relative h-full flex flex-col">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />

            {/* Content */}
            <div className="relative p-8 h-full flex flex-col">
                {/* Date */}
                <div className="mb-4">
                    <div className="flex items-center gap-2">
                        <IoCalendarOutline className="w-5 h-5 text-lab-accent" />
                        <span className="text-lab-accent font-medium text-sm tracking-wide font-martian-mono">
                            {publication.year}
                        </span>
                    </div>
                </div>

                {/* Paper Title */}
                <h3 className="text-step-3 font-bold text-white mb-3 group-hover:text-lab-green transition-colors duration-300 font-dm-sans leading-tight">
                    {publication.title}
                </h3>

                {/* Conference Name */}
                <div className="mb-4">
                    <span className="text-lab-green font-medium text-sm font-martian-mono">
                        {publication.conference}
                    </span>
                </div>

                {/* Authors */}
                <div className="mb-6">
                    <div className="text-sm text-gray-300 bg-lab-bg/30 px-4 py-3 rounded-xl border border-lab-green/10 backdrop-blur-sm">
                        <span className="font-semibold text-lab-green font-martian-mono text-xs uppercase tracking-wider">
                            Authors
                        </span>
                        <div className="mt-2 font-dm-sans text-gray-200 leading-relaxed">
                            {publication.authors}
                        </div>
                    </div>
                </div>

                {/* Abstract */}
                <div className="mb-6 flex-1">
                    <h4 className="text-lab-accent font-semibold mb-3 font-martian-mono text-sm uppercase tracking-wider">
                        Abstract
                    </h4>
                    <div className="text-gray-300 text-step--1 leading-relaxed font-dm-sans">
                        {!isAbstractExpanded ? (
                            <div>
                                <p
                                    className="overflow-hidden"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical' as const,
                                        lineHeight: '1.5',
                                        maxHeight: '3rem',
                                    }}
                                >
                                    {publication.short_description}
                                </p>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsAbstractExpanded(true)
                                    }}
                                    className="text-lab-accent hover:text-lab-green transition-colors duration-300 font-martian-mono text-sm font-medium mt-2 cursor-pointer"
                                >
                                    View More →
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="whitespace-pre-line">
                                    {publication.short_description}
                                </p>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsAbstractExpanded(false)
                                    }}
                                    className="text-lab-accent hover:text-lab-green transition-colors duration-300 font-martian-mono text-sm font-medium mt-2 cursor-pointer"
                                >
                                    View Less ↑
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* View Publication Button */}
                {publication.link && (
                    <motion.a
                        href={publication.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-lab-green/20 hover:bg-lab-green/30 border border-lab-green/50 hover:border-lab-green rounded-xl px-6 py-3 transition-all duration-300 group/btn mt-auto"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="text-white font-medium font-martian-mono">
                            View Publication
                        </span>
                        <div className="flex items-center gap-2">
                            <IoOpenOutline className="w-4 h-4 text-lab-green" />
                        </div>
                    </motion.a>
                )}
            </div>

            {/* Hover Effect Overlay */}
            <motion.div className="absolute inset-0 bg-gradient-to-br from-lab-green/5 via-transparent to-lab-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    )
}
function FilterChip({
    label,
    isActive,
    onClick,
}: {
    label: string
    isActive: boolean
    onClick: () => void
}) {
    return (
        <motion.button
            onClick={onClick}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border font-martian-mono backdrop-blur-sm ${
                isActive
                    ? 'bg-lab-green/30 text-lab-green border-lab-green/50 shadow-lg shadow-accent-glow scale-105'
                    : 'bg-lab-sec/50 text-gray-400 border-card-border hover:bg-lab-sec hover:border-lab-green/30 hover:text-lab-green hover:scale-105'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {label}
        </motion.button>
    )
}

export default function PublicationsPage() {
    const [selectedYear, setSelectedYear] = useState('All')
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)

    // Transform publications
    const publications: Publication[] = publicationData.map((pub) => ({
        ...pub,
        short_description: pub.short_description || 'No description available',
    }))

    // Get unique years for filters
    const years = [
        'All',
        ...Array.from(new Set(publications.map((pub) => pub.year))).sort(
            (a, b) => b.localeCompare(a)
        ),
    ]

    // Filter publications by year only
    const filteredPublications = publications.filter((publication) => {
        return selectedYear === 'All' || publication.year === selectedYear
    })

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
                    <h1 className="text-step-8 font-bold text-lab-green mb-6 font-martian-mono">
                        Publications
                    </h1>
                    <h2 className="text-step-4 text-white font-dm-sans font-medium mb-4">
                        Research & Academic Contributions
                    </h2>
                </motion.div>
            </div>

            {/* Year Filter */}
            <div className="max-w-7xl mx-auto px-6 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center"
                >
                    <h3 className="text-step-1 font-semibold text-lab-green mb-6 font-martian-mono">
                        Filter by Year
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {years.map((year) => (
                            <FilterChip
                                key={year}
                                label={year}
                                isActive={selectedYear === year}
                                onClick={() => setSelectedYear(year)}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Publications Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto px-6 pb-20"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 [&>*:last-child:nth-child(odd)]:col-span-2 [&>*:last-child:nth-child(odd)]:lg:mx-auto lg:[&>*:last-child:nth-child(odd)]:max-w-[calc(50%-1rem)]">
                    {filteredPublications.length > 0 ? (
                        filteredPublications.map((publication, index) => (
                            <motion.div
                                key={`${publication.title}-${index}`}
                                onHoverStart={() =>
                                    setHoveredCard(
                                        `${publication.title}-${index}`
                                    )
                                }
                                onHoverEnd={() => setHoveredCard(null)}
                                className={`relative overflow-hidden rounded-2xl backdrop-blur-sm border border-lab-accent-border group transition-all duration-500 ${
                                    hoveredCard ===
                                    `${publication.title}-${index}`
                                        ? 'scale-[1.02] shadow-accent-glow'
                                        : ''
                                }`}
                            >
                                <PublicationCard publication={publication} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div className="col-span-full text-center py-20">
                            <div className="text-gray-400 text-xl mb-4 font-dm-sans">
                                No publications found
                            </div>
                            <p className="text-gray-500 font-dm-sans">
                                Try selecting a different year
                            </p>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
