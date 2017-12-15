import { KeyValuePair } from "./keyValuePair";

interface IProduct {
    id: number;
    productNumber: string;
    productName: string;
    logicName: string;
    description: string;
    descriptionShort: string;
    adGroupId: number;
    isChecked: boolean;
    keyValuePairs: KeyValuePair[];
}

export class Product implements IProduct {
    id: number;
    productNumber: string;
    productName: string;
    logicName: string;
    description: string;
    descriptionShort: string;
    adGroupId: number;
    isChecked: boolean;
    keyValuePairs: KeyValuePair[];
}