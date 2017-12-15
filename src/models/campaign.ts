import { BudgetDto } from "./budget";

interface ICampaignDto {
    id: number;
    budget: BudgetDto;
    name: string;
    startDate: Date;
    endDate: Date;
}

export class CampaignDto implements ICampaignDto {
    id: number;
    budget: BudgetDto;
    name: string;
    startDate: Date;
    endDate: Date;

    constructor(){
        this.budget = new BudgetDto();
    }
}