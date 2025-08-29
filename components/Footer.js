'use client'
// components/Footer.js
import { Grid, IconButton, Typography } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import InstagramIcon from '@material-ui/icons/Instagram'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import Link from 'next/link'

// const headerStyle = {
//   backgroundColor: 'black',
//   color: 'white',
//   width: '100%',
//   height: '300px',
//   marginTop: '2em',
// };

const contentTitleStyle = {
    color: 'var(--lab-accent)',
    fontSize: '1.5rem',
    textAlign: 'center',
}

const contentBodyStyle = {
    color: 'white',
    fontSize: '1rem',
    marginTop: '1em',
    textAlign: 'center',
}

const Footer = () => (
    <div className="footer">
        <div className="footerContent">
            <div className="footerSection"></div>
                        {/* Address first */}
            <div className="footerSection">
                <Typography style={contentTitleStyle}>Address</Typography>
                <Typography style={contentBodyStyle}>
                    PES University, RR Campus 100 Feet Ring Road,
                    <br />
                    BSK III Stage,
                    <br />
                    Bangalore-560085
                    <br />
                    Karnataka, India
                </Typography>
            </div>
            {/* Logo in the middle */}
            <div className="footerSection">
                <Grid container justifyContent="center">
                    <Link href={`/`}>
                        <IconButton disableFocusRipple edge="start">
                            <img
                                style={{ width: '70%' }}
                                className="footerLogo"
                                src={`/images/mlab/mlab_logo.png`}
                            />
                        </IconButton>
                    </Link>
                </Grid>
            </div>
            {/* Contact/Connect last */}
            <div className="footerSection">
                <Typography style={contentTitleStyle}>Connect</Typography>
                <Typography style={contentBodyStyle}>
                    pes.mlab@gmail.com innovationlab@pes.edu
                </Typography>
                <Grid container justifyContent="center">
                    <Grid item xs={2} style={{ textAlign: 'center' }}>
                        <a
                            href="https://www.linkedin.com/company/pes-innovation-lab"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <IconButton>
                                <LinkedInIcon className="memberCardSocialIcons" />
                            </IconButton>
                        </a>
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: 'center' }}>
                        <a
                            href="https://www.instagram.com/innovationlab.pes"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <IconButton>
                                <InstagramIcon className="memberCardSocialIcons" />
                            </IconButton>
                        </a>
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: 'center' }}>
                        <a
                            href="https://github.com/PES-Innovation-Lab"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <IconButton>
                                <GitHubIcon className="memberCardSocialIcons" />
                            </IconButton>
                        </a>
                    </Grid>
                </Grid>
            </div>
            <div className="footerSection"></div>
        </div>
        <script></script>
    </div>
)

export default Footer
