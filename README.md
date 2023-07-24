## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Assumptions made -

1. By Looking at the design for Listing the tasks that we can edit, view and delete from the list section.

2. In the form design the heading "Task- Prepare A/B Test" is not in use since that can only be available in update section. So added a generic heading when creating an item. On update it will take the selected item.

3. As there is no screen for when there are no items so Showing Task creation form in default view when there is no list added or all the items in list are deleted.

4. No design for responsive screens so handled design at my own accord.

<--- What else can be done if given time --->

1. Better Form Validation by checking for empty strings, enforcing a maximum length, or checking for inappropriate content.

2. Better Error Handling: Currently logging errors to the console, but in a user-facing application, it would be beneficial to display error messages to the user in a user-friendly way.

3. Add a confirmation prompt before an item is deleted, to prevent accidental deletions.

4. Can add Sorting or Filtering: Add the ability for users to sort or filter their to-do items. For example, they could sort items by creation date or filter items based on their titles or descriptions.

5. By implementing Undo/Redo Functionality by keeping a history of the application's state and allowing the user to move backward or forward through this history.

6. Multiselect and Batch Operations to allow users to select multiple items and perform operations (like deletion) on all selected items at once.

7. By adding Search Functionality.
