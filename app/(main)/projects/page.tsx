'use client'
import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Suspense } from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'
import projectsData from '../../../public/data/projects.json'
import Cards from '../../../components/Cards'
import LayoutAlt from '../../../components/LayoutAlt'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

type projectsType = {
    year: string
    title: string
    short_description: string
    long_description: string
    keywords: string
    mentors: string
    interns: string
    poster_url: string
}[]

function Projectos() {
    const router = useRouter()
    const searchParams: string | null = useSearchParams().get('project-id')
    const projectId: string = searchParams ? searchParams : ''

    const [selectedId, setSelectedId] = useState(
        projectId.split('-')[2] ? Number(projectId.split('-')[2]) - 1 : -1
    )
    const containerRefs = useRef(new Array())

    const years = [2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016]
    const defaultYearStr = projectId.split('-')[1]
    const defaultYear =
        defaultYearStr && years.includes(Number(defaultYearStr))
            ? Number(defaultYearStr)
            : years.sort((a, b) => {
                  return b - a
              })[0]

    const [currentYear, setCurrentYear] = useState(defaultYear)

    const handleEventAndNavigate = async () => {
        const url = 'https://theinnovationlab.in/projects/whisperwire'
        const cookies = new Cookies()
        const jwt = cookies.get('jwt')
        const username = cookies.get('username')
        let uid = ''

        if (jwt) {
            const decoded: { user_id: string } = jwtDecode(jwt)
            uid = decoded['user_id'].toString()
            const body = {
                userAgent: navigator.userAgent,
                timestamp: Math.floor(Date.now() / 1000).toString(),
                uid: uid,
                name: username,
                url: url,
            }
            try {
                await fetch(`https://gamekeeper.theinnovationlab.in/events/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
            } catch (error) {
                console.error('Error sending event:', error)
            }
        }
        router.push('/chungus')
    }

    const yearElements = years.map((year, ind) => {
        return (
            <button
                key={ind}
                onClick={() => setCurrentYear(year)}
                className={`text-sm lg:text-base ${
                    year == currentYear ? 'font-bold text-lab-green' : ''
                }`}
            >
                {year}
            </button>
        )
    })

    const projects = projectsData

    const currentProjects: projectsType =
        projects[currentYear.toString()]['projects']

    // const AllProjects = Object.values(projectsData).map(
    // 	(item) => item.projects
    // );

    // const FlattenedAllProjects = AllProjects.flat(1);

    const cardLayout = (
        <div className="flex flex-wrap justify-around gap-8 lg:justify-center">
            {currentProjects.map((card, i) => {
                return (
                    <motion.div
                        className={
                            (card.year == currentYear.toString()
                                ? ''
                                : 'hidden') +
                            (selectedId === i
                                ? ' opened-card h-[75%] w-[95%] md:h-[75%] md:w-[95%] lg:h-[75%] lg:w-[80%]'
                                : 'inline-block w-fit overflow-hidden rounded-lg bg-gray-800 p-1 phone:m-4')
                        }
                        onClick={() => {
                            if (selectedId == -1) setSelectedId(i)
                        }}
                        key={i}
                        layout
                        ref={(el) => (containerRefs.current[i] = el)}
                    >
                        {selectedId === i ? (
                            <div className="flex h-full w-full gap-8 overflow-hidden rounded-lg border-2 border-gray-700 bg-black p-4 pr-0 text-black">
                                {i === 8 ? (
                                    <img
                                        className="hidden aspect-auto h-full self-center rounded-md sm:block"
                                        src={card.poster_url}
                                        onClick={() => {
                                            handleEventAndNavigate()
                                        }}
                                        alt={card.title}
                                    />
                                ) : (
                                    <img
                                        className="hidden aspect-auto h-full self-center rounded-md sm:block"
                                        src={card.poster_url}
                                        alt={card.title}
                                    />
                                )}

                                <div className="flex flex-col justify-between gap-4 overflow-auto pr-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row items-center justify-between gap-2 text-white sm:flex-col-reverse md:flex-row md:gap-0">
                                            <div className=" font-martian-mono text-2xl font-bold lg:text-3xl xl:text-4xl">
                                                {card.title}
                                            </div>
                                            <div className="flex h-fit shrink-0 items-center gap-4 sm:self-end md:self-auto">
                                                {i != 0 && (
                                                    <button
                                                        className="relative h-6 w-6 shrink-0 lg:h-8 lg:w-8"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedId(
                                                                (prev) =>
                                                                    prev - 1
                                                            )
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="h-full w-full text-white"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M15.75 19.5L8.25 12l7.5-7.5"
                                                            />
                                                        </svg>
                                                    </button>
                                                )}
                                                {i !=
                                                    currentProjects.length -
                                                        1 && (
                                                    <button
                                                        className="relative h-6 w-6 shrink-0 lg:h-8 lg:w-8"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedId(
                                                                (prev) =>
                                                                    prev + 1
                                                            )
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="h-full w-full text-white"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                            />
                                                        </svg>
                                                    </button>
                                                )}
                                                <button
                                                    className="relative h-6 w-6 shrink-0 text-white lg:h-8 lg:w-8"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setSelectedId(-1)
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="h-full w-full text-white"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="font-martian-mono text-sm text-gray-400 xl:text-base">
                                            {card.long_description}
                                        </div>
                                    </div>
                                    <div className="flex w-fit flex-col self-end font-martian-mono text-white xl:text-lg">
                                        <div className="font-martian-mono">
                                            <span className="font-martian-mono text-lab-green">
                                                {card.interns.includes(',') ? (
                                                    <>INTERNS</>
                                                ) : (
                                                    <>INTERN&nbsp;</>
                                                )}
                                            </span>{' '}
                                            : {card.interns}
                                        </div>
                                        <div className="font-martian-mono">
                                            <span className="font-martian-mono text-lab-green">
                                                {card.mentors.includes(',') ? (
                                                    <>MENTORS</>
                                                ) : (
                                                    <>MENTOR&nbsp;</>
                                                )}
                                            </span>{' '}
                                            : {card.mentors}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Cards name={card.title} pfp={card.poster_url} />
                        )}
                    </motion.div>
                )
            })}
            <motion.div
                className="dim-layer"
                animate={{ opacity: selectedId != -1 ? 0.8 : 0 }}
            />
        </div>
    )

    return (
        <div
            className={`flex flex-col gap-10 px-4 pb-20 pt-24 phone:px-6 sm:px-12`}
        >
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
                <div className="font-martian-mono text-4xl text-lab-green lg:text-6xl">
                    PROJECTS
                </div>
                <div className="grid grid-cols-4 gap-4 rounded-md border-2 border-gray-900 p-2 text-lg text-gray-400 phone:flex">
                    {yearElements}
                </div>
            </div>
            {cardLayout}
        </div>
    )
}

export default function NewProjects() {
    return (
        <Suspense fallback={<div>SHAKABOOM!</div>}>
            <Projectos />
        </Suspense>
    )
}
