import Link from "next/link";

import "@/app/styles/not-found.scss";
import SplineNotFoundComp from "@/components/spline/not-found/spline";

export default function NotFound() {
    return (
        <>
        <SplineNotFoundComp/>
        <div className="not-found-container">
            <div>
                <h1 className="not-found-code">404</h1>
                <div className="not-found-text-container">
                    <h2 className="not-found-text">This page could not be found.</h2>
                </div>
            </div>
        </div>
        </>
    );
}