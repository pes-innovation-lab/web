'use client'

import { useState, useEffect } from 'react'
import AboutUs from './aboutUs'
import Hero from './Hero'
import ProfessorsInfo from './Professors'
import Hunt3Video from './hunt3_2025'
import MovingMatrixBG from './aboutUs'

export default function Home() {
    const [isHeroVisible, setIsHeroVisible] = useState(true)
    const [showVideo, setShowVideo] = useState(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [heroFadeOut, setHeroFadeOut] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setHeroFadeOut(true)
            setTimeout(() => {
                setIsHeroVisible(false)
                setShowVideo(true)
                setIsVideoPlaying(true)
            }, 500)
        }, 0)

        return () => clearTimeout(timer)
    }, [])

    const handleVideoEnd = () => {
        setIsHeroVisible(true)
        setShowVideo(false)
        setIsVideoPlaying(false)
        setHeroFadeOut(false)
    }

    const toggleVideo = () => {
        setShowVideo(!showVideo)
        setIsVideoPlaying(!isVideoPlaying)
    }

    return (
        <div className="bg-lab-bg pt-16 text-white">
            {/* HERO SECTION */}
            {isHeroVisible && (
                <div className={heroFadeOut ? 'fade-out' : ''}>
                    <Hero />
                </div>
            )}

            {/* VIDEO SECTION */}
            {showVideo && (
                <div className="fade-in h-screen">
                    <Hunt3Video onEnded={handleVideoEnd} />
                </div>
            )}

            {/* WATCH AGAIN BUTTON */}
            {!isHeroVisible && !showVideo && !isVideoPlaying && (
                <div className="text-center mt-4">
                    <button
                        onClick={toggleVideo}
                        className="bg-[#8bc34a] text-white py-2 px-4 rounded"
                    >
                        Watch Again
                    </button>
                </div>
            )}

            {/* ABOUT US SECTION  */}
            <AboutUs />

            {/* PROFESSOR INFO *
            <ProfessorsInfo />
*/}
            <style jsx>{`
                .fade-in {
                    opacity: 0;
                    animation: fadeIn 1s forwards;
                }

                @keyframes fadeIn {
                    to {
                        opacity: 1;
                    }
                }

                .fade-out {
                    opacity: 1;
                    animation: fadeOut 1s forwards;
                }

                @keyframes fadeOut {
                    to {
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    )
}
