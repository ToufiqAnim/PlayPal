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

## How to setup in local computer:

### Clone the Repository:

```plain
git clone https://github.com/Rahad-Ullah/Sports-Facility-Booking-server.git
```

### Install Dependencies:

```markdown
npm install
```


### Run the Application:

```markdown
npm run start:dev
```
### API Endpoints

  

#### User Routes

  

1. **User Sign Up**
*   **Route**: `POST /api/auth/signup`
*   **Request Body**:

```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "programming-hero",
  "phone": "01322901105",
  "role": "admin", // or 'user'
  "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
}
```


2. **User Login**
*   **Route**: `POST /api/auth/login`
*   **Request Body**:

```json
{
  "email": "web@programming-hero.com",
  "password": "programming-hero"
}
```

  


3. **Create a Facility (Admin Only)**
*   **Route**: `POST /api/facility`
*   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "name": "Tennis Court",
  "description": "Outdoor tennis court with synthetic surface.",
  "pricePerHour": 30,
  "location": "456 Sports Ave, Springfield"
}
```

  

4. **Update a Facility (Admin Only)**
*   **Route**: `PUT /api/facility/:id`
*   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "name": "Updated Tennis Court",
  "description": "Updated outdoor tennis court with synthetic surface.",
  "pricePerHour": 35,
  "location": "789 Sports Ave, Springfield"
}
```


5. **Delete a Facility - Soft Delete (Admin Only)**
*   **Route**: `DELETE /api/facility/:id`
*   **Headers**:

```plain
      Authorization: Bearer JWT_TOKEN
```


**6\. Get All Facilities**

*  **Route**: `GET /api/facility`
  

#### Booking Routes

  
### 7\. Check Availability

Check the availability of time slots for booking on a specific date.

*   **Route**: `GET /api/check-availability`


```sql
GET /api/check-availability?date=2024-06-15
```

  

  

**8\. Create a Booking (User Only)**

  *   **Route**: `POST /api/bookings`
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "facility": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "10:00",
  "endTime": "13:00"
}
```



**9\. View All Bookings (Admin Only)**

  *   **Route**: `GET /api/bookings`
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```



**10\. View Bookings by User (User Only)**

  *   **Route**: `GET /api/bookings/user`
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```



**11\. Cancel a Booking (User Only)**

  *   **Route**: `DELETE /api/bookings/:id`
  *   **Headers**:


```plain
Authorization: Bearer JWT_TOKEN
```

