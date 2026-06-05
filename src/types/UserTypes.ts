export type Income = {

    Type: string
    Description: string | undefined
    Amount: number
    DateReceived: string
    Allocation: "Savings" | "Pocket Money" | "Emergency Fund"
}

export type Expense = {

    Type: string,
    Description: string,
    Amount: number,
    DateSpent: string
    Allocation: "Savings" | "Pocket Money" | "Emergency Fund"
}

export type Debt = {

    isDebtor: boolean
    isPaid: boolean
    To: string
    Amount: number
    Description: string
    Date: string
    Allocation: "Savings" | "Pocket Money" | "Emergency Fund"
}

export type MonthlyDue = {

    BillName: string,
    isPaid: boolean
    Amount: number
    Date: string
}

export type ReportSheet = {
    
    Income: Array<Income>
    Expense: Array<Expense>
    Debt: Array<Debt>
    MonthlyDue: Array<MonthlyDue>
}

export type MonthlyReport = {

    OwnerId: string,
    MonthYear: string
    StartingMoney: number
    CurrentMoney: number
    MoneyAllocation: MoneyAllocation
    MonthSheet: ReportSheet
}

export type MoneyAllocation = {
    
    Savings: number
    PocketMoney: number
    EmergencyFund: number
}

export type User = {

    UserId: string,
    FirstName: string,
    LastName: string,
    MonthlyReports: MonthlyReport[]
}