import mongoose from 'mongoose';
import { Password } from '../services/password';

// an interface that describes the properties
// that are required to create a new user
interface UserAttrs {
	email: string;
	password: string;
}

// an interface that describes the properties
// that a user document has
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

// an interface that describes the properties
// that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			// dont want to send these back to user
			transform(doc, ret) {
				ret.id = ret._id; // change _id to id cause that is lame
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			},
			// versionKey: false is also an option
		},
	},
);

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done;
});

// how to build a method on mongoose model
// you build your own method on the statics object
userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
