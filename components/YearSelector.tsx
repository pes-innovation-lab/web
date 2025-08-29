import React from 'react'

export default function YearSelector({ years, currentYear, setCurrentYear }) {
    return (
        <div className="flex flex-wrap gap-1 sm:gap-2 border-2 border-green-900/50 p-2 rounded-md">
            {years.map((year) => {
                const isActive = year === currentYear
                return (
                    <button
                        key={year}
                        onClick={() => setCurrentYear(year)}
                        className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition-colors duration-200
              ${
                  isActive
                      ? 'bg-lab-green text-black font-semibold'
                      : 'text-gray-400 hover:text-lab-green'
              }`}
                    >
                        {year}
                    </button>
                )
            })}
        </div>
    )
}
