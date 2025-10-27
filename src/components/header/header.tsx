import Link from 'next/link'

import '@/components/header/header.scss'
import { ROUTE_CHAT, ROUTE_ROOT, ROUTE_SIGNIN } from '@/app/lib/routes/routes';

export default function HeaderComp() {
    return (
        <header>
            <div className="header-left">
                <Link href={ROUTE_CHAT} className="header-link">
                    CHAT
                </Link>
            </div>
            <nav className="header-center-nav">
                <Link href={ROUTE_ROOT} className="header-center">WARN</Link>
            </nav>
            <div className="header-right">
                <Link href={ROUTE_SIGNIN} className="header-link">
                    LOGIN
                </Link>
            </div>
        </header>
    );
}