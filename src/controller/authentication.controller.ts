import User, { IUser } from '../model/User';

type IResponse = {
	statusCode: number;
	message?: string;
	data?: any;
};

type IData = {
	id?: string;
	email?: string;
	password?: string;
	username?: string;
	name?: string;
	bio?: string;
};

export const CreateAccount = async (data: IData): Promise<IResponse> => {
	try {
		const user = new User(data);
		const savedUser = await user.save();
		return {
			statusCode: 201,
			message: 'Account successfully registered',
			data: savedUser,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error registering the account',
		};
	}
};

export const LoginAccount = async ({
	username,
	password,
}: IData): Promise<IResponse> => {
	try {
		const user: IUser | null = await User.findOne({ username: username });
		if (!user) {
			return {
				statusCode: 404,
				message: 'User not found',
			};
		}
		if (user.password !== password) {
			return { statusCode: 404, message: 'Invalid password' };
		}

		return { statusCode: 200, data: user };
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error registering the account',
		};
	}
};

export const EditAccount = async ({
	id,
	name,
	bio,
}: IData): Promise<IResponse> => {
	try {
		const user = await User.findById(id);
		if (!user) {
			return { statusCode: 404, message: 'User not found' };
		}
		if (name) {
			user.name = name;
		}
		if (bio) {
			user.bio = bio;
		}
		await user.save();
		return {
			statusCode: 200,
			message: 'Success',
		};
	} catch (err) {
		return { statusCode: 500, message: 'An error occurred' };
	}
};

export const DeleteAccount = async ({ id }: IData): Promise<IResponse> => {
	try {
		await User.findByIdAndDelete(id);
		return {
			statusCode: 200,
			message: 'Success',
		};
	} catch (err) {
		return { statusCode: 500, message: 'An error occurred' };
	}
};

export const GetAllAccounts = async (): Promise<IResponse> => {
	const users = await User.find({});
	return {
		statusCode: 200,
		message: 'Accounts',
		data: users,
	};
};
