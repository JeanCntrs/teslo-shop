import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder, IPaypal } from '../../../interfaces';
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

const getPaypalBearerToken = async (): Promise<string | null> => {
    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials')

    try {
        const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${base64Token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return data.access_token
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        } else {
            console.log(error);
        }

        return null;
    }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const paypalBearerToken = await getPaypalBearerToken();

    if (!paypalBearerToken) {
        return res.status(400).json({ message: 'Token not created' });
    }

    const { transactionId = '', orderId = '' } = req.body;

    const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
        headers: {
            'Authorization': `Bearer ${paypalBearerToken}`
        }
    });

    if (data.status !== 'COMPLETED') {
        return res.status(401).json({ message: 'Order not completed' });
    }

    await db.connect();
    const dborder = await Order.findById(orderId);

    if (!dborder) {
        await db.disconnect();

        return res.status(400).json({ message: 'Order not found' });
    }

    if (dborder.total !== Number(data.purchase_units[0].amount.value)) {
        await db.disconnect();

        return res.status(400).json({ message: 'Invalid amount' });
    }

    dborder.transactionId = transactionId;
    dborder.isPaid = true;
    await dborder.save();

    await db.disconnect();

    return res.status(200).json({ message: 'Paid order' });
}
