export interface StockFinancial {
    price?: Price;
    summaryDetail?: Details;
    symbol?: string;
    isActive?: boolean;
}

export interface Price{
    currencySymbol: string;
    shortName: string;
    regularMarketPrice: {raw: number, fmt: string};
}

export interface Details{
    dayHigh: {raw: number, fmt: string};
    dayLow: {raw: number, fmt: string};
    fiftyTwoWeekHigh: {raw: number, fmt: string};
    fiftyTwoWeekLow: {raw: number, fmt: string};
}

export interface ToggleEvent {
    symbol: string;
    isOpen: boolean;
}