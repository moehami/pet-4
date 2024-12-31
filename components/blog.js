"use client"

import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import React from 'react';

export default function BlogLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          { children }
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}