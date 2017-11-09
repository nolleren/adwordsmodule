import { Budget } from "./budget";

export class Campaign {
    budget: Budget;
    id?: number;
    name: string;
    startDate: Date;
    endDate: number;

    constructor(){
        this.budget = new Budget();
    }
}