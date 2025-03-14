import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import '../../css/global.css'
import '../../css/new_projects.css'

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="font-martian-mono">
                <NavBar active="Home" search="False" />
                {children}
                <Footer />
            </body>
        </html>
    )
}
