# Sentinel Hub

Sentinel Hub is an email security tool designed to detect and report spam emails and potential malicious threats. It provides comprehensive information about emails, including strings, YARA rules, and more, to help users identify and respond to email-based security risks effectively.

## Features

- **Email Inspection**: Sentinel Hub thoroughly inspects email content to identify potentially harmful elements.
- **String Analysis**: The tool analyzes the text strings in emails, helping users understand the content better.
- **YARA Rule Detection**: Sentinel Hub uses YARA rules to detect patterns that may indicate malicious activity.
- **User-Friendly Interface**: The intuitive interface makes it easy for users to view and interpret email analysis results.

## Getting Started

These instructions will help you set up and run Sentinel Hub on your local machine for development and testing purposes.

### Tech

**Client**:

- React using Vite (for main renderer)
- TailwindCSS (for styles)

**Server**:

- Node.js and npm (Node Package Manager)
- Express (for Rest API)
- MongoDB (for data storage)

## Installation

Clone the repository.

```bash
git clone https://github.com/your-username/sentinel-hub.git
```

Navigate to the project directory.

```
bash
cd sentinel-hub
```

Install project dependencies.

```bash
npm install
```

Configure the environment variables by creating a .env file and adding your configuration.

```dotenv
PORT=1200
JWT_SECRET=your_jwt_secret

MONGO_URI=your_mongodb_connection_uri
```

Start the development server.

```bash
npm run dev

```

Access the client application in your browser at http://localhost:3000 and the rest api application at http://localhost:1200.

## Contributing

Contributions are welcome! Please read our Contributing Guidelines (`contributing.md`) to get started.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)

## Prerequisites

Before running the application, please follow these setup instructions to ensure everything works smoothly.

### TypeScript Compilation

This project is written in TypeScript, so you'll need to compile the code before launching it.

#### Yara Rules Folder

To enable Yara rule execution, follow these steps:

- Inside the server/dist/utils/ directory, create a new folder called yara.

- Download the official Yara Executable that corresponds to your server's operating system.

- Place the downloaded Yara Executable file into the newly created yara folder.

_These steps are essential for the application to function correctly and efficiently._
