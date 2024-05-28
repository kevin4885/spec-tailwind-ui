## Tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
import {tailwindColors} from 'spec-tailwind-ui'
export default {
  darkMode: 'class', // Added
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./src/**/*Class.{js,jsx,ts,tsx}", // Added
      "./src/**/*Classes.{js,jsx,ts,tsx}", // Added
      "./node_modules/spec-tailwind-ui/**/*.{js,jsx,ts,tsx}", // Added
      "./node_modules/spec-tailwind-ui/**/*Class.{js,jsx,ts,tsx}", // Added
      "./node_modules/spec-tailwind-ui/**/*Classes.{js,jsx,ts,tsx}" // Added
  ],
  
  theme: {
    colors: tailwindColors, // Added
    extend: {},
  },
  plugins: [],
}
```
~~~~
## Example

```javascript
import { setPageTheme } from 'spec-tailwind-ui';
import { useEffect } from 'react';

function App() {
    useEffect(() => { setPageTheme()}, [])
    return <></>
}

export default App
```




