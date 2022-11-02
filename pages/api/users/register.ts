import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import bcrypt from 'bcryptjs';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';

type Data =
    | { message: string }
    | {
        token: string;
        user: {
            name: string;
            email: string;
            role: string;
        }
    }


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return registerUser(req, res);

        default:
            res.status(400).json({ message: 'Bad request' });
            break;
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { name = '', email = '', password = '' } = req.body as { name: string, email: string, password: string };

    if (name.length < 2) {
        return res.status(400).json({ message: 'Name must contain at least 2 characters' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must contain at least 6 characters' });
    }

    if (!validations.isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client'
    });

    try {
        await newUser.save({ validateBeforeSave: true });
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }

    const { _id, role } = newUser;

    const token = jwt.singToken(_id, email);

    return res.status(200).json({
        token,
        user: {
            name,
            email,
            role
        }
    });
}
