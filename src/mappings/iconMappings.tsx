import { CalendarClockIcon, DropletIcon, HouseIcon, UserMinus2Icon, UserPlus2Icon, WifiIcon, ZapIcon } from "lucide-react";

export const MONTHLY_DUE_FILTER_ICON_MAPPING: {[key: string]: React.ReactElement<any>} = {
    "Utilities": <DropletIcon />,
    "Electricity": <ZapIcon />,
    "Internet": <WifiIcon />,
    "Rent": <HouseIcon />
}

export const DEBT_FILTER_ICON_MAPPING: {[key: string]: React.ReactElement<any>} = {
    "As Debtor": <UserPlus2Icon />,
    "As Creditor": <UserMinus2Icon />,
    "Overdue": <CalendarClockIcon />
}