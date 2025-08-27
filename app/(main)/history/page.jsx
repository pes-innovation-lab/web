'use client'

import React from 'react'
import { Timeline } from '../../../components/ui/timeline'
import timelineData from '../../../public/data/about.json'

function History() {
    const data = timelineData.map((event) => ({
        title: event.year || '',
        content: (
            <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-lab-green mb-3">
                    {event.event_title}
                </h3>
                <p className="text-gray-50 text-sm md:text-base leading-relaxed">
                    {event.event_description}
                </p>
            </div>
        ),
    }))

    return (
        <>
            <Timeline data={data} />
        </>
    )
}

export default History
