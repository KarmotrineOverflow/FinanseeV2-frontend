export type User = {

    _id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    phoneNumber: string,
    email: string,
    reports: ReportRef[]
}

export type ReportRef = {

    _id: string,
    reportId: string,
    monthDate: string
}

export type Report = {

    _id: string,
    ownerId: string,
    monthDate: string,
    startingMoney: number,
    currentMoney: number,
    allocation: Allocation,
    income: TrackerEntry[],
    expense: TrackerEntry[],
    debt: Debt[],
    monthlyDue: MonthlyDue[]
}

export type TrackerEntry = {
    type: "Income" | "Expense" | "Debt" 
    description: string | undefined
    amount: number
    date: string
    allocation: "Savings" | "Pocket Money" | "Emergency Fund"
}

export type Debt = {

    isDebtor: boolean
    isPaid: boolean
    to: string
    amount: number
    description: string
    date: string
    allocation: "Savings" | "Pocket Money" | "Emergency Fund"   
}

export type MonthlyDue = {

    description: string,
    isPaid: boolean
    amount: number
    date: string
}

export type Allocation = {
    savings: number,
    pocketMoney: number,
    emergencyFund: number
}