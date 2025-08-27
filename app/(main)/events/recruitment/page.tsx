'use client'

import { Container, Typography } from '@material-ui/core'
import Link from 'next/link'

function RecruitmentPage() {
    return (
        <Container>
            <Typography
                className={'pageHeader'}
                style={{
                    marginTop: '8rem',
                }}
            >
                Summer Internship Recruitment
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

                <Typography variant="body1" paragraph>
                    Sed vitae nisl eget nunc lacinia aliquam. Sed vitae nisl
                    eget nunc lacinia aliquam. Nullam auctor, nisl eget
                    ultricies aliquam, nunc nunc lacinia nunc, vitae aliquam
                    nisl nunc vitae nisl.
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

export default RecruitmentPage
