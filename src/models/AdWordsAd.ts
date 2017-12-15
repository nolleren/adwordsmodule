import { Product } from './product';
import { AdContent } from './adContent';
import { CampaignListItem } from './campaignListItem';

interface IAdWordsAd {
    adContent: AdContent;
    finalUrl: string[];
    productId: number;
}

export class AdWordsAd implements IAdWordsAd {
    adContent: AdContent;
    finalUrl: string[];
    productId: number;
}