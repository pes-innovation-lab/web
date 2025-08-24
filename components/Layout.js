import NavBar from './NavBar'
// import Footer from './Footer';
import Head from 'next/head'

const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '50vh',
    width: '100%',
}

// const contentStyle = {
//   flex: 1,
//   display: 'flex',
//   flexDirection: 'column',
// };

function Layout(props) {
    const backgroundImg = `/images/mlab/prism.png`
    const introImg = `/images/mlab/intro.jpg`
    const hwsImg = `/images/mlab/hws.jpg`
    const shattered = `/images/mlab/shattered.png`
    return (
        <div style={layoutStyle}>
            <Head>
                <title>{props.title}</title>
                <link rel="shortcut icon" href={`/images/icon.png`} />
                <style>{`
                html, body {
                    margin: 0;
                    padding: 0;
                    background-image: url(${backgroundImg});
                    background-repeat: repeat;
                    min-height: 100vh;
                }
                .introSection {
                    background-image: url(${introImg});
                    clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 0% 100%);
                }
                .statSection {
                    background-image: url(${hwsImg});
                    padding: 70px 0px;
                    clip-path: polygon(0% 20%, 100% 0%, 100% 80%, 0% 100%);
                }

                .hashCodeSection:nth-child(even) {
                    background-image: url(${shattered});    
                    clip-path: polygon(0% 0%, 100% 10%, 100% 90%, 0% 100%);
                }
                                
            `}</style>
            </Head>
            <NavBar
                active={props.active}
                search={props.search}
                searchSettings={props.searchSettings}
            />
            <div style={layoutStyle}>{props.children}</div>
            {/* <Footer/> */}
        </div>
    )
}

export default Layout
