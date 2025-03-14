import Image from 'next/image'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import projectsData from '../public/data/projects.json'

function ProjectCard({ project }) {
    return (
        <div className="proj__card">
            <div className="proj__card__image">
                <Image
                    src={project.poster_url}
                    layout="fill"
                    alt={project.title}
                    objectFit="contain"
                />
            </div>

            <div>
                <p className="proj__card__title">{project.title}</p>
                <p className="proj__card__sdesc">{project.short_description}</p>
                {/* <marquee> */}
                <div className="flex flex-wrap gap-1 pt-2">
                    {project.keywords.map((key) => (
                        <span
                            key={key}
                            className="rounded-full border p-1 text-sm"
                        >
                            #{key}
                        </span>
                    ))}
                </div>
                {/* </marquee> */}
            </div>
        </div>
    )
}

// function ProjectCardRound({ project, index, totalCards, radius }) {
//   const style = {
//     left: radius * Math.cos((index * 2 * Math.PI) / totalCards) + 500,
//     top: radius * Math.sin((index * 2 * Math.PI) / totalCards) + 400,
//     translateX: '50%',
//     translateY: '50%',
//   };

//   ;
//   return (
//     <div className="absolute">
//       <div className="card_round_image" style={style}>
//         <Image
//           src={project.poster_url}
//           layout="fill"
//           alt={project.title}
//           objectFit="fill"
//         />
//       </div>
//     </div>
//   );
// }

function ProjectsNew() {
    const [data, setData] = useState({ projects: [] })
    const [filteredResults, setFilteredResults] = useState({ projects: [] })
    const [open, setOpen] = useState(false)
    const [isDataLoaded, setDataLoaded] = useState(false)
    const [isProjectFromURL, setIsProjectFromURL] = useState(true)

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value)
    }

    const filterResults = () => {
        setFilteredResults(() => {
            const projects = [...data.projects]

            for (let i = 0; i < projects.length; i++) {
                const ps = [...projects[i].data.projects].filter((p) => {
                    return (
                        p.title.toLowerCase().includes(searchTerm) ||
                        p.keywords?.indexOf(searchTerm) !== -1 ||
                        p.short_description?.toLowerCase().includes(searchTerm)
                    )
                })

                projects[i] = { data: { projects: ps }, key: projects[i].key }
            }

            return { projects: projects }
        })
    }

    useEffect(() => {
        const fetch = () => {
            const output = projectsData
            const projects = []
            try {
                for (const key in output) {
                    for (const chipKey in output[key].projects) {
                        output[key].projects[chipKey].keywords = output[
                            key
                        ].projects[chipKey].keywords
                            .split(',')
                            .map((s) => s.toLowerCase().trim())
                        // output[key].projects[chipKey].interns =
                        //   output[key].projects[chipKey].interns.split(',');
                        // output[key].projects[chipKey].mentors =
                        //   output[key].projects[chipKey].mentors.split(',');
                        output[key].projects[chipKey].id = output[key].projects[
                            chipKey
                        ].title
                            .replace(/\s+/g, '-')
                            .toLowerCase()
                    }
                    projects.push({ key: key, data: output[key] })
                }
                projects.reverse()
                setData({ projects: projects })
                setFilteredResults({ projects: projects })
                setDataLoaded(() => true)
            } catch (e) {}
            // ;
        }
        fetch()
    }, [])

    return (
        <Layout
            title={'PIL | Projects'}
            active={'Projects'}
            search={true}
            searchSettings={{
                targetClass: 'projectCardContainer',
                default: 'block',
            }}
        >
            <div className="flex gap-1">
                <input onChange={handleSearchInput} />{' '}
                <button
                    className="rounded-sm bg-black px-4 py-2 text-white"
                    onClick={filterResults}
                >
                    Search
                </button>
            </div>
            <div className="text-white">
                Searched for {"'" + searchTerm + "'"}
            </div>
            <div>
                {filteredResults.projects.map((p) => (
                    <>
                        {p ? (
                            <div className="mx-auto my-5 max-w-7xl">
                                <h2 className="text-center text-step-8 font-semibold uppercase text-lab-green">
                                    {p?.key}
                                </h2>
                                <div className="proj__grid">
                                    {p?.data?.projects.map((proj) => (
                                        <ProjectCard
                                            key={proj.title}
                                            project={proj}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                ))}
            </div>
            {/* <div>
        {data.projects.slice(0, 1).map((p) => (
          <div className="max-w-7xl mx-auto border">
            <h2 className="text-step-8 underline underline-offset-4 text-lab-green font-semibold uppercase text-center">
              {p.key}
            </h2>
            <div className="relative border h-[200vh] p-16">
              {p.data.projects.map((proj, index) => (
                <ProjectCardRound
                  key={proj.title}
                  project={proj}
                  index={index}
                  totalCards={p.data.projects.length}
                  radius={600}
                />
              ))}
            </div>
          </div>
        ))}
      </div> */}
        </Layout>
    )
}

export default ProjectsNew
