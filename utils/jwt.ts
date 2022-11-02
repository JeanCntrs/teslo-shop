import jwt from 'jsonwebtoken';

export const singToken = (_id: string, email: string) => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('jwt secret not found');
    }

    return jwt.sign({ _id, email }, process.env.JWT_SECRET_SEED, { expiresIn: '7d' });
}

export const isValidToken = (token: string): Promise<string> => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('jwt secret not found');
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) return reject('Invalid token');

                const { _id } = payload as { _id: string }

                resolve(_id);
            });
        } catch (error) {
            reject('Invalid token');
        }
    })
}