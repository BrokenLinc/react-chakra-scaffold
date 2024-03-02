# Folder Structure

Note: You can import from any of these folders using the `@@` prefix, avoiding any path prefixes. For example:

```ts
import { routes } from '@@routing/routes';
```

## Primary folders

- `api`
  - Contains modules for each entity type, including their validation schema, types, and API query/mutation hooks.
- `auth`
  - Contains code relating to user authentication.
- `components`
  - Contains app-specific React components.
- `data-grid`
  - Contains code relating to the `DataGrid` system.
- `dialogs`
  - Contains code relating to the confirmation & notification dialog system.
- `forms`
  - Contains code relating to form system, encompassing state management and individual input & feedback components.
- `helpers`
  - Contains generalized helpers.
- `layouts`
  - Contains layout components specific to [app-areas](./app-stucture.md).
- `navigation`
  - Contains code to support navigating around the app.
- `pages`
  - Contains individual page components.
- `routing`
  - Contains code related to the URL routing system.
- `theme`
  - Contains code related to the UI theming system.
- `ui`
  - Contains individual custom and override components. Typically these are not app-specific.

## Asset folders

- `assets`
  - Images imported into the app's bundle.
- `creditCards`
  - Contains credit-card-specific assets.
- `dev-tools`
  - Contains components used to aid the app developers.
