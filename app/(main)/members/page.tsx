'use client'

import { useEffect, useState } from 'react'
import membersData from '../../../public/data/members.json'
import headsData from '../../../public/data/heads.json'
import YearSelector from '../../../components/YearSelector'
import MemberCard from '../../../components/MemberCard'

interface Member {
    name: string
    picture_url?: string
    branch: string
    grad_batch: string
    linkedin?: string
    email?: string
    github?: string
}

interface YearData {
    [key: string]: {
        members: Member[]
    }
}

interface HeadsData {
    [key: string]: {
        heads: Member[]
    }
}

const shuffleArray = <T,>(array: T[]): T[] => {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

function Members() {
    const [years, setYears] = useState([
        2025, 2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016, 2015,
    ])

    const [currentYear, setCurrentYear] = useState<number>(
        years.sort((a, b) => b - a)[0]
    )

    const [cards, setCards] = useState<Member[]>([])

    const [mOrH, setMorH] = useState<'Members' | 'Heads'>('Members')

    const membersOrHeadsMd = ['Members', 'Heads'].map((morh, ind) => (
        <button
            key={ind}
            onClick={() => setMorH(morh as 'Members' | 'Heads')}
            className={`${morh == mOrH ? 'font-bold text-lab-green border-green-900/50 rounded-md border-2 p-2' : ''}`}
        >
            {morh}
        </button>
    ))

    const [data, setData] = useState<{
        members: Member[]
        heads: Member[]
    }>({ members: [], heads: [] })
    const [isDataLoaded, setDataLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (mOrH === 'Members'){
            if (currentYear === 2021)
                setCurrentYear(2022)
            setYears([
                2025, 2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016, 2015,
            ])
        }
        else {
            setYears([2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015])
        }
        setDataLoaded(false)
        setCards([])
        const fetch = () => {
            const membersOutput = (membersData as YearData)[currentYear.toString()] ?
                (membersData as YearData)[currentYear.toString()].members
                : []
            const headsOutput = (headsData as HeadsData)[currentYear.toString()]
                ? (headsData as HeadsData)[currentYear.toString()].heads
                : []
            setData({ members: membersOutput, heads: headsOutput })
            setTimeout(() => {
                setDataLoaded(true)
                setCards(mOrH === 'Members' ? membersOutput : headsOutput)
            }, 100)
            setDataLoaded(true)
        }
        fetch()
    }, [currentYear, mOrH])

    return (
        <div className="flex flex-col gap-10 px-4 pb-20 pt-6 phone:px-6 sm:px-12">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
                <div className="font-bold font-martian-mono text-3xl md:text-4xl text-white flex flex-wrap justify-center gap-2 md:gap-4">
                    {membersOrHeadsMd}
                </div>

                <div className="md:gap-4 gap-2 p-2 text-lg text-gray-400 flex flex-wrap md:flex-row justify-center">
                    <YearSelector
                        years={years}
                        currentYear={currentYear}
                        setCurrentYear={setCurrentYear}
                    />
                </div>
            </div>

            <div className="bg-neutral-1000 flex min-h-screen items-start justify-center pt-6">
                <div className="flex flex-wrap justify-center gap-8 max-w-[1280px]">
                    {isDataLoaded &&
                        shuffleArray(cards).map((member, index) => (
                            <div key={index}>
                                <MemberCard
                                    name={member.name}
                                    pfp={
                                        member.picture_url ||
                                        './images/members/unknown.png'
                                    }
                                    course={member.branch}
                                    batch={member.grad_batch}
                                    linkedin={member.linkedin}
                                    gmail={member.email}
                                    github={member.github}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Members
