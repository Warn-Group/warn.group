import Link from "next/link";

import "@/components/loading/loading.scss";

export default function LoadingComp() {
    return (
        <div className="loading-container">
            <h1 className="loading-text">Loading
                <span className="loading-dot">.</span>
                <span className="loading-dot">.</span>
                <span className="loading-dot">.</span>
            </h1>
        </div>
    );
}