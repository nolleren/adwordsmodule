import { Product } from './product';
import { AdContent } from './adContent';
import { CampaignListItem } from './campaign';

export class AdWordsAd {
    adContent: AdContent;
    id: number;
    finalUrl: string[];
}