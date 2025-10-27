"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '@/components/spline/spline.scss'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => <FallbackBackground />
});

interface SplineSceneProps {
    sceneUrl: string;
}

function FallbackBackground() {
    return (
        <div className="spline-fallback" />
    );
}

function detectHardwareAcceleration(): boolean {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) return false;

        const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
        if (!debugInfo) return true;

        const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        return !/swiftshader/i.test(renderer);
    } catch {
        return false;
    }
}

export default function SplineScene({ sceneUrl }: SplineSceneProps) {
    const [useSpline, setUseSpline] = useState<boolean | null>(null);

    useEffect(() => {
        setUseSpline(detectHardwareAcceleration());
    }, []);

    if (useSpline === null || !useSpline) {
        return <FallbackBackground />;
    }

    return (
        <div id="spline-hero">
            <Spline 
                scene={sceneUrl}
                onLoad={(spline: any) => {
                    spline?.setZoom?.(0.8);
                    if (spline?._runtime) spline._runtime.fps = 30;
                }}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}
