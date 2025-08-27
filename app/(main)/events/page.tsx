'use client'

// pages/events.js
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import Timeline from '@material-ui/lab/Timeline'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import '../../../css/events.css'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    date: {
        margin: '5px',
        color: 'white',
        fontSize: '1rem',
    },
    content: {
        margin: '5px',
    },
}))

function Events() {
    const data = [
        {
            month: 'Jan-Feb',
            event_name: 'Hashcode',
            key: 'hashcode',
        },
        {
            month: 'March',
            event_name: 'The Hunt',
            key: 'hunt',
        },
        {
            month: 'March-April',
            event_name: 'Summer Internship Recruitment',
            key: 'recruitment',
        },
        {
            month: 'June-July',
            event_name: 'Summer Internship',
            key: 'internship',
        },
        {
            month: 'Sept-Oct',
            event_name: 'RoadShow',
            key: 'roadshow',
        },
    ]

    const classes = useStyles()
    const isDesktop = useMediaQuery({
        query: '(min-device-width: 545px)',
    })

    const timelineContent = {
        hunt: {
            text: (
                <div className="eventSection">
                    <div className="eventSectionText">
                        <a
                            href="https://hunt.theinnovationlab.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="eventPageLink"
                        >
                            <Typography className="eventHeading">
                                The Hunt
                            </Typography>
                        </a>
                        <Typography className="eventText">
                            We've got the ultimate test for you! Prove your mettle while you compete against others in a 24 hour online treasure hunt! The Top 15 Participants will get a direct opportunity to interview for our prestigious internship program!
                        </Typography>
                    </div>
                </div>
            ),
            image: (
                <div className="eventSectionImage">
                    <img src={`/images/mlab/recruitment.png`} />
                </div>
            ),
        },
        recruitment: {
            text: (
                <div className="eventSection">
                    <div className="eventSectionText">
                        <Link
                            href="/events/recruitment"
                            className="eventPageLink"
                        >
                            <Typography className="eventHeading">
                                Summer Internship Recruitment
                            </Typography>
                        </Link>
                        <Typography className="eventText">
                            Every year, we look for enthusiastic and
                            passion-driven people to become a part of our
                            community. To find those among you who are a good
                            fit, we conduct an aptitude challenge and give you
                            an opportunity to show us how passionate you are
                            about engineering and building solutions to
                            real-world problems.
                        </Typography>
                    </div>
                </div>
            ),
            image: (
                <div className="eventSectionImage">
                    <img src={`/images/mlab/recruitment.png`} />
                </div>
            ),
        },
        internship: {
            text: (
                <div className="eventSection">
                    <div className="eventSectionText">
                        <Link
                            href="/events/internship"
                            className="eventPageLink"
                        >
                            <Typography className="eventHeading">
                                Summer Internship Program
                            </Typography>
                        </Link>
                        <Typography className="eventText">
                            We, at PES Innovation Lab, organise an annual summer
                            internship for new recruits to work on cutting-edge
                            research projects in varied domains such as
                            Robotics, Machine Learning, Artificial Intelligence,
                            Sensor Networking, Virtual Reality, Brain-Computer
                            Interface, Cloud computing and App Development. The
                            results and prototype demonstrations of these
                            projects are presented at Roadshow, an event
                            attended by a large number of students across
                            disciplines at PES University. The recruitments for
                            the same are carried out between March and April.
                        </Typography>
                    </div>
                </div>
            ),
            image: (
                <div className="eventSectionImage">
                    <img src={`/images/mlab/internship.png`} />
                </div>
            ),
        },
        roadshow: {
            text: (
                <div className="eventSection">
                    <div className="eventSectionText">
                        <Link href="/events/roadshow" className="eventPageLink">
                            <Typography className="eventHeading">
                                Roadshow
                            </Typography>
                        </Link>
                        <Typography className="eventText">
                            Roadshow is an Innovation Expo organized by the Lab
                            each year after the Summer Internship Program. PES
                            Lab summer interns present the projects that they
                            have worked on during the internship. This serves as
                            a great platform for students from PES University to
                            interact with members and gain knowledge about the
                            cutting-edge technologies that we work on. Roadshow
                            also serves as a platform where our interns receive
                            constructive feedback and further insights on their
                            projects from experienced professionals, professors
                            and their peers.
                        </Typography>
                    </div>
                </div>
            ),
            image: (
                <div className="eventSectionImage">
                    <img src={`/images/mlab/roadshow.png`} />
                </div>
            ),
        },
        hashcode: {
            text: (
                <div className="eventSection">
                    <div className="eventSectionText">
                        <a
                            href="https://hashcode.theinnovationlab.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="eventPageLink"
                        >
                            <Typography className="eventHeading">
                                HashCode
                            </Typography>
                        </a>
                        <Typography className="eventText">
                            HashCode is the annual 24-hour hackathon organised
                            by the Lab, with students proposing interesting
                            ideas and presenting projects from several domains.
                            The hackathon also provides a learning platform to
                            participating teams, with mentors and members of
                            academia assisting them. Esteemed personalities from
                            different industrial backgrounds come to judge the
                            show, evaluating projects from all possible angles.
                            The 13th edition of the annual hackathon will happen
                            in 2025. The winners bag cash prizes worth up to one
                            lakh indian rupees.
                        </Typography>
                    </div>
                </div>
            ),
            image: (
                <div className="eventSectionImage">
                    <img src={`/images/mlab/hackathon.png`} />
                </div>
            ),
        },
    }
    const timelineElements = data.map((event) => (
        <TimelineItem style={{ textAlign: 'left' }} key={event.key}>
            <TimelineOppositeContent className="event-timelineOppositeContent">
                <Typography variant="body2" className={classes.date}>
                    {event.month}
                </Typography>
                {timelineContent[event.key].image}
            </TimelineOppositeContent>
            <TimelineSeparator style={{ float: 'left' }}>
                <TimelineDot
                    style={{ color: 'white', backgroundColor: 'green' }}
                >
                    <ArrowDownwardIcon />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                {isDesktop ? null : (
                    <Typography
                        variant="body2"
                        className={`${classes.date} event-timelineDate`}
                    >
                        {event.month}
                    </Typography>
                )}
                {isDesktop ? null : timelineContent[event.key].image}
                {timelineContent[event.key].text}
            </TimelineContent>
        </TimelineItem>
    ))

    return (
        <Container>
            <Typography
                className={'pageHeader'}
                style={{
                    marginTop: '8rem',
                }}
            >
                What we do
            </Typography>
            <Typography
                style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '1.8rem',
                }}
            >
                A year at PES Innovation Lab
            </Typography>
            <Typography
                style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '1.4rem',
                }}
            >
                We have the perfect platform and events for your skills and
                ideas to explore new heights
            </Typography>

            <Timeline align={isDesktop ? 'alternate' : 'left'}>
                {timelineElements}
            </Timeline>
        </Container>
    )
}

export default Events
