'use client'

import { useEffect, useState } from 'react'
import membersData from '../../../public/data/members.json'
import headsData from '../../../public/data/heads.json'
import YearSelector from '../../../components/YearSelector'
import MemberCard from '../../../components/MemberCard'

const shuffleArray = (array) => {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

function Members() {
    const years = [2025, 2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016, 2015]
    const [currentYear, setCurrentYear] = useState(
        years.sort((a, b) => {
            b - a
        })[0]
    )

    const [mOrH, setMorH] = useState('Members')

    const membersOrHeadsMd = ['Members', 'Heads'].map((morh, ind) => {
        return (
            <button
                key={ind}
                onClick={() => setMorH(morh)}
                className={`${morh == mOrH ? 'font-bold text-lab-green border-green-900/50 rounded-md border-2 p-2' : ''}`}
            >
                {morh}
            </button>
        )
    })

    const [data, setData] = useState({ members: [], heads: [] })
    const [isDataLoaded, setDataLoaded] = useState(false)
    useEffect(() => {
        const fetch = () => {
            const membersOutput = membersData[currentYear.toString()].members
            const headsOutput = headsData[currentYear.toString()]
                ? headsData[currentYear.toString()].heads
                : []
            setData({ members: membersOutput, heads: headsOutput })
            setDataLoaded(true)
        }
        fetch()
    }, [currentYear])

    return (
        <>
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
                            shuffleArray(
                                mOrH === 'Members' ? data.members : data.heads
                            ).map((member, index) => (
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
        </>
    )
}
export default Members
