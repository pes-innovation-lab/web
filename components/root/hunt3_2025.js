import Image from 'next/image'

export default function Hunt3Video({ onEnded }) {
    return (
        <div className="absolute top-1/4 md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-full md:p-20 space-y-12">
            {/* LOGO */}
            <div className="relative mx-auto left-2 h-48 w-48 sm:h-60 sm:w-60 md:hidden">
                <div
                    className="absolute top-0 left-0 w-full h-1/4 rounded-full
                              bg-gradient-to-b from-white/70 to-transparent 
                              blur-3xl"
                ></div>
                <Image
                    src="/images/mlab/mlab_logo.png"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <video className="w-[90%] mx-auto" autoPlay muted onEnded={onEnded}>
                <source src="/hunt/hunt_tv.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
