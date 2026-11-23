function Navbar({ pages, currentPath, onNavigate }) {
    return (
        <nav class="navclass">
            <ul class="nav-ul">
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