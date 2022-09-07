import { Router, Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../models/errors/database.error.model';
import userRepository from '../repositories/user.repository';

const usersRoute: Router = Router();

//get /users
usersRoute.get('/users', async function(request: Request, response: Response, next: NextFunction) {
    const users = await userRepository.findAllUsers();
    response.sendStatus(StatusCodes.OK).json(users);
});

//get /users/:uuid
usersRoute.get('/user/:uuid', async function(request: Request<{ uuid: string }>, response: Response, next: NextFunction) {
    try {
        const user = await userRepository.findById(request.params.uuid);
        response.sendStatus(StatusCodes.OK).send(user);
    } catch (error) {
        next(error);
    }
});

//post /users
usersRoute.post('/users', async function(request: Request, response: Response, next: NextFunction) {
    const uuid = await userRepository.create(request.body);
    response.sendStatus(StatusCodes.CREATED).send(uuid);
});

//put /users/:uuid
usersRoute.put('/users/:uuid', async function(request: Request<{ uuid: string }>, response: Response, next: NextFunction) {
    const modifiedUser = request.body;
    modifiedUser.uuid = request.params.uuid;
    await userRepository.update(request.body);
    response.sendStatus(StatusCodes.OK);
});

//delete /users/:uuid
usersRoute.delete('/users/:uuid', async function(request: Request<{ uuid: string }>, response: Response, next: NextFunction) {
    await userRepository.remove(request.params.uuid);
    response.sendStatus(StatusCodes.OK);
});

export default usersRoute;