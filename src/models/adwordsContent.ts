import { AdGroup } from './adGroup';
import { AdWordsAd } from './AdWordsAd';
import { CampaignListItem } from './campaignListItem';

interface IAdwordsContent {
    adGroupLo: AdGroup;
    contentProducts: AdWordsAd[];
}

export class AdwordsContent implements IAdwordsContent {
    adGroupLo: AdGroup;
    contentProducts: AdWordsAd[];
}
