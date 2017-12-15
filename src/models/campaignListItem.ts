interface ICampaignListItem {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    microAmount: number;
}

export class CampaignListItem implements ICampaignListItem {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    microAmount: number;
}