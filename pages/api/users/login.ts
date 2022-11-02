import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import bcrypt from 'bcryptjs';
import { User } from '../../../models';
import { jwt } from '../../../utils';

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
            return loginUser(req, res);

        default:
            res.status(400).json({ message: 'Bad request' });
            break;
    }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = '', password = '' } = req.body;

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if (!user) {
        return res.status(400).json({ message: 'Invalid user' });
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    const { _id, name, role } = user;

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
