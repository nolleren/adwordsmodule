interface IAdGroup {
    adGroupId: number;
    name: string;
    keyWords: string;
    campaignId: number;
}

export class AdGroup implements IAdGroup {
    adGroupId: number;
    name: string;
    keyWords: string;
    campaignId: number;
}