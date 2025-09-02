import ScrambleText from '../ui/scrambleText'

export default function AboutUs() {
    return (
        <>
            <style jsx global>{`
                #landingAbout {
                    perspective: 100rem;
                    -webkit-perspective: 100rem;
                    transform-style: preserve-3d;
                    -webkit-transform-style: preserve-3d;
                }

                .grid-container {
                    --grid: 10rem;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;

                    transform-style: preserve-3d;
                    -webkit-transform-style: preserve-3d;

                    animation: rotate 100s linear infinite forwards;
                }

                .grid-container .plane {
                    --dir: 1;
                    width: 200%;
                    height: 120%;
                    min-height: 70rem;
                    position: absolute;
                    bottom: 0;

                    left: 50%;
                    transform-style: preserve-3d;
                    transform-origin: bottom center;

                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;

                    transform: translate3d(-50%, 0, 0) rotateX(85deg);
                }

                .grid-container .plane:last-child {
                    --dir: -1;
                    top: 0;
                    transform-origin: top center;
                    transform: translate3d(-50%, 0, 0) rotateX(-85deg);
                }

                .grid-container .plane:last-child > *::after {
                    background-image: linear-gradient(
                        to top,
                        rgba(0, 0, 0, 255) var(--grid),
                        rgba(0, 0, 0, 0)
                    );
                }

                .grid-container .plane > * {
                    transform-style: preserve-3d;
                    height: 100%;
                    width: 100%;
                    position: absolute;
                }

                .grid-container .plane > *::before,
                .grid-container .plane > *::after {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                }

                .grid-container .plane > *::before {
                    background-image:
                        repeating-linear-gradient(
                            to left,
                            var(--lab-green),
                            var(--lab-green) 4px,
                            transparent 4px,
                            transparent var(--grid)
                        ),
                        repeating-linear-gradient(
                            to bottom,
                            var(--lab-green),
                            var(--lab-green) 4px,
                            transparent 4px,
                            transparent var(--grid)
                        );
                    animation: move 1s linear infinite forwards;

                    will-change: transform;
                }

                .grid-container .plane > *::after {
                    background-image: linear-gradient(
                        to bottom,
                        rgba(0, 0, 0, 255) var(--grid),
                        rgba(0, 0, 0, 0)
                    );
                    z-index: 10;
                    transform: translateZ(1px);
                }

                .grid-container .plane .glow {
                    filter: blur(0.5rem);
                    z-index: 11;
                    mix-blend-mode: screen;
                }
                @supports (mix-blend-mode: plus-lighter) {
                    .grid-container .plane .glow {
                        mix-blend-mode: plus-lighter;
                    }
                }

                @keyframes move {
                    from {
                        transform: translateY(0px);
                    }
                    to {
                        transform: translateY(calc(var(--grid) * var(--dir)));
                    }
                }

                @media (max-width: 640px) {
                    #landingAbout {
                        perspective: 70rem;
                    }
                    .grid-container {
                        --grid: 3rem;
                    }
                    .grid-container .plane {
                        min-height: 40rem;
                    }
                }

                .layers {
                    position: relative;
                }

                .layers::before,
                .layers::after {
                    content: attr(data-text);
                    position: absolute;
                    width: 110%;
                }

                .layers::before {
                    top: 10px;
                    left: 15px;
                    color: #e0287d;
                }

                .layers::after {
                    top: 5px;
                    left: -10px;
                    color: #1bc7fb;
                }

                .single-path {
                    clip-path: polygon(
                        0% 12%,
                        53% 12%,
                        53% 26%,
                        25% 26%,
                        25% 86%,
                        31% 86%,
                        31% 0%,
                        53% 0%,
                        53% 84%,
                        92% 84%,
                        92% 82%,
                        70% 82%,
                        70% 29%,
                        78% 29%,
                        78% 65%,
                        69% 65%,
                        69% 66%,
                        77% 66%,
                        77% 45%,
                        85% 45%,
                        85% 26%,
                        97% 26%,
                        97% 28%,
                        84% 28%,
                        84% 34%,
                        54% 34%,
                        54% 89%,
                        30% 89%,
                        30% 58%,
                        83% 58%,
                        83% 5%,
                        68% 5%,
                        68% 36%,
                        62% 36%,
                        62% 1%,
                        12% 1%,
                        12% 34%,
                        60% 34%,
                        60% 57%,
                        98% 57%,
                        98% 83%,
                        1% 83%,
                        1% 53%,
                        91% 53%,
                        91% 84%,
                        8% 84%,
                        8% 83%,
                        4% 83%
                    );
                }

                .paths {
                    animation: paths 5s step-end infinite;
                }

                @keyframes paths {
                    0% {
                        clip-path: polygon(
                            0% 43%,
                            83% 43%,
                            83% 22%,
                            23% 22%,
                            23% 24%,
                            91% 24%,
                            91% 26%,
                            18% 26%,
                            18% 83%,
                            29% 83%,
                            29% 17%,
                            41% 17%,
                            41% 39%,
                            18% 39%,
                            18% 82%,
                            54% 82%,
                            54% 88%,
                            19% 88%,
                            19% 4%,
                            39% 4%,
                            39% 14%,
                            76% 14%,
                            76% 52%,
                            23% 52%,
                            23% 35%,
                            19% 35%,
                            19% 8%,
                            36% 8%,
                            36% 31%,
                            73% 31%,
                            73% 16%,
                            1% 16%,
                            1% 56%,
                            50% 56%,
                            50% 8%
                        );
                    }

                    5% {
                        clip-path: polygon(
                            0% 29%,
                            44% 29%,
                            44% 83%,
                            94% 83%,
                            94% 56%,
                            11% 56%,
                            11% 64%,
                            94% 64%,
                            94% 70%,
                            88% 70%,
                            88% 32%,
                            18% 32%,
                            18% 96%,
                            10% 96%,
                            10% 62%,
                            9% 62%,
                            9% 84%,
                            68% 84%,
                            68% 50%,
                            52% 50%,
                            52% 55%,
                            35% 55%,
                            35% 87%,
                            25% 87%,
                            25% 39%,
                            15% 39%,
                            15% 88%,
                            52% 88%
                        );
                    }

                    30% {
                        clip-path: polygon(
                            0% 53%,
                            93% 53%,
                            93% 62%,
                            68% 62%,
                            68% 37%,
                            97% 37%,
                            97% 89%,
                            13% 89%,
                            13% 45%,
                            51% 45%,
                            51% 88%,
                            17% 88%,
                            17% 54%,
                            81% 54%,
                            81% 75%,
                            79% 75%,
                            79% 76%,
                            38% 76%,
                            38% 28%,
                            61% 28%,
                            61% 12%,
                            55% 12%,
                            55% 62%,
                            68% 62%,
                            68% 51%,
                            0% 51%,
                            0% 92%,
                            63% 92%,
                            63% 4%,
                            65% 4%
                        );
                    }

                    45% {
                        clip-path: polygon(
                            0% 33%,
                            2% 33%,
                            2% 69%,
                            58% 69%,
                            58% 94%,
                            55% 94%,
                            55% 25%,
                            33% 25%,
                            33% 85%,
                            16% 85%,
                            16% 19%,
                            5% 19%,
                            5% 20%,
                            79% 20%,
                            79% 96%,
                            93% 96%,
                            93% 50%,
                            5% 50%,
                            5% 74%,
                            55% 74%,
                            55% 57%,
                            96% 57%,
                            96% 59%,
                            87% 59%,
                            87% 65%,
                            82% 65%,
                            82% 39%,
                            63% 39%,
                            63% 92%,
                            4% 92%,
                            4% 36%,
                            24% 36%,
                            24% 70%,
                            1% 70%,
                            1% 43%,
                            15% 43%,
                            15% 28%,
                            23% 28%,
                            23% 71%,
                            90% 71%,
                            90% 86%,
                            97% 86%,
                            97% 1%,
                            60% 1%,
                            60% 67%,
                            71% 67%,
                            71% 91%,
                            17% 91%,
                            17% 14%,
                            39% 14%,
                            39% 30%,
                            58% 30%,
                            58% 11%,
                            52% 11%,
                            52% 83%,
                            68% 83%
                        );
                    }

                    76% {
                        clip-path: polygon(
                            0% 26%,
                            15% 26%,
                            15% 73%,
                            72% 73%,
                            72% 70%,
                            77% 70%,
                            77% 75%,
                            8% 75%,
                            8% 42%,
                            4% 42%,
                            4% 61%,
                            17% 61%,
                            17% 12%,
                            26% 12%,
                            26% 63%,
                            73% 63%,
                            73% 43%,
                            90% 43%,
                            90% 67%,
                            50% 67%,
                            50% 41%,
                            42% 41%,
                            42% 46%,
                            50% 46%,
                            50% 84%,
                            96% 84%,
                            96% 78%,
                            49% 78%,
                            49% 25%,
                            63% 25%,
                            63% 14%
                        );
                    }

                    90% {
                        clip-path: polygon(
                            0% 41%,
                            13% 41%,
                            13% 6%,
                            87% 6%,
                            87% 93%,
                            10% 93%,
                            10% 13%,
                            89% 13%,
                            89% 6%,
                            3% 6%,
                            3% 8%,
                            16% 8%,
                            16% 79%,
                            0% 79%,
                            0% 99%,
                            92% 99%,
                            92% 90%,
                            5% 90%,
                            5% 60%,
                            0% 60%,
                            0% 48%,
                            89% 48%,
                            89% 13%,
                            80% 13%,
                            80% 43%,
                            95% 43%,
                            95% 19%,
                            80% 19%,
                            80% 85%,
                            38% 85%,
                            38% 62%
                        );
                    }

                    1%,
                    7%,
                    33%,
                    47%,
                    78%,
                    93% {
                        clip-path: none;
                    }
                }

                .movement {
                    position: relative;
                    animation: movement 8s step-end infinite;
                }

                @keyframes movement {
                    0% {
                        top: 0px;
                        left: -20px;
                    }

                    15% {
                        top: 10px;
                        left: 10px;
                    }

                    60% {
                        top: 5px;
                        left: -10px;
                    }

                    75% {
                        top: -5px;
                        left: 20px;
                    }

                    100% {
                        top: 10px;
                        left: 5px;
                    }
                }

                .opacity {
                    animation: opacity 5s step-end infinite;
                }

                @keyframes opacity {
                    0% {
                        opacity: 0.1;
                    }

                    5% {
                        opacity: 0.7;
                    }

                    30% {
                        opacity: 0.4;
                    }

                    45% {
                        opacity: 0.6;
                    }

                    76% {
                        opacity: 0.4;
                    }

                    90% {
                        opacity: 0.8;
                    }

                    1%,
                    7%,
                    33%,
                    47%,
                    78%,
                    93% {
                        opacity: 0;
                    }
                }

                .font {
                    animation: font 7s step-end infinite;
                }

                @keyframes font {
                    0% {
                        font-weight: 100;
                        color: #e0287d;
                        filter: blur(3px);
                    }

                    20% {
                        font-weight: 500;
                        color: #fff;
                        filter: blur(0);
                    }

                    50% {
                        font-weight: 300;
                        color: #1bc7fb;
                        filter: blur(2px);
                    }

                    60% {
                        font-weight: 700;
                        color: #fff;
                        filter: blur(0);
                    }

                    90% {
                        font-weight: 500;
                        color: #e0287d;
                        filter: blur(6px);
                    }
                }

                .glitch {
                    animation: paths 5s step-end infinite;
                }

                .glitch::before {
                    animation:
                        paths 5s step-end infinite,
                        opacity 5s step-end infinite,
                        font 8s step-end infinite,
                        movement 10s step-end infinite;
                }

                .glitch::after {
                    animation:
                        paths 5s step-end infinite,
                        opacity 5s step-end infinite,
                        font 7s step-end infinite,
                        movement 8s step-end infinite;
                }
            `}</style>

            <section
                id="landingAbout"
                className="relative overflow-hidden isolation-isolate h-[100svh]"
            >
                <div className="grid-container">
                    <div className="plane">
                        <div className="grid"></div>
                        <div className="glow"></div>
                    </div>

                    <div className="plane">
                        <div className="grid"></div>
                        <div className="glow"></div>
                    </div>
                </div>

                <div className="p-4 md:p-24 bg-black absolute left-0 top-1/2 right-0 -translate-y-1/2 w-full h-[45%] flex flex-col justify-center items-center">
                    <p className="text-xs md:text-2xl text-center">
                        <a href="/" className="text-lab-green">
                            <ScrambleText
                                text="The Innovation Lab"
                                speed={25}
                                step={4}
                            />
                        </a>{' '}
                        (formerly{' '}
                        <span className="text-lab-green">
                            <ScrambleText text="Nokia" speed={25} step={4} />
                        </span>{' '}
                        and{' '}
                        <span className="text-lab-green">
                            <ScrambleText
                                text="Microsoft Innovation Lab"
                                speed={25}
                                step={4}
                            />
                        </span>
                        ) is{' '}
                        <a href="https://pes.edu" className="text-lab-green">
                            <ScrambleText
                                text="PES University's"
                                speed={25}
                                step={4}
                            />
                        </a>{' '}
                        oldest student tech community.
                    </p>

                    <p className="text-xs md:text-2xl md:mt-10 mt-4 text-center">
                        {' '}
                        Our alumni network spans{' '}
                        <a
                            href="/members"
                            className="font-semibold text-lab-green"
                        >
                            <ScrambleText
                                text={`${new Date().getFullYear() - 2011} years`}
                                speed={25}
                                step={4}
                            />
                        </a>{' '}
                        and reaches some of the top organizations and
                        universities across the globe.
                    </p>
                    <p className="text-xs md:text-2xl md:mt-10 mt-4 text-center">
                        We are the home of{' '}
                        <span className="font-semibold text-lab-green">
                            <ScrambleText
                                text="innovation"
                                speed={25}
                                step={4}
                            />
                        </span>{' '}
                        on campus, driving niche projects and deep research
                        across domains!
                    </p>
                    <span className="mt-6 md:mt-24 w-3/4 md:w-1/4 mx-auto flex flex-row justify-between">
                        <a
                            href="/events"
                            className="bg-gradient-to-br -skew-x-12 from-[var(--lab-green)] hover:scale-110 transition-all ease-in-out duration-600 to-green-700 text-center font-bold text-sm md:text-xl p-2 md:p-4"
                        >
                            <span className="glitch layers">What We Do</span>
                        </a>
                        <a
                            href="/projects"
                            className="bg-gradient-to-br -skew-x-12 from-[var(--lab-green)] hover:scale-110 transition-all ease-in-out duration-600 to-green-700 text-center font-bold text-sm md:text-xl p-2 md:p-4"
                        >
                            <span className="glitch layers">Past Projects</span>
                        </a>
                    </span>
                </div>
            </section>
        </>
    )
}
