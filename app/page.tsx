'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
// Hapus import useRouter jika tidak digunakan
// import { useRouter } from 'next/navigation';
import SessionProviderWrapper from './SessionProviderWrapper';

export default function HomePage() {
  // Hapus deklarasi router jika tidak digunakan
  // const router = useRouter();

  return (
    <SessionProviderWrapper>
      <div className="min-h-screen bg-background text-foreground dark:bg-darkBackground dark:text-darkForeground">
        <header className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-start items-center">
          <h1 className="text-3xl font-bold">Selamat Datang di Central Ultra Queue</h1>
        </header>
        <main className="p-4">
          <div className='flex flex-col items-center justify-center'>
            <p className="text-lg mb-4">Central Ultra Queue adalah platform yang membantu Anda mengatur antrian dengan lebih efisien. Silakan masuk untuk memulai.</p>
            <button
              onClick={() => signIn()}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Masuk
            </button>
          </div>
        </main>
        <footer className="p-4 bg-gray-200 dark:bg-gray-800 absolute inset-x-0 bottom-0">
          <p className="text-center">
            &copy; 2024. Oleh Ultraman Gaia.
          </p>
        </footer>
      </div>
    </SessionProviderWrapper>
  );
}