
import { ProductsChart } from "./ProductsChart";
import { SalesChart } from "./SalesChart";

export function Dashboard() {
    return (
        <div>
            <SalesChart />
            <ProductsChart />
        </div>
    )
}