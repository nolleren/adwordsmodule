import { BudgetDto } from "./budget";

export class CampaignDto {
    id: number;
    budget: BudgetDto;
    name: string;
    startDate: Date;
    endDate: Date;

    constructor(){
        this.budget = new BudgetDto();
    }
}

export class CampaignListItem {
    id: number;
    name: string;
}