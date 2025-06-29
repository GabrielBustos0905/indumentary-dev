
import { DashboardStats } from "./DashboardStats";
import { ProductsChart } from "./ProductsChart";
import { SalesChart } from "./SalesChart";

export function Dashboard() {
    return (
        <div>
            <SalesChart />
            <ProductsChart />
            <DashboardStats />
        </div>
    )
}