import { Schema, model, Document, Model, Types } from 'mongoose';

export interface IUser extends Document {
	name: string;
	username: string;
	email: string;
	bio: string;
	password: string; 
}

const userSchema: Schema<IUser> = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	bio: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},  
	 
});

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
