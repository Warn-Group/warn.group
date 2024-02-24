import Link from 'next/link'

import '@/components/header/header.scss'
import { ROUTE_ROOT } from '@/app/lib/routes/routes';

export default function HeaderComp() {
    return (
        <header>
        <div className="header-left">
            <Link href="/auth/signup">
                <i>LEFT</i>
            </Link>
            <nav className="header-links header-nav">
                <Link href={ROUTE_ROOT}>L0</Link>
                <Link href={ROUTE_ROOT}>L1</Link>
                <Link href={ROUTE_ROOT}>L2</Link>
                <Link href={ROUTE_ROOT}>L3</Link>
            </nav>
        </div>
        <nav className="header-nav">
            <Link href={ROUTE_ROOT} className="header-center">WARN</Link>
        </nav>
        <div className="header-right">
            <nav className="header-links header-nav">
                <Link href={ROUTE_ROOT}>R0</Link>
                <Link href={ROUTE_ROOT}>R1</Link>
                <Link href={ROUTE_ROOT}>R2</Link>
                <Link href={ROUTE_ROOT}>R3</Link>
            </nav>
            <Link href="/auth/signin">
                <i>AUTH</i>
            </Link>
        </div>
    </header>
    );
}