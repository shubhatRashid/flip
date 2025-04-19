// app/robot/page.tsx (or wherever you're rendering)
import SplineRenderer from '@/components/SplineRenderer';

export default function Robot() {
  return (
    <main className="h-screen w-full">
      <SplineRenderer />
    </main>
  );
}
