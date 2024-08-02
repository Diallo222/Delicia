
# Delicia

The Art of Cooking: Find All Recipes for Your Preferred Delicious Meals

UI inspired From [Dribble](https://dribbble.com/shots/21200414-Beeef-Food-And-Beverage-Landing-Page-Website?utm_source=Clipboard_Shot&utm_campaign=Adhiari_is&utm_content=Beeef%20-%20Food%20And%20Beverage%20Landing%20Page%20Website&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=Adhiari_is&utm_content=Beeef%20-%20Food%20And%20Beverage%20Landing%20Page%20Website&utm_medium=Social_Share)

![Delicia](https://github.com/user-attachments/assets/0266500d-6f1b-41e8-8d51-46a8425c4987)

## Installation


1. **Clone the repository:**

```bash
 git clone https://github.com/Diallo222/Delicia.git
```

2. **Navigate to the project directory:**

```bash
 cd Delicia
```
3. **Install dependencies:**

```bash
npm install
# or
yarn install
```
4. **Start the development server:**

```bash
npm run dev
# or
yarn run dev
```
    
## Features


### AutoComplete Component

- **Dynamic Option Filtering**: Automatically filters options based on user input, providing relevant suggestions in real-time.
- **Customizable Option Labels**: Allows customization of how each option is displayed through a callback function.
- **Find Button Integration**: Includes a button that can be configured to trigger actions based on the selected option.
- **Loading State Handling**: Displays a loading state for the find button when data is being fetched or processed.
- **Keyboard Accessibility**: Supports navigation and selection of options using keyboard interactions.
- **Clear on Escape**: Optionally clears the input field when the escape key is pressed.
- **Open on Focus**: Optionally opens the dropdown list when the input field is focused.
- **Custom Filtering Logic**: Allows custom filtering of options based on user-defined criteria.

### Additional Components

- **BarLoader**: Provides a visually appealing loading indicator with animated bars to enhance user experience during data loading.
- **RequestError**: Displays user-friendly error messages based on the response status, helping users understand what went wrong.
- **MealCard**: Presents meal information in a visually engaging card format, including details such as the meal name and description.
- **EmptyComponent**: Shows a customizable empty state with an optional image, providing clear feedback when no data is available.

### General Features

- **Responsive Design**: Ensures components are fully responsive and work well on various screen sizes and devices.
- **TypeScript Support**: Provides type safety and improved development experience through TypeScript definitions.
- **Error Handling**: Integrates error boundaries to catch and display errors gracefully without breaking the application.
- **Smooth Page Transitions**: Uses Framer Motion for smooth and visually appealing transitions between pages.
- **Customizable Styling**: Leverages Tailwind CSS for flexible and consistent styling across the application.



## Usage

### AutoComplete Component

The AutoComplete component provides a flexible and customizable autocomplete functionality for your applications. It is built using React and the @mui/base package.

#### Props
- **options (T[]):** An array of options to display in the autocomplete dropdown. Type T can be any type.

- **placeholder (string):** Placeholder text for the input field.

- **accessOptions ((option: T) => string):** A function to access the label of each option.

- **onfindPress ((option: T) => void):** Callback function triggered when the find button is pressed with the selected option.

- **loading (boolean):** Boolean flag to indicate if loading is in progress. Disables the button if true.

- **buttonLabel (string):** Text for the find button.

- **clearOnEscape (boolean, optional):** If true, clears the input field when the escape key is pressed.

- **openOnFocus (boolean, optional):** If true, opens the dropdown when the input field is focused.

- **filterOptions ((options: T[], state: any) => T[], optional):** A function to filter options based on the input value.

#### Example
```javascript
import React from 'react';
import { AutoComplete } from './components/AutoComplete';

const options = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
];

const App = () => {
  const handleFindPress = (option: { id: number; label: string }) => {
    console.log('Selected option:', option);
  };

  return (
    <AutoComplete
      options={options}
      placeholder="Search options"
      accessOptions={(option) => option.label}
      onfindPress={handleFindPress}
      buttonLabel="Find"
      loading={false}
    />
  );
};

export default App;

```


## Tech Stack

**Client:** React, Redux, TailwindCSS , Framer Motion

**API:** [Meal Db](https://www.themealdb.com/)


## Acknowledgements

 - [MUI Base](https://mui.com/base-ui/) - For providing the base autocomplete functionality.
 - [Framer Motion](https://www.framer.com/motion/) - For animations and transitions.
 - [Tailwind CSS](https://tailwindcss.com/) - For providing a utility-first CSS framework.



## Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -am 'Add new feature').
5. Push to the branch (git push origin feature-branch).
6. Create a new Pull Request.


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@Almahady Diallo](https://github.com/Diallo222/)


## Feedback

If you have any feedback, please reach out to me at almahadydiallo@gmail.com

