# Routing How-tos

This page gives some guidance on how to create new lazy-loaded pages, menu items and links to navigate around the site.

- [Add a new page & route](#add-a-new-page--route)
- [Add a new "modal" page & route](#add-a-new-modal-page--route)
- [Navigate to a route](#navigate-to-a-route)
- [Add a menu item](#add-a-menu-item)

## Add a new lazy-loaded page & route

1. Decide where in the site map you want to place the page (eg. `localhost:3000/admin/services`).
1. Add a new file into the appropriate subfolder of `./src/pages`, and give it a name of `WhateverPage.tsx`.
1. In that file, Create a React component, and make it the default export.
1. Add an entry for the page to `./src/pages/index.ts`.
1. Add a route into `./src/routing/routes.ts`, placing it into the object that matches the page location. (eg. `admin.services`)

## Add a new "modal" page & route

1. Decide which existing base page you want to place the modal onto. (eg. `./src/pages/admin/services/WhateverPage.tsx`)
1. Add a route into `./src/routing/routes.ts`, placing it under the base page's route.
   - Recommended: name the route with the pattern `{baseRoute}_{whatever}Modal`.
   - Use the `createModalRoute` helper.
   - Use the base page as the `parent`.
   - Add a subPath that is relative to the base route's path.
1. Add a `RouteModal` instance with the new modal route to the base page, wiring up any route parameters using `useParams`.

```tsx
/* Example */
<UI.RouteModal route={routes.admin.services.whatever_editModal(id)}>
  {({ onClose }) => <div>...</div>}
</UI.RouteModal>
```

## Navigate to a route

### With a link

```tsx
/* Example */
<UI.RouteLink route={routes.admin.services.whatever()} />
```

### With a button

```tsx
/* Example */
<UI.RouteButton route={routes.admin.services.whatever()} />
```

### Programmatically

```ts
/* Example */
const navigate = useNavigate();
...
navigate(routes.admin.services.whatever().path)
```

## Add a menu item

### To the admin menu

This is the only app area that organizes its contents into accordions, so it works differently than the others.

1. Find the `appAreas.admin` object in `./src/routing/appAreas.ts`.
1. Find the `navigationMenuGroups` you want to add to.
1. Add the route to the `routes` property.

### To another App Area

For example: `admin`, `public` etc. See [Application Structure](../app-stucture.md) for more context.

1. Find the matching `appAreas` property in `./src/routing/appAreas.ts`.
1. Add the route to the `navigationMenuRoutes` property.
