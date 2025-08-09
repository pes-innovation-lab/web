'use client'

import { useEffect, useState } from 'react'
import membersData from '../../../public/data/members.json'
import headsData from '../../../public/data/heads.json'
import MemberCard from '../../../components/MemberCard'
import LayoutAlt from '../../../components/LayoutAlt'

const shuffleArray = (array) => {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

function Members() {
    const [showYears, setShowYears] = useState(false)
    const years = [2025, 2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016, 2015]
    const [currentYear, setCurrentYear] = useState(
        years.sort((a, b) => {
            b - a
        })[0]
    )

    const [mOrH, setMorH] = useState('Members')
    const yearElementsMd = years.map((year, ind) => {
        return (
            <button
                key={ind}
                onClick={() => setCurrentYear(year)}
                className={`${year == currentYear ? 'font-bold text-lab-green' : ''}`}
            >
                {year}
            </button>
        )
    })

    const membersOrHeadsMd = ['Members', 'Heads'].map((morh, ind) => {
        return (
            <button
                key={ind}
                onClick={() => setMorH(morh)}
                className={`${morh == mOrH ? 'font-bold text-lab-green border-lab-green rounded-md border-2 p-2' : ''}`}
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
            <div className="mt-10 flex flex-col gap-10 px-12 pb-20 pt-20">
                <div className="flex md:flex-row flex-col items-center gap-8 justify-between">
                    <div className="md:gap-4 gap-2 font-martian-mono md:text-4xl text-3xl text-white flex flex-wrap md:flex-row justify-center">
                        {membersOrHeadsMd}
                    </div>
                    <div className="md:gap-4 gap-2 rounded-md border-2 border-lab-green p-2 text-lg text-gray-400 flex flex-wrap md:flex-row justify-center ">
                        {yearElementsMd}
                    </div>
                </div>
            </div>
            <div className="bg-neutral-1000 flex min-h-screen items-center justify-center">
                <div className="flex flex-wrap justify-center">
                    <div className="grid grid-cols-1 gap-9 md:grid-cols-3 lg:grid-cols-4 justify-center">
                        {isDataLoaded ? (
                            shuffleArray(
                                mOrH === 'Members' ? data.members : data.heads
                            ).map((member, index) => (
                                <MemberCard
                                    key={index}
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
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Members
