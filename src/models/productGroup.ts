import { Product } from './product';

interface IProductGroup {
    id: number;
    groupName: string;
    products: Product[];
}

export class ProductGroup implements IProductGroup {
    id: number;
    groupName: string;
    products: Product[];
}