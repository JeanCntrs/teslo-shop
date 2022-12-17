import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order, Product } from '../../../models';

type Data = { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return payOrder(req, res);

        default:
            res.status(400).json({ message: 'Bad request' });
            break;
    }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { orderItems, total } = req.body as IOrder;

    const session: any = await getSession({ req });

    if (!session) {
        return res.status(4001).json({ message: 'Unauthorized' });
    }

    const productsIds = orderItems.map(product => product._id);

    await db.connect();

    const dbProducts = await Product.find({ _id: { $in: productsIds } });

    try {

    } catch (error: any) {
        await db.disconnect();
        console.log('error in payOrder', error)
        return res.status(400).json({ message: error.message || 'Check server logs' });
    }
}
