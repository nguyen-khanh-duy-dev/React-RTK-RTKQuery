import { useGetProvincesQuery } from "@/features/provinces"

function Provinces() {
    const { data, isLoading } = useGetProvincesQuery()

    if (isLoading) return <p>Loading...</p>

    return (
        <div>
            {data.map((province) => (
                <div key={province.province_id}>{province.name}</div>
            ))}
        </div>
    )
}

export default Provinces
