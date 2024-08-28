# Sports Facility Booking Platform

The Sports Facility Booking Platform allows users to book sports facilities with ease and provides admins the ability to manage these facilities and bookings.

---

 ### ([Live Server](https://playpal-omega.vercel.app/))
```console
https://sports-booking-platform.vercel.app
```

## Used Technologies:

- TypeScript
- Node.js
- Express.js
- Mongoose
- JWT
- Zod

  ## Features:

- Users can sign up and log in using their email and password. Admins have additional powers for managing facilities and bookings.

-  Admins can create, update, and delete facilities. Each facility has details like name, description, price per hour, and location.

-  Users can book facilities by specifying the date, start time, and end time. The system calculates the payable amount based on the duration of the booking.

-  Users can check the availability of facilities for a specific date.

-  Admins can view all bookings, while users can view only their own bookings. This helps in managing and tracking reservations efficiently.

-  Users have the ability to cancel their bookings.

-  Comprehensive error handling ensures proper responses and messages for validation errors, duplicate entries, and not found routes.

- Middleware is implemented to protect routes, ensuring that only authenticated users and admins can access their respective routes.

-  JWT based authentication is implemented to protect routes and ensure that only authorized users and admins can access their respective routes.
