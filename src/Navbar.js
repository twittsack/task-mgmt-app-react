function Navbar({ pages, currentPath, onNavigate }) {
    return (
        <nav
            style={{
                borderBottom: '1px solid #ccc',
                padding: '16px 0',
                marginBottom: '24px'
            }}
        >
            <ul
                style={{
                    listStyle: 'none',
                    display: 'flex',
                    gap: '20px',
                    padding: 0,
                    margin: 0
                }}
            >
                {Object.entries(pages).map(([pageName, page]) => {
                    const isActive = currentPath === page.path;

                    return (
                        <li key={pageName}>
                            <a
                                href={page.path}
                                onClick={(event) => {
                                    event.preventDefault();
                                    onNavigate(page.path);
                                }}
                                style={{
                                    color: isActive ? 'blue' : 'black',
                                    fontWeight: isActive ? 'bold' : 'normal',
                                    textDecoration: isActive ? 'underline' : 'none'
                                }}
                            >
                                {page.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Navbar;