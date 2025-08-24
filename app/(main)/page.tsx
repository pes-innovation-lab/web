// // pages/index.js
// import {
//   AppBar,
//   Card,
//   CardContent,
//   CardMedia,
//   Dialog,
//   Grid,
//   IconButton,
//   Slide,
//   Toolbar,
//   Typography,
// } from '@material-ui/core';
// import Container from '@material-ui/core/Container';
// import { light } from '@material-ui/core/styles/createPalette';
// import CloseIcon from '@material-ui/icons/Close';
// import React, { useEffect, useState } from 'react';
// import Layout from '../components/Layout';

// // project spotlight

// const mainTitleStyle = {
//   fontFamily: 'Poppins, sans-serif',
//   textAlign: 'center',
//   fontSize: '3.5rem',
//   color: '#8bc34a',
// };

// const mainContentStyle = {
//   fontFamily: 'Red Hat Display, sans-serif',
//   fontSize: '1.8rem',
//   marginBottom: '150px',
//   textAlign: 'center',
//   color: 'white',
// };

// const bodyContentStyle = {
//   fontSize: '1.25rem',
//   textAlign: 'left',
//   color: '#8bc34a',
// };

// const details = {
//   display: 'flex',
//   flexDirection: 'column',
// };

// const profData = [
//   {
//     name: 'Prof. Rajasekar M',
//     designation: 'Associate Professor',
//     org: 'PES University',
//     description:
//       'Prof. M Rajasekar is an Associate Professor in the department of Electronics and Communication Engineering at PES University. He is an alumnus of IIT Madras (Computer Science and Engineering). He brings with him over two decades of rich and varied experience ranging from combatant in Indian Air Force to Systems Engineer and Project Manager in the IT Industry. He manages the PES Innovation Lab at the PES University. He has been actively involved in various projects undertaken at PES Innovation Lab. His research interests include wireless communications, embedded systems and healthcare systems. He handholds student projects in several domains viz. Robotics, IoT, Machine Learning, Sensor Networks and Virtual Reality. Recently, he presented his project works in the International Conferences (TENCON) held in Singapore, Malaysia and Jeju,South Korea. He is an astute listener and motivator.',
//     image: `/images/mlab/Rajasekar_profile.jpg`,
//   },
//   {
//     name: 'Dr. Venkatarangan MJ',
//     designation: 'Professor',
//     org: 'PES University',
//     description:
//       "After leaving Philips in 2015 to follow his passion towards teaching and research, Dr. Venkatarangan joined PES University as the Associate Professor in EEE to focus on Embedded Systems stream. Prior to joining PES University, he spent 20 years in Tektronix, Siemens, HCL Technologies and Philips working in India and abroad serving in roles right from Software Engineer to System Architect. As System Architect he was on technical lead for projects across sites and also supported cross functions like program or purchase management, quality and product strategy for platform evaluation, supplier evaluation and product road-mapping. A significant achievement has been to lead as Architect for first Digital TV for US market and also to develop MP3 Audio products adhering to Microsoft PlaysForSure specifications. Rangan is an alumnus of Chinese University of Hong Kong where he completed is PhD and holds M.Tech and B.E from Mysore University. He current teaches Microcontroller and Applications, Signals and Systems, 'C' Programming and Intoduction to Robotics. His research interests include embedded systems, IoT, Robotics, Automation and Sensor networks.He supports the PES Innovation Lab activities and summer internship projects in domains of embedded systems, IoT Robotics and Automation.",
//     image: `/images/mlab/Venkatarangan_profile.jpg`,
//   },
//   {
//     name: 'Dr. A Srinivas',
//     designation: 'Founder',
//     org: 'PES Innovation Lab',
//     description:
//       'Dr. A Srinivas is the faculty founder of PES Innovation Lab (formerly known as Microsoft Innovation Lab). He is presently the Dean, School of Engineering in Dayananda Sagar University. He has worked for 10 years in Companies/Research Organizations Such as Tata Consulting Engineers, Centre for AI & amp; Robotics (DRDO), Philips Software Centre and Nortel Networks (Sydney,Australia). Academic experience of 19 yrs with KREC, Surathkal, Amrita University, PES University and Monash University (Melbourne, Australia). His Areas of Research Interest: Wireless Networks, Healthcare Informatics. He is extremely passionate about promoting Undergraduate Research.',
//     image: `/images/mlab/Srinivas_profile.jpg`,
//   },
// ];

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// function Index() {
//   const [data, setData] = useState({ stats: [] });

//   useEffect(() => {
//     const fetchData = async () => {
//       // const result = await fetch(
//       //   'https://api-vercel-mlabwebdev.vercel.app/stats'
//       // );
//       // if ((await result.status) !== 200) {
//       //   alert('API Error. Try again later');
//       // } else {
//       //   const output = await result.json();
//       //   const stats = [];
//       //   for (const key in output) {
//       //     stats.push({ key: key, data: output[key] });
//       //   }
//       //   setData({ stats: stats });
//       // }
//     };
//     fetchData();
//   }, []);

