import Link from 'next/link'

import '@/components/header/header.scss'

export default function HeaderComp() {
    return (
        <header>
        <div className="header-left">
            <Link href="/auth/signup">
                <i>LEFT</i>
            </Link>
            <nav className="header-links header-nav">
                <Link href="/">L0</Link>
                <Link href="/">L1</Link>
                <Link href="/">L2</Link>
                <Link href="/">L3</Link>
            </nav>
        </div>
        <nav className="header-nav">
            <Link href="/" className="header-center">WARN</Link>
        </nav>
        <div className="header-right">
            <nav className="header-links header-nav">
                <Link href="/">R0</Link>
                <Link href="/">R1</Link>
                <Link href="/">R2</Link>
                <Link href="/">R3</Link>
            </nav>
            <Link href="/auth/signin">
                <i>AUTH</i>
            </Link>
        </div>
    </header>
    );
}