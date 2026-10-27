import type {JwtPayload} from '../middlewares/User.middlewares.ts';

declare global{
    namespace Express {
        interface Request{
            user?: JwtPayload
        }
    }
}

export {};