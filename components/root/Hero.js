'use client'

import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
    const ref = useRef(null)
    let [screenDim, setScreenDim] = useState({
        x: 0,
        y: 0,
    })

    const moveFGTextPercX = useMotionValue(0)
    const moveBGTextPercX = useMotionValue(0)

    const transformedFGX = useSpring(moveFGTextPercX, {
        stiffness: 100,
        damping: 50,
    })
    const transformedBGX = useSpring(moveBGTextPercX, {
        stiffness: 100,
        damping: 40,
    })

    const fgTransform = useMotionTemplate`translate(${transformedFGX}%, 0)`
    const bgTransform = useMotionTemplate`translate(${transformedBGX}%, 0)`

    const handleMouseMove = (e) => {
        // e.pageX
        const moveX = (e.pageX / screenDim.x) * 66

        moveFGTextPercX.set(-moveX)
        moveBGTextPercX.set(-moveX)
    }

    useEffect(() => {
        if (ref.current != null) {
            // ;
            setScreenDim({
                x: window.innerWidth,
                y: window.innerHeight,
            })
        }
    }, [ref.current])

    return (
        <div className="min-h-screen">
            <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
                {/* LOGO */}
                <div className="relative left-2 h-48 w-48 sm:h-60 sm:w-60">
                    <Image
                        src="/images/mlab/mlab_logo.png"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                {/* TITLE */}
                <h1
                    className="relative w-full -rotate-6 overflow-hidden pt-8 text-center font-bold text-lab-green"
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    ref={ref}
                >
                    <motion.div
                        className="absolute left-0 top-4 z-0 flex gap-32 text-step-11 text-lab-sec md:-top-16"
                        style={{
                            transform: bgTransform,
                        }}
                    >
                        <p className="flex-shrink-0">Research.</p>
                        <p className="flex-shrink-0">Knowledge.</p>
                        <p className="flex-shrink-0">Innovation.</p>
                    </motion.div>
                    <motion.div
                        className="relative z-10 flex w-[300vw] text-step-9"
                        style={{
                            transform: fgTransform,
                        }}
                    >
                        <p className="w-[100vw] flex-shrink-0">
                            PES Innovation Lab
                        </p>
                        <p className="w-[100vw] flex-shrink-0">
                            PES Innovation Lab
                        </p>
                        <p className="w-[100vw] flex-shrink-0">
                            PES Innovation Lab
                        </p>
                    </motion.div>
                </h1>
                {/* DESC */}
                <p className="mt-8 max-w-3xl pt-16 text-center font-martian-mono text-step-2">
                    We are a student community dedicated to cultivating the
                    spirit of research and innovation in budding engineers.
                </p>
            </div>
        </div>
    )
}
