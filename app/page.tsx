"use client"

import { useState } from "react"
import BookingForm from "@/components/booking-form"
// import GuestDetailsModal from "@/components/guest-details-modal"

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [bookingData, setBookingData] = useState(null)

  const handleBookingSubmit = (data) => {
    setBookingData(data)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <BookingForm/>
    </div>
  )
}
