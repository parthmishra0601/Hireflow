HireFlow – Visual HR Workflow Builder

A node-based workflow designer built with Next.js, React Flow, and TailwindCSS.

HireFlow enables HR teams to visually create, configure, and simulate hiring and onboarding workflows. The application provides an interactive drag-and-drop interface, configurable workflow logic, and a built-in simulation engine for testing workflow behavior.

Features
Workflow Builder

Drag-and-drop interface using React Flow

Built-in workflow node types: Start, Task, Approval, Automated Action, End

Connect nodes visually and rearrange the layout interactively

Delete, modify, and reconfigure nodes in real time

Node Configuration Panel

Detailed configuration for each node

Supports metadata, deadlines, user assignments, automation parameters, and custom fields

Workflow Simulation

Step-by-step workflow execution

Log panel showing simulated transitions and decisions

Helps validate workflow structure and logic

UI and Architecture

Built with Next.js App Router (server and client components)

TailwindCSS for a modern, responsive interface

Modular and extendable component architecture

Strong TypeScript typing for workflow nodes and edges

Tech Stack

Next.js (App Router)

React Flow

TailwindCSS

TypeScript

Custom simulation API (mock)

Project Structure
src/
 ├─ app/
 │   ├─ layout.tsx                # Application layout (server component)
 │   ├─ page.tsx                  # Landing or entry page
 │   └─ builder/
 │       └─ page.tsx              # Workflow Builder route
 │
 ├─ components/
 │   ├─ WorkflowBuilder.tsx
 │   ├─ NodeSidebar.tsx
 │   ├─ NodeFormPanel.tsx
 │   └─ nodes.ts
 │
 ├─ lib/
 │   └─ mockApi.ts                # Workflow simulation logic
 │
 └─ app/globals.css               # Global and Tailwind styles

Installation and Setup
Clone the repository
git clone https://github.com/yourusername/HireFlow.git
cd HireFlow

Install dependencies
npm install

Start the development server
npm run dev


The application will be available at:

http://localhost:3000


Access the workflow builder at:

http://localhost:3000/builder

Usage Overview

Use the sidebar to add workflow nodes.

Drag nodes around and connect them to form a process.

Select a node to configure its properties in the right panel.

Run a simulation to verify workflow logic and observe execution logs.

Future Enhancements

Authentication and user roles

Database support for saving workflows

Import/export workflows as JSON

Workflow templates

Integration with external HR platforms and automation tools
