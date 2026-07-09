<h1 align="center">Trello Clone</h1>
<p align="center">
A modern Trello-inspired task management application for organizing boards, columns, and tasks with drag-and-drop functionality.
</p>

<br/>
<br/>

## Live Demo
[Open the Live Website](https://YOUR-VERCEL-LINK.vercel.app)

<br/>

## Description

Trello Clone is a full-stack task management application inspired by Trello. Users can create boards, organize columns, manage tasks, and reorder everything using drag-and-drop. Authentication is handled with JWT, and all data is stored in MongoDB.

<br/>

## Features

- User Authentication (Sign Up / Sign In)
- JWT Authentication with HTTP-only Cookies
- Create, Edit and Delete Boards
- Create, Edit and Delete Columns
- Create, Edit and Delete Tasks
- Drag & Drop Columns
- Drag & Drop Tasks
- Move Tasks Between Columns
- Responsive Design
- Loading Spinner
- Toast Notifications
- Task Color Labels
- Copy Task Content
- View Task Details
- Persistent Data with MongoDB

<br/>

## Screenshots

###### Desktop

![Screenshot](./public/screenshot/desktop-1.png)

<br/>

![Screenshot](./public/screenshot/desktop-2.png)

<br/>

###### Mobile

<table>
<tr>
<td><img src="./public/screenshot/mobile-1.png" width="280"/></td>
<td><img src="./public/screenshot/mobile-2.png" width="280"/></td>
</tr>
</table>

<br/>

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
- React Query (TanStack Query)
- dnd-kit
- JWT Authentication
- Lucide React

<br/>

## Installation & Usage

###### Requirements

- Node.js
- npm

###### Installation Steps

1. Clone the project

```bash
git clone https://github.com/KavehKhorshidiii/Trello.git
```

2. Move into the project directory

```bash
cd Trello
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file

```env
MONGODB_URI=your_mongodb_connection_string
SECRET_JWT=your_secret_key
```

###### Usage Steps

Start the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

<br/>

## Project Goals

- Practice building a full-stack application using Next.js
- Learn MongoDB and Mongoose for database management
- Implement secure JWT Authentication
- Practice Server Actions and API Routes
- Improve state management with React Query
- Build a responsive drag-and-drop interface using dnd-kit

<br/>

## TODO (Next Steps)

- [ ] PWA support
- [ ] Activity history
- [ ] Due dates for tasks
- [ ] File attachments
- [ ] User profile page

<br/>

## License

**Proprietary code – do not use without permission.**

<br/>

## Author

**Kaveh Khorshidi**

[![GitHub](https://img.shields.io/badge/GitHub-kavehkhorshidiii-181717?logo=github)](https://github.com/KavehKhorshidiii)

[![Email](https://img.shields.io/badge/Email-kavehkhorshidiii%40gmail.com-181717?logo=gmail&logoColor=white)](mailto:kavehkhorshidiii@gmail.com)