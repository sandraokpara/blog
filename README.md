# Sandra Okpara's Blog

Welcome to the repository for Sandra Okpara's personal blog and website. This project is built with Next.js, providing a robust foundation for creating a dynamic and engaging online presence. Below, you'll find essential information about the project structure, scripts, dependencies, and configuration.

### Project Structure

The project structure is organized to facilitate easy development and maintenance. Key directories include:

- **`config/`**: Contains configuration files for the blog.
- **`lib/`**: Houses utility functions, such as fonts and other libraries.
- **`styles/`**: Holds global styles for the project.
- **`components/`**: Includes layout components like `Footer`, `Header`, and `Toaster`.

### Scripts

- **dev**: Run the development server with `next dev`.
- **build**: Build the application for production using `next build`.
- **start**: Start the production server using `next start`.
- **lint**: Run Next.js linting with `next lint`.
- **lint:fix**: Fix linting issues automatically with `next lint --fix`.
- **preview**: Build and start the application for preview.
- **typecheck**: Run TypeScript type checking with `tsc --noEmit`.
- **format:write**: Automatically format code with Prettier.
- **format:check**: Check if the code meets Prettier formatting standards.

### Dependencies

- **@graphcms/rich-text-react-renderer**: ^0.6.1
- **@radix-ui/react-avatar**: ^1.0.3
- **@radix-ui/react-dialog**: ^1.0.4
- **@radix-ui/react-dropdown-menu**: ^2.0.5
- ... (and many more)

### Development Dependencies

- **@ianvs/prettier-plugin-sort-imports**: ^3.7.2
- **@types/lodash.debounce**: ^4.0.7
- **@types/node**: ^20.9.0
- **@types/react**: ^18.2.14
- ... (and many more)

### Configuration

The main configuration file is `config/site.ts`, which contains essential details about Sandra Okpara's blog, such as title, description, and metadata. 

### Layout Components

The layout components (`Footer`, `Header`, `Toaster`) in the `components/layout` directory contribute to the overall structure and design of the blog.

### Getting Started

1. Clone the repository: `git clone https://sandraokpara/blog.git`
2. Install dependencies: `npm install`
3. Customize the `config/site.ts` file with your details.

### Additional Notes

- Ensure all dependencies are up-to-date for optimal performance.
- Regularly check for updates in the Next.js ecosystem.
