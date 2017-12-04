import { KeyValuePair } from "./keyValuePair";

export class Product {
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