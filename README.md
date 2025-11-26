<h1>Capstone: Building Maintenance App</h1>

<h3>Objective: Create a full-stack web application using MongoDB, Express, React, and Node (MERN).</h3>

<h4>Presentation: 11/25/2025</h4>

<hr>
<strong>MongoDB:</strong>
<ul>
<li>A NoSQL database used to store data in documents.</li>
<li>In this application, MongoDB stores tasks and volunteers.</li>
<li>Two Mongoose schemas are used in this project: Task.js & Volunteer.js</li>
<li>Database seeded with tasksSeed.js and volunteerSeed.js.</li> 
<li>Seed the database by running "node seeders/indexSeed.js" in the backend folder.</li> 
</ul>

<strong>Express:</strong> 
- Express provides the server framework that makes it easier to build applications within Node.
- Express provides a robust set of features for creating and scaling web applications through a flexible framework that includes HTTP utility methods and middleware.
- CRUD routes: Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE) 

<strong>React:</strong>
- React is a frontend JavaScript library for building user interfaces.

<strong>Node:</strong> 
- Node is a runtime environment that allows the execution of JavaScript code without a browser. 
- Node provides a JavaScript runtime on which servers can be built.

<hr>

<h3>Description: Application to host tasks, volunteers, and schedule for building maintenance.</h3> 


<strong>Home:</strong> 
- From the home page, the user can use one of the circles or the nav bar links to navigate to other pages of the app.

<strong>DisplayTasks:</strong> 
- Click on "Tasks" to view a card display of all tasks.

<strong>TaskDetails:</strong>
- Click on one of the task cards to see all details of the task.
- Click the "Edit Task" button to open the task in edit mode. 
- Click the "Delete Task" button to delete the current task.

<strong>EditTask:</strong>
- In edit mode, the user can delete steps from the instructions or change any other details related to the task, including title, frequency, last completed date, and due date. 
- In edit mode, click on the "Add Step" button to add more instructions. Click "Save Changes" when done editing.
- In edit mode, the user can assign a Lead Volunteer and Additional Volunteers to the task. 

<strong>DisplayVolunteers:</strong>
- Click on "Volunteers" to view a card display of all volunteers.

<strong>VolunteerDetails:</strong>
- Click on one of the volunteer cards to see all details of the volunteer, including skills. 
- Click on the "Edit Volunteer" button to edit volunteer details.
- Click ont the "Delete Volunteer" button to delete a volunteer.


<strong>EditVolunteer:</strong> 
- In edit mode, the user can delete skills or change any other details related to the volunteer, including name, email, and phone. 
- In edit mode, click on the "Add Skill" button to add more skills. Click "Save Changes" when done editing.

<strong>AddNewTask</strong>
- Click on Add New Task from the nav bar to open a form to add a new task.
- Click on the "Add Step" button to add more steps to the instructions.
- Click on "Save Task" when finished adding the new task.

<strong>AddNewVolunteer</strong>
- Click on Add New Volunteer from the nav bar to open a form to add a new volunteer.
- Click on the "Add Skill" button to add more skills.
- Click on "Add Volunteer" when finished adding the new volunteer.

<strong>Safety</strong>
- Click on Safety to view of list of recommended personal protective equipment (PPE).

<hr>

<strong>Future Enhancements:</strong>
- Add more tasks.
- Enhance scheduling capabilities to include the ability to send reminders. 
- Add ability to select volunteers based on skill. 
- Add user and admin roles.
- Link from Safety page to information about PPE.