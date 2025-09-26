__Tata Communications__

__Frontend Engineering Take\-Home Project: Application Service Health Dashboard__

Hello\! Thank you for your interest in joining our team\. We're building a next\-generation multi\-cloud networking platform that simplifies complex infrastructure for developers and enterprises\.

This project is designed to give you an opportunity to showcase your frontend development and UI/UX skills in a way that a traditional interview cannot\. It reflects the types of challenges we work on every day: visualizing complex data, managing application state, and creating intuitive user interfaces for technical users\.

Please read the instructions carefully\. We are excited to see what you build\!

1. __Project Goal & Overview__

Your task is to build a responsive, single\-page __Application Service Health Dashboard__\. This dashboard will display a real\-time, visual map of a fictional company's microservices architecture, allowing engineers to quickly understand the status and performance of their applications\.

User Persona: A DevOps Engineer or Site Reliability Engineer \(SRE\)\.

User Story: "As a DevOps Engineer, I need a dashboard that visualizes our application architecture\. I want to see how our services are connected and monitor their health in real\-time so I can rapidly identify and diagnose performance bottlenecks or outages\."

1. __Core Feature Requirements__
2. __The Canvas & Service Map__

- Render a graph/topology of application services and their connections based on the provided JSON data\.
- Services should be visually grouped by their "environment" \(e\.g\., a container or section for "Production" and another for "Staging"\)\.
- Use clear and distinct icons or visual cues for different service types \(e\.g\., API, Database, Cache, Frontend App\)\.

1. __Node & Connection Rendering__

- __Nodes \(Services\):__ Each service node must clearly display its name and have a visual indicator of its status\.
	- HEALTHY: Green indicator
	- DEGRADED: Orange/Amber indicator
	- OFFLINE: Red indicator
- __Connections \(API Calls\):__ Draw lines/edges between services that are connected\. The style of the line \(e\.g\., solid, dashed, color\) should also reflect the connection's status\.

1. __Interactivity__

- __Hover:__ When a user hovers over a node or a connection, a tooltip should appear showing its name and status\.
- __Click/Select:__ When a user clicks on a node or connection, it should enter a "selected" state \(e\.g\., with a different border or halo effect\)\. This action will populate the Details Panel\. The application should only have one selected item at a time\. Clicking the canvas background should deselect any item\.

1. __The Details Panel__

- This panel \(e\.g\., a sidebar\) should be visible when a node or connection is selected\.
- __If a Service Node is selected,__ display all its attributes: Name, Type, Tech, Version, and Status\.
- __If a Connection is selected,__ display its details: Source Service, Target Service, and Status\. It must also display __simulated real\-time metrics__ \(see below\)\.

1. __Real\-time Data Simulation__

- For any __selected connection__, the Details Panel should simulate receiving real\-time metrics\.
- The following metrics should update with a new, randomly generated value every __2\-3 seconds__:
	- __Requests Per Second \(RPS\):__ A value between 300\-1000\.
	- __Average Latency:__ A value between 50\-250ms\.
	- __Error Rate:__ A value between 0\.00% and 5\.00%\.

1. __Technical Specifications & Data__
2. __Data Source__

- Your application should fetch and use the following static JSON data\. You can serve this file locally or treat it as a mock API response\. __Do not modify the data structure\.__

*JSON*

