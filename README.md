## Tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
import {tailwindColors} from 'tailwind-ui'
export default {
  darkMode: 'class', <--Added
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-ui/**/*.{js,jsx,ts,tsx}" <--Added
  ],
  theme: {
    colors: tailwindColors, <--Added
    extend: {},
  },
  plugins: [],
}
```

## Example

```javascript
import { setPageTheme } from 'tailwind-ui';
import { useEffect } from 'react';

function App() {
    useEffect(() => { setPageTheme()}, [])
    return <></>
}

export default App
```



