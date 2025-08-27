'use client'

import { Container, Typography } from '@material-ui/core'
import Link from 'next/link'

function InternshipPage() {
    return (
        <Container>
            <Typography
                className={'pageHeader'}
                style={{
                    marginTop: '8rem',
                }}
            >
                Summer Internship Program
            </Typography>

            <div
                style={{
                    marginTop: '2rem',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h5"
                    style={{ color: '#068f13', marginBottom: '2rem' }}
                >
                    Content coming soon
                </Typography>

                <Typography variant="body1" paragraph>
                    We're working on bringing you detailed information about our
                    Summer Internship Program. Stay tuned for updates!
                </Typography>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Link
                    href="/events"
                    style={{ color: '#068f13', textDecoration: 'none' }}
                >
                    <Typography variant="button">Back to Events</Typography>
                </Link>
            </div>
        </Container>
    )
}

export default InternshipPage
