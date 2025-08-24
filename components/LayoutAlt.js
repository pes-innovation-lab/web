import NavBar from './NavBar'
import Footer from './Footer'
import Head from 'next/head'

function LayoutAlt(props) {
    return (
        <div className="layout">
            <Head>
                <title>{props.title}</title>
                <link rel="shortcut icon" href={`/images/icon.png`} />
            </Head>
            <NavBar
                active={props.active}
                search={props.search}
                searchSettings={props.searchSettings}
            />
            <div className="">{props.children}</div>
            <Footer />
        </div>
    )
}

export default LayoutAlt
