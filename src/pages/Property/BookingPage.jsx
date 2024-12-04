import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceGallery from "../../components/Property/PlaceGallery";
import { differenceInCalendarDays, format } from "date-fns";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);

        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "Loading booking";
  }
  return (
    <div className="my-4">
      <h1 className="text-2xl">{booking.place.title}</h1>
      {/* <LocationAddress className="my-2 block">{booking.place.address} </LocationAddress> */}

      <PlaceGallery place={booking.place} />

      <div className=" my-6 flex   justify-between items-center py-4 px-8 bg-gray-200  mb-4 rounded-2xl ">
        <div className="">
          <h2 className="text-lg"> Your Trip</h2>

          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            <span>Dates:</span>
            {format(new Date(booking.checkIn), "yyyy-MM-dd")} to{" "}
            {format(new Date(booking.checkOut), "yyyy-MM-dd")}
          </div>
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span>Location:</span>
            <a
              className="flex gap-1 font-semibold underline"
              target="_blank"
              rel="noreferrer"
              href={"https://maps.google.com/?q=" + booking.place.address}
            >
              {booking.place.address}
            </a>
          </div>
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
            <span>Guests:</span>
            {booking.place.maxGuests}
          </div>
        </div>
        <div className="py-1 gap-2 pr-40">
          <h2 className="text-lg">Price Details</h2>
          <span className=" text-gray-500 border-b border-gray-300">
            {" "}
            {booking.place.price} ZAR x{" "}
            {differenceInCalendarDays(
              new Date(booking.checkOut),
              new Date(booking.checkIn)
            )}{" "}
            nights
          </span>{" "}
          <span className="text-gray-500 right-40">
            {booking.place.price *
              differenceInCalendarDays(
                new Date(booking.checkOut),
                new Date(booking.checkIn)
              )}{" "}
            ZAR{" "}
          </span>
          <br />
          <span className=" text-gray-500 border-b border-gray-300">
            Service fee : 0 ZAR
          </span>
          <br />
          {/* <span className="border-b border-gray-600"> Total before taxes:  {booking.price} ZAR </span> */}
          <div className="cursor-pointer bg-primary  p-4 rounded-xl text-white flex mt-4 items-center">
            <div>Pay now: &nbsp; </div>
            <div>{booking.price} ZAR</div>
          </div>
        </div>
      </div>
      {/* <div className=" my-6  gap-6 py-3 bg-gray-200 p-4 mb-4 rounded-2xl ">
                <h2 className="text-lg"> Description</h2>
                <div>
                    {booking.place.description}
                </div>
            </div> */}
    </div>
  );
}