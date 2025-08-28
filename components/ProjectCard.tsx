import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ title, poster_url }) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const img = imgRef.current
        if (img && img.complete && img.naturalHeight !== 0) {
            setImageLoaded(true)
            return
        }
        setImageLoaded(false)
    }, [title])

    return (
        <motion.div className="group relative cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-black shadow-2xl transition-all duration-500 hover:shadow-xl hover:shadow-black/30">
            {!imageLoaded && (
                <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-b from-gray-700/40 via-gray-900/70 to-black/80 backdrop-blur-sm" />
            )}
            <img
                ref={imgRef}
                src={poster_url}
                alt={title}
                className={`aspect-auto h-auto w-full object-cover transition-transform duration-500 ${
                    imageLoaded
                        ? 'opacity-100 scale-100 group-hover:scale-125'
                        : 'opacity-0 scale-105'
                } phone:h-[350px] lg:h-[400px]`}
                onLoad={() => {
                    setImageLoaded(true)
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: imageLoaded ? 1 : 0,
                    y: imageLoaded ? 0 : 20,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0 flex translate-y-[40%] flex-col items-center justify-end px-2 text-center transition-all duration-500"
            >
                <h1 className="mb-7 font-martian-mono text-xl font-bold text-gray-300 lg:text-3xl">
                    {title.toUpperCase()}
                </h1>
            </motion.div>
        </motion.div>
    )
}
