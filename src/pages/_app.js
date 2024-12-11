import "../styles/globals.css"; // Global CSS
import Link from "next/link";

export default function MyApp({ Component, pageProps }) {
    const styles = {
        nav: {
            backgroundColor: "#007acc",
            color: "white",
            padding: "10px 20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        container: {
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        link: {
            margin: "0 15px",
            color: "white",
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: "500",
            transition: "color 0.3s",
        },
        linkHover: {
            color: "#ffcc00",
        },
    };

    return (
        <>
            {/* Navigation Bar */}
            <nav style={styles.nav}>
                <div style={styles.container}>
                    <Link
                        href="/"
                        style={styles.link}
                        onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
                        onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/add"
                        style={styles.link}
                        onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
                        onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
                    >
                        Add Book
                    </Link>
                    <Link
                        href="/library"
                        style={styles.link}
                        onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
                        onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
                    >
                        My Library
                    </Link>
                </div>
            </nav>

            {/* Render the current page */}
            <Component {...pageProps} />
        </>
    );
}
