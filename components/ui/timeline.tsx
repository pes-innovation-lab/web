'use client'
import { useScroll, useTransform, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

interface TimelineEntry {
    title: string
    content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null) // this kinda annoying man
    const containerRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect()
            setHeight(Math.max(0, rect.height - 150)) // prevent overflow in mobile
        }
    }, [ref])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 10%', 'end 50%'],
    })
    const { scrollY } = useScroll()

    const headerScale = useTransform(scrollY, [0, 400], [1, 0.7])
    const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.8])
    const subtitleScale = useTransform(scrollY, [0, 400], [1, 0.8])
    const subtitleOpacity = useTransform(scrollY, [0, 200], [1, 0.6])
    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

    return (
        <div
            className="w-full bg-lab-bg font-martian-mono md:px-10"
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto pt-32 pb-8 px-4 md:px-8 lg:px-10">
                <motion.div
                    ref={headerRef}
                    className="text-center mb-8 min-h-[60vh] flex flex-col justify-center relative"
                    style={{
                        scale: headerScale,
                        opacity: headerOpacity,
                    }}
                >
                    <motion.h2
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-lab-green mb-8 font-martian-mono"
                        style={{
                            scale: headerScale,
                        }}
                    >
                        The History of PIL
                    </motion.h2>
                    <motion.p
                        className="text-gray-50 text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed font-medium"
                        style={{
                            scale: subtitleScale,
                            opacity: subtitleOpacity,
                        }}
                    >
                        Walk through the events that forged PIL into what it is
                        today.
                    </motion.p>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-8 left-0 right-0 text-lab-light-green flex flex-col items-center"
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        style={{
                            opacity: subtitleOpacity,
                            scale: subtitleScale,
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 md:h-10 md:w-10 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                        <div className="text-center text-sm md:text-base mt-2 font-medium whitespace-nowrap">
                            Scroll to explore
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10"
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-lab-bg flex items-center justify-center border-2 border-lab-green">
                                <div className="h-4 w-4 rounded-full bg-lab-light-green border border-lab-green p-2" />
                            </div>
                            <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-lab-light-green">
                                {item.title}
                            </h3>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-lab-light-green">
                                {item.title}
                            </h3>
                            {item.content}
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + 'px',
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent from-[0%] via-lab-sec to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-lab-light-green via-lab-green to-lab-light-green from-[0%] via-[50%] to-[100%] rounded-full"
                    />
                </div>
            </div>
        </div>
    )
}
