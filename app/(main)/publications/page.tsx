'use client'

import { Chip, Container } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import React, { useEffect, useState } from 'react'
// import '../css/projects.css';
import { publicationData } from '../../../public/data/publications.js'

const designStyles = makeStyles({
    spinnerTextStyle: {
        textAlign: 'center',
        color: '#068F13',
    },
})

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    headingStyle: {
        fontSize: '1.5rem',
        marginTop: '1em',
    },
    contentStyle: {
        fontSize: '1rem',
        marginTop: '1em',
    },
})

function Row(props) {
    const { row } = props
    const [open, setOpen] = React.useState(false)
    const classes = useRowStyles()

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <strong>{row.title}</strong>
                </TableCell>
                <TableCell align="center">{row.year}</TableCell>
                <TableCell align="center">{row.conference}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Authors:
                            </Typography>
                            {row.authors.map((person) => (
                                <Chip
                                    key={person}
                                    label={person}
                                    className="projectKeywordChip"
                                ></Chip>
                            ))}
                            <Typography className={classes.headingStyle}>
                                Description:
                            </Typography>
                            <Typography className={classes.contentStyle}>
                                {row.short_description}
                            </Typography>
                            <Typography className={classes.contentStyle}>
                                <strong>Link to publication: </strong>{' '}
                                <a
                                    style={{ color: '#8bc34a' }}
                                    href={row.link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {row.link}
                                </a>
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default function Publications() {
    // deep copy of the data
    const publications = JSON.parse(JSON.stringify(publicationData))

    for (const key in publications) {
        publications[key].authors = publications[key].authors.split(',')
    }
    const data = { publications }

    const [isDataLoaded, setDataLoaded] = useState(true)
    const designstyles = designStyles()
    // useEffect(() => {
    //     const fetchData = async () => {
    //         // const result = await fetch('https://api-vercel-mlabwebdev.vercel.app/publications');
    //         const result = await fetch('/data/publications.json')
    //         if ((await result.status) !== 200) {
    //             alert('API Error. Try again later')
    //         } else {
    //             const publications = await result.json()
    //             for (const key in publications) {
    //                 publications[key].authors =
    //                     publications[key].authors.split(',')
    //             }
    //             setData({ publications: publications })
    //             setDataLoaded(true)
    //         }
    //     }
    //     // fetchData();
    //     const fetch = () => {
    //         var publications = publicationData
    //
    //         for (const key in publications) {
    //
    //             publications[key].authors = publications[key].authors.split(',')
    //         }
    //         setData({ publications: publications })
    //         setDataLoaded(true)
    //     }
    //     fetch()
    // }, [])

    return (
        <div className="pt-20">
            <Typography className="pageHeader">Recent Publications</Typography>
            <Container>
                {!isDataLoaded ? (
                    <div className={designstyles.spinnerTextStyle}>
                        <Typography style={{ fontSize: '1.5rem' }}>
                            Loading Data
                        </Typography>{' '}
                        <CircularProgress
                            style={{ color: '#068F13', marginTop: '1em' }}
                        />
                    </div>
                ) : (
                    <TableContainer
                        component={Paper}
                        style={{ marginBottom: 50, marginTop: 50 }}
                    >
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>
                                        <strong>Title</strong>
                                    </TableCell>
                                    <TableCell align="center">
                                        <strong>Year</strong>
                                    </TableCell>
                                    <TableCell align="center">
                                        <strong>Conference</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.publications.map((pub) => (
                                    <Row key={pub.title} row={pub} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </div>
    )
}

// export async function getServerSideProps(context){
//     const res = await fetch("https://api-vercel-mlabwebdev.vercel.app/publications");
//     const publications = await res.json();
//     for (let key in publications){
//         publications[key].authors = publications[key].authors.split(",");
//     }
//     return {props:{publications}};
// }
