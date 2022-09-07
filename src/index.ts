import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const application = express();

//Middlewares.
application.use(express.json());
application.use(express.urlencoded({ extended: true }));

//Routes.
application.use(usersRoute);
application.use(statusRoute);

//Error handler aplication.
application.use(errorHandler);

//Server Startup.
const PORT: string | number  = process.env.PORT || 3000;

application.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT + "\nhttp://localhost:3000");
});