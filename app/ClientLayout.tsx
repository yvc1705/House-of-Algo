"use client"

import type React from "react"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    // More conservative AOS settings
    AOS.init({
      duration: 800,
      once: true, // Only animate once
      mirror: false, // Don't mirror animations
      offset: 100,
      throttleDelay: 100, // Add throttle delay
      disable: typeof window !== "undefined" && window.innerWidth < 768 ? true : false, // Disable on mobile
    })

    // Clean up AOS on unmount
    return () => {
      if (typeof window !== "undefined") {
        // @ts-ignore - AOS doesn't have proper TypeScript definitions for this
        AOS.refresh()
      }
    }
  }, [])

  return <body className={inter.className}>{children}</body>
}

