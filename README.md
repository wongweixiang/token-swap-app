# React + TypeScript + Vite

**Overview**

- Production deployment available at: https://token-swap-app-five.vercel.app/
- To run locally, npm install and then npm run dev
- To build, npm run build

**Notes about Implementation**

- A total of 8 tokens are supported for swapping
- User is not allowed to select the same token on both sides of the trade
- Button in the centre allows user to reverse the trade direction, if tokens have been selected

- React context is used to store selected tokens

**Libraries Used**

- react-hook-form for simple form lifecycle methods

- tailwindcss for inline styling

- js-big-decimal for handling math calculations and guarding against floating point errors in Javascript

- ShadCN for select component (sub-dependencies like @radix-ui, class-variance-authority, lucide-react). I like ShadCN because the source code of the component can be maintained locally without bloating the bundle
