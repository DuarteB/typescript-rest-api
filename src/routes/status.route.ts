import { Router, Request, Response, NextFunction } from 'express';
const statusRoute: Router = Router();

statusRoute.get('/status', function(request: Request, response: Response, next: NextFunction) {
    response.status(200).send({ message: "Hello!"});
});

export default statusRoute;