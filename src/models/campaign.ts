import { Budget } from "./budget";

export class Campaign {
    budgetDto: Budget;
    id?: number;
    name: string;
    startDate: Date;
    endDate: Date;

    constructor(){
        this.budgetDto = new Budget();
    }
}