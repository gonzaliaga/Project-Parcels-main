"use client"
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute"
import LateralOptions from "@/components/lateralOptions/LateralOptions"

export default function DashboardLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <PrivateRoute>
      <div className="pt-[5rem] flex bg-white min-h-screen">
        <LateralOptions />
        {children}
      </div>
    </PrivateRoute>
  )
}
