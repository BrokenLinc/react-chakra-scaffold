# Application Structure

## App areas & routing

This app is divided into several areas:

- Admin
- Public

**Generally, they each:**

- Have a unique route prefix (eg. `/admin` for the **Admin**)
- Use a unique layout (eg. `<AdminLayout />` for the **Admin**).
- Display a subset of their routes as a main menu (called `navigationMenuRoutes`).
