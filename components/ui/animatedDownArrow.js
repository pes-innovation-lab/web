'use client'

import { useState, useEffect } from 'react'

export default function AnimatedDownArrow({ href = '', top = 90, left = 50 }) {
    const [hidden, setHidden] = useState(false)
    const THRESHOLD = 120
    let scrollTimer

    useEffect(() => {
        const onScroll = () => {
            setHidden(true)
            clearTimeout(scrollTimer)
            scrollTimer = setTimeout(() => {
                if (window.scrollY <= THRESHOLD) {
                    setHidden(false)
                }
            }, 150)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            clearTimeout(scrollTimer)
        }
    }, [])

    const onClick = (e) => {
        if (href?.startsWith('#')) {
            const el = document.querySelector(href)
            if (el) {
                e.preventDefault()
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }

    return (
        <>
            <style jsx global>{`
                .arrow {
                    opacity: 0;
                    position: absolute;
                    left: ${left}%;
                    top: ${top + 5}%;
                    transform-origin: 50% 50%;
                    transform: translate3d(-50%, -50%, 0);
                    pointer-events: none;
                }

                .arrow-first {
                    animation: arrow-movement 2s ease-in-out infinite;
                }
                .arrow-second {
                    animation: arrow-movement 2s 1s ease-in-out infinite;
                }

                .arrow:before,
                .arrow:after {
                    background: var(--lab-green);
                    filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.7));
                    content: '';
                    display: block;
                    height: 2px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 1.5rem;
                }

                .arrow:before {
                    transform: rotate(45deg) translateX(-23%);
                    transform-origin: top left;
                }

                .arrow:after {
                    transform: rotate(-45deg) translateX(23%);
                    transform-origin: top right;
                }

                // Animation
                @keyframes arrow-movement {
                    0% {
                        opacity: 0;
                        top: ${top}%;
                    }
                    70% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `}</style>
            {!hidden && (
                <>
                    <a
                        onClick={onClick}
                        className={`top-[${top - 5}%] left-1/2 w-[50px] h-full absolute z-50`}
                        href={href}
                    ></a>
                    <div className="arrow arrow-first"></div>
                    <div className="arrow arrow-second"></div>
                </>
            )}
        </>
    )
}
