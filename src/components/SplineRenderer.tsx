// components/SplineRenderer.tsx
'use client';

import { lazy, Suspense } from 'react';
import Loader from './Loader/Loader';

export default function SplineRenderer() {
  const Spline = lazy(() => import('@splinetool/react-spline'))
  return (
    <Suspense fallback={<Loader/>}>
      <Spline scene="https://prod.spline.design/DTwMGgGM0o-kbgYx/scene.splinecode"/>
    </Suspense>
    
  );
}





