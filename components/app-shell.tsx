"use client"

import React from "react"

import { DesktopSidebar } from "@/components/desktop-sidebar"
import { BottomNav } from "@/components/bottom-nav"

interface AppShellProps {
  children: React.ReactNode
  showBottomNav?: boolean
}

export function AppShell({ children, showBottomNav = true }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <DesktopSidebar />
      <div className="lg:pl-64">
        {children}
      </div>
      {showBottomNav && <BottomNav />}
    </div>
  )
}
