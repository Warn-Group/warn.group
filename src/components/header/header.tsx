import '@/components/header/header.css'

export default function HeaderComp() {
    return (
        <header>
        <div className="header-left">
            <i>LEFT</i>
            <nav className="header-links header-nav">
                <a href="/">L0</a>
                <a href="/">L1</a>
                <a href="/">L2</a>
                <a href="/">L3</a>
            </nav>
        </div>
        <nav className="header-nav">
            <a className="header-center">WARN</a>
        </nav>
        <div className="header-right">
            <nav className="header-links header-nav">
                <a href="/">R0</a>
                <a href="/">R1</a>
                <a href="/">R2</a>
                <a href="/">R3</a>
            </nav>
            <i>RIGHT</i>
        </div>
    </header>
    );
}