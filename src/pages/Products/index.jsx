import { useFetchProductsList, useProductsList } from "@/features/products"

function Products() {
    useFetchProductsList()
    const products = useProductsList()

    if (!products) return
    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>{product.title}</div>
            ))}
        </div>
    )
}

export default Products
