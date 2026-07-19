import { DropletIcon, HouseIcon, WifiIcon, ZapIcon } from "lucide-react";

export const MONTHLY_DUE_FILTER_ICON_MAPPING: {[key: string]: React.ReactElement<any>} = {
    "Utilities": <DropletIcon />,
    "Electricity": <ZapIcon />,
    "Internet": <WifiIcon />,
    "Rent": <HouseIcon />
}