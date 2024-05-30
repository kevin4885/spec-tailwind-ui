## Tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
import {tailwindColors} from 'spec-tailwind-ui'
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/**/*Class.{js,jsx,ts,tsx}",
        "./src/**/*Classes.{js,jsx,ts,tsx}",
        "./node_modules/spec-tailwind-ui/**/*.{js,jsx,ts,tsx}",
        "./node_modules/spec-tailwind-ui/**/*Class.{js,jsx,ts,tsx}",
        "./node_modules/spec-tailwind-ui/**/*Classes.{js,jsx,ts,tsx}"
    ],
    theme: {
        colors: tailwindColors,
        extend: {},
    },
    plugins: [],
}
```

## index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
    }
}

html.dark {
    color-scheme: dark;
}

html {
    height: 100vh;
}

html,
body,
#root {
    height: 100%;
    overflow: hidden;
    @apply bg-white dark:bg-gray-900
}

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
```

## Example

```javascript
import { ThemeProvider, COLOR } from 'spec-tailwind-ui';

function App() {
    const theme = {
        primary: COLOR.RED, secondary: COLOR.BLUE, tertiary: COLOR.GREEN, danger: COLOR.RED, warn: COLOR.AMBER, success: COLOR.GREEN, bg: COLOR.NEUTRAL
    }
    return (
        <ThemeProvider theme={theme}>
            <div>
                Hello
            </div>
        </ThemeProvider>
    )
}

export default App

```






