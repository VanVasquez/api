import { Router, Request, Response } from 'express';
import {
	EditAccount,
	LoginAccount,
	CreateAccount,
	DeleteAccount,
	GetAllAccounts,
} from '../controller/authentication.controller';

const route = Router();

route.get('/all', async (req: Request, res: Response) => {
	const { statusCode, message, data } = await GetAllAccounts();
	return res.status(statusCode).json({ message, data });
});

route.post('/register', async ({ body }: Request, res: Response) => {
	const { statusCode, message, data } = await CreateAccount(body);
	return res.status(statusCode).json({ message, data });
});

route.get('/login', async ({ query }: Request, res: Response) => {
	const { username, password } = query;
	const { statusCode, message, data } = await LoginAccount({
		username: username as string,
		password: password as string,
	});
	return res.status(statusCode).json({ message, data });
});

route.put('/update/id/:id', async (req: Request, res: Response) => {
	const { name, bio } = req.body;
	const { id } = req.params;
	const { statusCode, message, data } = await EditAccount({ id, name, bio });
	return res.status(statusCode).json({ message, data });
});

route.delete(
	'/remove/userId/:userId',
	async ({ params }: Request, res: Response) => {
		const { userId } = params;
		const { statusCode, message, data } = await DeleteAccount({ id: userId });
		return res.status(statusCode).json({ message, data });
	}
);

export default route;
