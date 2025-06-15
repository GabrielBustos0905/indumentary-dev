export type Order = {
    createdAt: string;
    items: { quantity: number; unitPrice: number }[];
};

export type DailyStats = {
    date: string;
    totalRevenue: number;
    totalUnits: number;
};