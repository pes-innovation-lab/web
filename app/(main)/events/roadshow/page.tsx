'use client'

import { Container, Typography, Grid, Card, CardMedia, CardContent } from '@material-ui/core'
import Link from 'next/link'

function RoadshowPage() {
  // Placeholder data for past roadshows
  const pastRoadshows = [
    { year: '2024', image: '/images/mlab/roadshow.png' },
    { year: '2023', image: '/images/mlab/roadshow.png' },
    { year: '2022', image: '/images/mlab/roadshow.png' },
  ]

  return (
    <Container>
      <Typography
        className={'pageHeader'}
        style={{
          marginTop: '8rem',
        }}
      >
        Roadshow
      </Typography>

      <div style={{ marginTop: '2rem', color: 'white' }}>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nunc lacinia nunc,
          vitae aliquam nisl nunc vitae nisl. Sed vitae nisl eget nunc lacinia aliquam. Sed vitae nisl eget nunc lacinia aliquam.
        </Typography>

        <Typography variant="body1" paragraph>
          Nullam auctor, nisl eget ultricies aliquam, nunc nunc lacinia nunc, vitae aliquam nisl nunc vitae nisl. Sed vitae nisl eget nunc lacinia aliquam.
          Sed vitae nisl eget nunc lacinia aliquam. Nullam auctor, nisl eget ultricies aliquam, nunc nunc lacinia nunc, vitae aliquam nisl nunc vitae nisl.
        </Typography>
      </div>

      <Typography variant="h5" style={{ color: '#068f13', marginTop: '3rem', marginBottom: '1.5rem' }}>
        Past Roadshows
      </Typography>

      <Grid container spacing={4}>
        {pastRoadshows.map((roadshow) => (
          <Grid item xs={12} sm={4} key={roadshow.year}>
            <Card style={{ background: '#1E1E1E' }}>
              <CardMedia
                component="img"
                height="180"
                image={roadshow.image}
                alt={`Roadshow ${roadshow.year}`}
              />
              <CardContent>
                <Typography variant="h6" style={{ color: 'white' }}>
                  Roadshow {roadshow.year}
                </Typography>
                <Typography variant="body2" style={{ color: '#AAAAAA' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/events" style={{ color: '#068f13', textDecoration: 'none' }}>
          <Typography variant="button">
            Back to Events
          </Typography>
        </Link>
      </div>
    </Container>
  )
}

export default RoadshowPage