//   const [open, setOpen] = useState(false);
//   const [selectedProf, setSelectedProf] = useState(profData[0]);

//   const selectProf = (prof) => {
//     setSelectedProf(prof);
//     setOpen(true);
//   };

//   return (
//     <Layout title={'PES Innovation Lab'} active={'Home'}>
//       <div className="introSection">
//         <Container>
//           <p style={mainTitleStyle}>PES Innovation Lab</p>

//           <blockquote style={mainContentStyle}>
//             We are a student community dedicated to cultivating the spirit of
//             research and innovation in budding engineers.
//           </blockquote>
//         </Container>
//       </div>

//       <Container>
//         <p id="about_title" style={bodyHeadingStyle}>
//           ABOUT US
//         </p>
//         <p id="about_content" style={bodyContentStyle} className={light}>
//           PIL is a unique community which inculcates the spirit of student
//           research. Students work with like-minded peers to try and solve
//           carefully chosen real-world problems. The Lab’s activities include the
//           flagship summer internship, HashCode (a hackathon), RoadShow (A
//           project presentation event) and other enriching opportunities such as
//           workshops and tutorials.
//           <br />
//           <br />
//           Students here, routinely push the boundaries of research by developing
//           products to benefit the masses and publishing their work in
//           conferences and journals of repute. Interns continue working with the
//           lab while in college, sharing insights, starting new projects and
//           mentoring subsequent batches of student interns.
//           <br />
//           <br />
//           Over the years, the members of PIL have grown into a close-knit family
//           who contribute to the lab long after their graduation.
//         </p>
//       </Container>

//       <div className="statSection">
//         <Container>
//           <Grid container justifyContent="center">
//             {data.stats.map((key) => (
//               <Grid key={key.key} item sm={3} xs={12} justifyContent="center">
//                 <CardContent style={{ textAlign: 'center' }}>
//                   <Typography className="statValue" component="p">
//                     {key.data}
//                   </Typography>
//                   <Typography className="statTitle">{key.key}</Typography>
//                 </CardContent>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </div>

//       <p id="about_title" style={bodyHeadingStyle}>
//         PROFESSORS
//       </p>
//       <Container>
//         <Grid container justifyContent="center" className="profContainer">
//           {profData.map((prof) => (
//             <Grid
//               key={prof.name}
//               item
//               md={4}
//               sm={12}
//               xs={12}
//               justifyContent="center"
//               style={{ textAlign: 'center', alignItems: 'center' }}
//             >
//               <Card
//                 className="profCard"
//                 onClick={() => {
//                   selectProf(prof);
//                 }}
//               >
//                 <CardMedia
//                   className="profImage"
//                   image={prof.image}
//                   title={prof.designation}
//                 />
//                 <div style={details}>
//                   <CardContent>
//                     <Typography
//                       component="h5"
//                       variant="h5"
//                       className={'profCardDescription'}
//                     >
//                       {prof.name}
//                     </Typography>
//                     <Typography className={'profCardDescription'}>
//                       {prof.designation}
//                     </Typography>
//                   </CardContent>
//                 </div>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       <Dialog
//         fullScreen
//         open={open}
//         onClose={() => {
//           setOpen(false);
//         }}
//         TransitionComponent={Transition}
//         PaperProps={{ className: 'dialogContainer' }}
//       >
//         <AppBar className="dialogAppBar">
//           <Toolbar>
//             <Typography variant="h6" className="dialogTitle">
//               {selectedProf.name}
//             </Typography>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={() => {
//                 setOpen(false);
//               }}
//             >
//               <CloseIcon style={{ float: 'right', color: '#8bc34a' }} />
//             </IconButton>
//           </Toolbar>
//         </AppBar>

//         <Container style={{ marginTop: '5em' }}>
//           <CardMedia
//             style={{
//               maxWidth: '250px',
//               margin: 'auto',
//               height: '300px',
//               marginTop: 30,
//               marginBottom: 30,
//             }}
//             image={selectedProf.image}
//             className="profImage"
//           />
//           <Typography className="profDialogContentHeading">
//             {selectedProf.name}
//           </Typography>
//           <Typography className="profDialogContentSubHeading">
//             {selectedProf.designation} | {selectedProf.org}
//           </Typography>
//           <br></br>
//           <Typography className="profDialogContentDescription">
//             {selectedProf.description}
//           </Typography>
//         </Container>
//       </Dialog>

//       <div>

// </div>

//     </Layout>

//   );
// }

// // export async function getServerSideProps(context){
// //     const res = await fetch("https://api-vercel-mlabwebdev.vercel.app/stats");
// //     const output = await res.json();
// //     let stats = [];
// //     for (let key in output){
// //         stats.push({key:key,data:output[key]});
// //     }
// //     ;
// //     return {props:{stats}};
// // }

// export default Index;

import Home from '../../components/root/alt_home'

export default function MyHome() {
    return <Home />
}
