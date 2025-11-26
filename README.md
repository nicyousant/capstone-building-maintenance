<h1>Capstone: Building Maintenance App</h1>

<h3>Objective: Create a full-stack web application using MongoDB, Express, React, and Node (MERN).</h3>

<h4>Presentation: 11/25/2025</h4>


<h5>MongoDB:</h5>
<ul>
<li>A NoSQL database used to store data in documents.</li>
<li>In this application, MongoDB stores tasks and volunteers.</li>
<li>Two Mongoose schemas are used in this project: Task.js & Volunteer.js</li>
<li>Database seeded with tasksSeed.js and volunteerSeed.js.</li> 
<li>Seed the database by running "node seeders/indexSeed.js" in the backend folder.</li> 
</ul>

Express: 
- Express provides the server framework that makes it easier to build applications within Node.
- Express provides a robust set of features for creating and scaling web applications through a flexible framework that includes HTTP utility methods and middleware.
- CRUD routes: Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE) 

React:
- React is a frontend JavaScript library for building user interfaces.

Node: 
- Node is a runtime environment that allows the execution of JavaScript code without a browser. 
- Node provides a JavaScript runtime on which servers can be built.



Description: Application to host tasks, volunteers, and schedule for building maintenance. 


Home: 
- From the home page, the user can use one of the circles or the nav bar links to navigate to other pages of the app.

DisplayTasks: 
- Click on "Tasks" to view a card display of all tasks.

TaskDetails:
- Click on one of the task cards to see all details of the task.
- Click the "Edit Task" button to open the task in edit mode. 
- Click the "Delete Task" button to delete the current task.

EditTask:
- In edit mode, the user can delete steps from the instructions or change any other details related to the task, including title, frequency, last completed date, and due date. 
- In edit mode, click on the "Add Step" button to add more instructions. Click "Save Changes" when done editing.
- In edit mode, the user can assign a Lead Volunteer and Additional Volunteers to the task. 

DisplayVolunteers:
- Click on "Volunteers" to view a card display of all volunteers.

VolunteerDetails:
- Click on one of the volunteer cards to see all details of the volunteer, including skills. 
- Click on the "Edit Volunteer" button to edit volunteer details.
- Click ont the "Delete Volunteer" button to delete a volunteer.


EditVolunteer: 
- In edit mode, the user can delete skills or change any other details related to the volunteer, including name, email, and phone. 
- In edit mode, click on the "Add Skill" button to add more skills. Click "Save Changes" when done editing.

AddNewTask
- Click on Add New Task from the nav bar to open a form to add a new task.
- Click on the "Add Step" button to add more steps to the instructions.
- Click on "Save Task" when finished adding the new task.

AddNewVolunteer
- Click on Add New Volunteer from the nav bar to open a form to add a new volunteer.
- Click on the "Add Skill" button to add more skills.
- Click on "Add Volunteer" when finished adding the new volunteer.

Safety
- Click on Safety to view of list of recommended personal protective equipment (ppe).


Future Enhancements:
- Add more tasks.
- Enhance scheduling capabilities to include the ability to send reminders. 
- Add ability to select volunteers based on skill. 