# Tabs-Saver

A browser extension that saves all your open tabs in a database.

## Overview

Tabs-Saver is a workflow automation tool designed to help you keep track of your browsing sessions. Instead of losing your tabs history when you close your browser, this extension allows you to save all open tabs with a single click. Whether you're conducting research or working on multiple projects, Tabs-Saver ensures you can always revisit your browsing sessions effortlessly.

## Features

- **Save Open Tabs** – Click a button to store all currently open tabs.
- **Persistent History** – Maintain a record of all browsing sessions.
- **Easy Retrieval** – Quickly reopen saved tabs for seamless workflow continuation.

## Tech Stack

### Current Implementation

- **Frontend:** Pure JavaScript (SPA, no framework)
- **Backend:** Flask (Server-Side Rendering)
- **Database:** SQLite (for initial development and testing)

### Future Improvements

- **Database Migration** – Move from SQLite to PostgreSQL for scalability.
- **Backend Upgrade** – Transition from Flask to FastAPI for better performance and async handling.
- **AI-Powered Categorization** – Dynamically categorize tabs based on content.
- **Multi-User Support** – Implement authentication and user-based storage.
- **Cloud Deployment** – Host backend on PythonAnywhere (initially) and transition to Google Cloud for a full web app.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tabs-saver.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tabs-saver
   ```
3. Load the extension into your browser:
   - Open `chrome://extensions/` (for Chrome-based browsers).
   - Enable Developer Mode.
   - Click "Load unpacked" and select the extension folder.

## Usage

1. Open multiple tabs in your browser.
2. Click the "Save Tabs" button in the extension.
3. Access your saved sessions whenever needed.

## License

This project is licensed under the Apache License 2.0.

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.
