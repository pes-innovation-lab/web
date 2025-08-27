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

            <div style={{ marginTop: '2rem', color: 'white' }}>
                <Typography variant="body1" paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam auctor, nisl eget ultricies aliquam, nunc nunc
                    lacinia nunc, vitae aliquam nisl nunc vitae nisl. Sed vitae
                    nisl eget nunc lacinia aliquam. Sed vitae nisl eget nunc
                    lacinia aliquam.
                </Typography>

                <Typography variant="body1" paragraph>
                    Nullam auctor, nisl eget ultricies aliquam, nunc nunc
                    lacinia nunc, vitae aliquam nisl nunc vitae nisl. Sed vitae
                    nisl eget nunc lacinia aliquam. Sed vitae nisl eget nunc
                    lacinia aliquam. Nullam auctor, nisl eget ultricies aliquam,
                    nunc nunc lacinia nunc, vitae aliquam nisl nunc vitae nisl.
                </Typography>

                <Typography
                    variant="h6"
                    style={{
                        color: '#068f13',
                        marginTop: '2rem',
                        marginBottom: '1rem',
                    }}
                >
                    Project Domains
                </Typography>

                <ul style={{ color: 'white' }}>
                    <li>
                        <Typography variant="body1">Robotics</Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            Machine Learning
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            Artificial Intelligence
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            Sensor Networking
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">Virtual Reality</Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            Brain-Computer Interface
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">Cloud Computing</Typography>
                    </li>
                    <li>
                        <Typography variant="body1">App Development</Typography>
                    </li>
                </ul>
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
