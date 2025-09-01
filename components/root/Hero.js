'use client'

import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import AnimatedDownArrow from '../ui/animatedDownArrow'

export default function Hero() {
    const ref = useRef(null)
    const interactingRef = useRef(false)
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

    const setFromX = (clientX) => {
        if (!screenDim.x) return
        const moveX = (clientX / screenDim.x) * 66
        moveFGTextPercX.set(-moveX)
        moveBGTextPercX.set(-moveX)
    }

    const handleMouseMove = (e) => setFromX(e.pageX)
    const handleTouchMove = (e) => {
        if (e.touches && e.touches[0]) setFromX(e.touches[0].clientX)
    }
    /*
        const handleMouseMove = (e) => {
            // e.pageX
            const moveX = (e.pageX / screenDim.x) * 66
    
            moveFGTextPercX.set(-moveX)
            moveBGTextPercX.set(-moveX)
        } */

    useEffect(() => {
        if (ref.current != null) {
            // ;
            setScreenDim({
                x: window.innerWidth,
                y: window.innerHeight,
            })
            const onResize = () =>
                setScreenDim({ x: window.innerWidth, y: window.innerHeight })
            window.addEventListener('resize', onResize)
            return () => window.removeEventListener('resize', onResize)
        }
    }, [ref.current])

    useEffect(() => {
        const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) return

        let index = 0
        const positions = [0, -33, -67]

        const id = setInterval(() => {
            if (interactingRef.current) return
            moveFGTextPercX.set(positions[index])
            moveBGTextPercX.set(positions[index])

            index = (index + 1) % positions.length
        }, 6000)
        return () => clearInterval(id)
    }, [])

    return (
        <div className="min-h-screen">
            <div className="flex h-full flex-col items-center justify-center gap-2 p-2">
                {/* LOGO */}
                <div className="relative left-2 h-48 w-48 sm:h-60 sm:w-60">
                    <div
                        className="absolute top-0 left-0 w-full h-1/4 rounded-full
                  bg-gradient-to-b from-white/80 to-transparent 
                  blur-3xl"
                    ></div>
                    <Image
                        src="/images/mlab/mlab_logo.png"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                {/* TITLE */}
                <h1
                    className="relative w-full -rotate-6 overflow-hidden pt-8 text-center font-bold"
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    onMouseEnter={() => (interactingRef.current = true)}
                    onMouseLeave={() => (interactingRef.current = false)}
                    onTouchStart={() => (interactingRef.current = true)}
                    onTouchEnd={() => (interactingRef.current = false)}
                    ref={ref}
                >
                    <motion.div
                        className="absolute left-0 top-4 z-0 flex gap-16 text-step-11 text-lab-sec md:-top-16"
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
                        {/* Gradient cuts across text orientation */}
                        <p
                            className="w-[100vw] flex-shrink-0
                        bg-gradient-to-br from-emerald-600 via-green-500 to-lime-400 
               bg-clip-text text-transparent
               drop-shadow-[0_0_4px_rgba(34,197,94,0.7)] md:drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]"
                        >
                            PES Innovation Lab
                        </p>
                        <p
                            className="w-[100vw] flex-shrink-0
                        bg-gradient-to-br from-emerald-600 via-green-500 to-lime-400 
               bg-clip-text text-transparent
               drop-shadow-[0_0_4px_rgba(34,197,94,0.7)] md:drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]"
                        >
                            PES Innovation Lab
                        </p>
                        <p
                            className="w-[100vw] flex-shrink-0
                        bg-gradient-to-br from-emerald-600 via-green-500 to-lime-400 
               bg-clip-text text-transparent
               drop-shadow-[0_0_4px_rgba(34,197,94,0.7)] md:drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]"
                        >
                            PES Innovation Lab
                        </p>
                    </motion.div>
                </h1>
                {/* DESC */}
                <p className="mt-8 md:mt-24 max-w-3xl text-center font-martian-mono md:text-step-2">
                    We are a student community dedicated to cultivating the
                    spirit of research and innovation in budding engineers.
                </p>
            </div>
            <AnimatedDownArrow href="#landingAbout" />
        </div>
    )
}
