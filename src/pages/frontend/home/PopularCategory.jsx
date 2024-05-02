import chairImage from "../../../assets/images/furniture-logo.png";
import { useEffect, useState } from "react";

const PopularCategory = () => {
    const categories = [
        { id: 1, name: "Chair" },
        { id: 2, name: "Table" },
        { id: 3, name: "Sofa" },
        { id: 4, name: "Desk" },
        { id: 5, name: "Bookshelf" },
        { id: 6, name: "Lamp" },
        { id: 1, name: "Chair" },
        { id: 2, name: "Table" },
        { id: 3, name: "Sofa" },
        { id: 4, name: "Desk" },
        { id: 5, name: "Bookshelf" },
        { id: 6, name: "Lamp" },
    ];

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    let gridCols = "grid-cols-2";
    if (windowWidth >= 640) gridCols = "sm:grid-cols-2";
    if (windowWidth >= 768) gridCols = "md:grid-cols-3";
    if (windowWidth >= 1024) gridCols = "lg:grid-cols-4";
    if (windowWidth >= 1200) gridCols = "lg:grid-cols-5";
    if (windowWidth >= 1280) gridCols = "xl:grid-cols-6";

    return (
        <div className="es_container mx-auto md:px-20 xl:px-0 px-5">
            <h1 className="text-2xl my-6">Popular Categories</h1>
            <div className={`grid gap-4 ${gridCols}`}>
                {categories.map((category) => (
                    <div key={category.id} className="bg-[#D4D3D3] shadow p-5">
                        <div className="text-center">
                            <img className="w-24 mx-auto" src={chairImage} alt={category.name} />
                            <p className="mt-2">{category.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategory;
