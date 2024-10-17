# App For Reservations - Education Purpose

## Server with Express.js

Building my Express.js server for the reservation system allows me to create a robust backend that seamlessly integrates with a MySQL database, utilizes JWT (JSON Web Tokens) for secure user authentication, and employs Multer for handling file uploads. With MySQL, I can efficiently manage and store user data, reservations, and related information while ensuring data integrity and fast access. The use of JWT enables me to implement stateless authentication, allowing users to log in and receive a token that grants them access to protected routes without needing server-side sessions. Additionally, Multer simplifies the process of uploading files, such as user profile images or reservation-related documents, ensuring a smooth user experience. Together, these technologies empower me to develop a secure, scalable, and user-friendly reservation system that meets the needs of both users and administrators.

## Firebase Authentication Integration

I use Firebase Authentication in my reservation system to simplify user management and enhance security. This service allows users to register and log in using email and password or third-party providers like Google. Firebase handles the authentication process, securely storing user credentials.

## Client with React JS

Building a ReactJS client for my reservation system allows me to create a user-friendly interface that streamlines the interaction between users and the backend database. I can implement features like authentication and role-based access, ensuring that users can access only the functionalities relevant to their roles. The client enables me to manage catalogs, reservations, and customer data effectively, providing options for viewing, creating, updating, and deleting records.

I appreciate that React's component-based architecture allows for reusable components, making the development process more efficient. Using libraries like Axios, I can easily communicate with the backend via REST APIs, enabling smooth data retrieval and manipulation. Additionally, with React Router, I can manage navigation seamlessly, ensuring a fluid user experience across different pages.

## Database MySQL

Creating a database in MySQL offers me several key benefits. It's cost-effective since it's open-source, which allows me to use it without worrying about expensive licensing fees. I appreciate its high performance, as it enables efficient data retrieval and transaction processing. The robust security features, including user authentication and data encryption, give me peace of mind regarding data protection. I value the assurance of data integrity through ACID compliance and the strong backup and recovery options available. MySQL is user-friendly, especially with tools like MySQL Workbench, making database management easier. Its cross-platform compatibility allows me to work on various operating systems, and it integrates seamlessly with different programming languages and frameworks. Lastly, the large community support ensures that I have access to continuous development and assistance, making it a flexible and reliable choice for my scalable database applications.

### Tables

1. **`catalog_media`**
   - Stores media data associated with catalogs.
   - Fields: `id` (foreign key to `catalogs`), `num_order`, `media_type`, `url_media`.
   - Primary Key: (`id`, `num_order`).

2. **`catalogs`**
   - Manages catalog information.
   - Fields: `id`, `name`, `description`, `created_at`, `updated_at`.

3. **`customers`**
   - Holds customer data.
   - Fields: `id`, `name`, `email`, `phone_number`, `created_at`, `updated_at`.

4. **`reservations`**
   - Stores reservation records.
   - Fields: `id`, `customer_id` (foreign key to `customers`), `reservation_date`, `status`, `created_at`, `updated_at`.
   - Foreign Key: `customer_id` references `customers`.

5. **`reservation_items`**
   - Contains details about specific items in a reservation.
   - Fields: `id`, `reservation_id` (foreign key to `reservations`), `catalog_id` (foreign key to `catalogs`), `quantity`, `price`.

6. **`users`**
   - Manages user accounts, possibly for admin or system access.
   - Fields: `id`, `username`, `password`, `role`, `created_at`, `updated_at`.

7. **`roles`**
   - Defines roles for system users.
   - Fields: `id`, `role_name`, `description`.

8. **`performance_reviews`**
   - Tracks performance reviews for employees or users.
   - Fields: `id`, `user_id` (foreign key to `users`), `review_date`, `score`, `comments`.

9. **`logs`**
   - Logs system activities or events.
   - Fields: `id`, `event_type`, `user_id` (foreign key to `users`), `event_description`, `timestamp`.

### Key Features

- **Foreign Keys**: Several tables use foreign keys to ensure relational integrity (e.g., `catalog_media`, `reservation_items`, `reservations`, `performance_reviews`, and `logs`).
- **Data History**: The presence of `created_at` and `updated_at` timestamps in most tables allows for tracking data changes.
- **Users and Roles**: There’s a user management system (`users`, `roles`) which controls system access and role-based functionality.
- **Logging**: The `logs` table indicates some level of system activity tracking.
