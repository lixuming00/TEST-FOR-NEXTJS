import React from 'react';
import Link from 'next/link';

export function HomePage() {
  return (
    <>
      <div>
        <Link href={`/persons`}>
          <a>persons</a>
        </Link>
        <hr />

        <Link href={`/vehicles`}>
          <a>vehicles</a>
        </Link>
      </div>
    </>
  )
}

