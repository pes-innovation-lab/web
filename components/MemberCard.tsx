import React, { useEffect, useState, useRef } from 'react'

export default function MemberCard({
    name,
    pfp,
    gmail,
    github,
    linkedin,
    course,
    batch,
}) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const img = imgRef.current
        if (img && img.complete && img.naturalHeight !== 0) {
            setImageLoaded(true)
            return
        }
        setImageLoaded(false)
    }, [name])

    return (
        <div className="group relative items-center justify-center overflow-hidden rounded-xl bg-black shadow-2xl transition-all duration-500 hover:shadow-xl hover:shadow-black/10">
            {!imageLoaded && (
                <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-b from-gray-700/40 via-gray-900/70 to-black/80 backdrop-blur-sm" />
            )}

            <div className="h-96 w-72">
                <img
                    ref={imgRef}
                    src={pfp}
                    alt={name}
                    className={`h-full w-full object-cover transition-transform duration-500 ${
                        imageLoaded
                            ? 'opacity-100 scale-100 group-hover:scale-125'
                            : 'opacity-0 scale-105'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>

            {imageLoaded && (
                <div className="absolute inset-0 flex translate-y-[48%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 z-10">
                    <h1 className="mb-10 text-3xl font-bold text-white">
                        {name}
                    </h1>
                    <p className="mb-3 text-lg text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {course} | {batch}
                    </p>
                    <div className="flex items-center justify-center">
                        <a
                            className="mr-6 text-neutral-600 dark:text-neutral-200 cursor-pointer"
                            href={`mailto:${gmail}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                            </svg>
                        </a>
                        <a
                            className="mr-6 text-neutral-600 dark:text-neutral-200 cursor-pointer"
                            href={linkedin}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            </svg>
                        </a>
                        <a
                            className="text-neutral-600 dark:text-neutral-200 cursor-pointer"
                            href={github}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}
