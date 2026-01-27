import Link from 'next/link';

export default function Heartbeat() {
  return (
    <div style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <iframe
        src="/og-image.svg"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
      <Link
        href="/"
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          width: '48px',
          height: '24px',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <iframe
          src="/og-image.svg"
          style={{ width: '200px', height: '100px', border: 'none', pointerEvents: 'none', transform: 'scale(0.24)', transformOrigin: 'top left' }}
        />
      </Link>
    </div>
  );
}