*\{*

*  "nodes": \[*

*    \{ "id": "prod\-env", "type": "environment", "name": "Production" \},*

*    \{ "id": "staging\-env", "type": "environment", "name": "Staging" \},*

*    \{ "id": "frontend\-app", "type": "service", "parent": "prod\-env", "name": "React Frontend", "tech": "React", "version": "2\.1\.0", "status": "HEALTHY" \},*

*    \{ "id": "user\-api", "type": "service", "parent": "prod\-env", "name": "User API", "tech": "Node\.js", "version": "1\.8\.2", "status": "HEALTHY" \},*

*    \{ "id": "auth\-service", "type": "service", "parent": "prod\-env", "name": "Auth Service", "tech": "Go", "version": "1\.5\.0", "status": "DEGRADED" \},*

*    \{ "id": "postgres\-db", "type": "service", "parent": "prod\-env", "name": "PostgreSQL DB", "tech": "PostgreSQL", "version": "14\.2", "status": "HEALTHY" \},*

*    \{ "id": "redis\-cache", "type": "service", "parent": "prod\-env", "name": "Redis Cache", "tech": "Redis", "version": "7\.0", "status": "OFFLINE" \},*

*    \{ "id": "staging\-api", "type": "service", "parent": "staging\-env", "name": "Staging User API", "tech": "Node\.js", "version": "1\.9\.0\-rc", "status": "HEALTHY" \}*

*  \],*

*  "connections": \[*

*    \{ "id": "conn\-1", "source": "frontend\-app", "target": "user\-api", "status": "HEALTHY" \},*

*    \{ "id": "conn\-2", "source": "user\-api", "target": "postgres\-db", "status": "HEALTHY" \},*

*    \{ "id": "conn\-3", "source": "user\-api", "target": "auth\-service", "status": "DEGRADED" \},*

*    \{ "id": "conn\-4", "source": "user\-api", "target": "redis\-cache", "status": "OFFLINE" \},*

*    \{ "id": "conn\-5", "source": "auth\-service", "target": "postgres\-db", "status": "HEALTHY" \},*

*    \{ "id": "conn\-6", "source": "staging\-api", "target": "postgres\-db", "status": "HEALTHY" \}*

*  \]*

*\}*

1. __Frontend Stack__

- __Framework:__ You must use __React__, __Vue__, or __Svelte__\.
- __Styling:__ Use any modern styling approach you are comfortable with \(e\.g\., CSS Modules, Tailwind CSS, Styled\-components, SCSS\)\.
- __Visualization:__ You can use a library \(e\.g\., D3\.js, React Flow, Vis\.js\) or implement the visualization yourself using SVG/CSS\. Your choice and its justification are part of the evaluation\.

1. __Design & UX Guidelines__

- __Clarity and Readability:__ The dashboard must be easy to understand at a glance\. Prioritize clear typography, good contrast, and logical layout\.
- __Professional Aesthetic:__ While you don't need to be a graphic designer, the UI should look clean, modern, and polished\.
- __Responsiveness:__ The application should be usable on both desktop and tablet screen sizes\.

1. __Evaluation Criteria__

We will be looking at the following aspects of your submission:

1. __UI/UX Implementation:__ How closely does the final product match the requirements? Is it intuitive, clean, and user\-friendly?
2. __Code Quality:__ Is the code well\-structured, readable, and maintainable? Is the state management logical and efficient?
3. __Functionality & Correctness:__ Does the application work as expected? Are there any bugs?
4. __Attention to Detail:__ Are there smooth transitions, thoughtful micro\-interactions, and polished finishing touches?
5. __Bonus Points:__ While not required, things like unit tests, accessibility \(a11y\) considerations, a creative feature, or excellent documentation in the README will be viewed favourably\.
6. __Submission Instructions__

- __Time Suggestion:__ We respect your time\. We suggest spending approximately __4\-6 hours__ on this project\. The goal is not to build a production\-ready application, but to provide a strong sample of your work\. Please complete it as soon as possible but no later than one week from now\.
- __Deliverables:__ Please provide us with the following:

1. A link to a public __Git repository__ \(e\.g\., GitHub\)\.
2. A link to a live, working demo deployed on a service like __Vercel__ or __Netlify__\.
3. In your README\.md file, please include a brief note about any design decisions you made, challenges you faced, and instructions for running the project locally\.

If you have any questions, please don't hesitate to reach out\.

Good luck, and we look forward to seeing your work\!

