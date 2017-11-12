import { Budget } from "./budget";

export class Campaign {
    budgetDto: Budget;
    name: string;
    startDate: Date;
    endDate: Date;

    constructor(){
        this.budgetDto = new Budget();
    }
}

export class CampaignList {
    id: number;
    name: string;
}