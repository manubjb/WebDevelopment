type NavItemData = {
    href: string;
    label: string;
    active?: boolean;
}

type NavbarProps = {
    title: string;
    logoUrl?: string;
    items?: NavItemData[];
    cartLenght?: number;
}

function Navbar({ title, logoUrl, items, cartLenght }: NavbarProps) {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark mb-3">
            <div className="container">
                <a className="navbar-brand" href="/">
                    {logoUrl && (<img src={logoUrl} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />)}
                    {title}
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {items && items.map(item =>
                            <li className="nav-item" key={item.href}>
                                <a className={`nav-link ${item.active ? "active" : ""}`}
                                    href={item.href}>
                                    {item.label}
                                </a>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        <a href="/carrinho" className="btn btn-outline-light">
                            Carrinho({cartLenght || 0})
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;