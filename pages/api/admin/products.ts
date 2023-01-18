import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Order, Product } from '../../../models';

type Data =
    | { message: string }
    | IProduct[]
    | IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProducts(req, res);

        case 'PUT':
            return updateProduc(req, res);

        case 'POST':
            return createProduct(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const products = await Product.find()
        .sort({ title: 'asc' })
        .lean();
    await db.disconnect();

    return res.status(200).json(products);
}

const updateProduc = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { _id = '', images = [] } = req.body as IProduct;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ message: 'Invalid id' });
    }

    if (images.length < 2) {
        return res.status(400).json({ message: 'Invalid images, required min 2' });
    }

    try {
        await db.connect();

        const product = await Product.findById(_id)

        if (!product) {
            await db.disconnect();
            return res.status(400).json({ message: 'Invalid product' });
        }

        await product.update(req.body);

        await db.disconnect();

        return res.status(200).json(product);
    } catch (error) {
        await db.disconnect();

        return res.status(400).json({ message: 'Server error' });
    }
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { images = [] } = req.body as IProduct;

    if (images.length < 2) {
        return res.status(400).json({ message: 'Invalid images, required min 2' });
    }

    try {
        await db.connect();

        const productFound = await Product.findOne({slug:req.body.slug});

        if (productFound) {
            await db.disconnect();
            return res.status(400).json({ message: 'Slug exists' });
        }

        const product = new Product(req.body);
        await product.save();

        await db.disconnect();

        return res.status(201).json(product);
    } catch (error) {
        await db.disconnect();

        return res.status(400).json({ message: 'Server error' });
    }
}
