import { useEffect, useState } from "react";
import chairImage from "../../../assets/images/furniture-logo.png";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

const PopularCategory = () => {
    const [showAll, setShowAll] = useState(false);
    const categories = [
        { id: 1, name: "Chair" },
        { id: 2, name: "Table" },
        { id: 3, name: "Sofa" },
        { id: 4, name: "Desk" },
        { id: 5, name: "Bookshelf" },
        { id: 6, name: "Lamp" },
        { id: 7, name: "Mirror" },
        { id: 8, name: "Side Table" },
        { id: 9, name: "Drawer" },
        { id: 10, name: "Cabinet" },
        { id: 1, name: "Chair" },
        { id: 2, name: "Table" },
        { id: 3, name: "Sofa" },
        { id: 4, name: "Desk" },
        { id: 5, name: "Bookshelf" },
        { id: 6, name: "Lamp" },
        { id: 7, name: "Mirror" },
        { id: 8, name: "Side Table" },
        { id: 9, name: "Drawer" },
        { id: 10, name: "Cabinet" },
        { id: 1, name: "Chair" },
        { id: 2, name: "Table" },
        { id: 3, name: "Sofa" },
        { id: 4, name: "Desk" },
        { id: 5, name: "Bookshelf" },
        { id: 6, name: "Lamp" },
        { id: 7, name: "Mirror" },
        { id: 8, name: "Side Table" },
        { id: 9, name: "Drawer" },
        { id: 10, name: "Cabinet" },
        { id: 1, name: "Chair" },
        { id: 2, name: "Table" },
        { id: 3, name: "Sofa" },
        { id: 4, name: "Desk" },
        { id: 5, name: "Bookshelf" },
        { id: 6, name: "Lamp" },
        { id: 7, name: "Mirror" },
        { id: 8, name: "Side Table" },
        { id: 9, name: "Drawer" },
        { id: 10, name: "Cabinet" },
        { id: 1, name: "Chair" },
        { id: 2, name: "Table" },
        { id: 3, name: "Sofa" },
        { id: 4, name: "Desk" },
        { id: 5, name: "Bookshelf" },
        { id: 6, name: "Lamp" },
        { id: 7, name: "Mirror" },
        { id: 8, name: "Side Table" },
        { id: 9, name: "Drawer" },
        { id: 10, name: "Cabinet" }
    ];

    const initialDisplayCount = 6;
    const [displayedCategories, setDisplayedCategories] = useState([]);
    const [showMoreCount, setShowMoreCount] = useState(6);

    useEffect(() => {
        setDisplayedCategories(categories?.slice(0, initialDisplayCount));
    }, []);

    const handleViewAll = () => {
        setShowAll(!showAll);
        setDisplayedCategories(categories.slice(0, 12));
        setShowMoreCount(12);
    };

    const handleShowMore = () => {
        const newCount = showMoreCount + 18;
        setDisplayedCategories(categories.slice(0, newCount));
        setShowMoreCount(newCount);
    };

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
    if (windowWidth >= 1280) gridCols = "2xl:grid-cols-6";

    return (
        <div className="es_container mx-auto md:px-20 xl:px-0 px-5">
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl my-6 font-semibold text-[#008140]">Popular Categories</h1>
                    <div onClick={handleViewAll} className="cursor-pointer font-medium flex items-center gap-1"><span>View All</span> {showAll ? <FaAngleDown /> : <FaAngleRight />}</div>
                </div>
            </div>
            <div className={`grid gap-4 ${gridCols}`}>
                {displayedCategories.map((category) => (
                    <div key={category.id} className="bg-white shadow p-5 rounded-md">
                        <div className="text-center">
                            <img className="w-24 mx-auto" src={chairImage} alt={category.name} />
                            <p className="mt-2">{category.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            {displayedCategories.length >= 12 && displayedCategories.length < categories.length && (
                <div className="text-center ">
                    <button
                        onClick={handleShowMore}
                        className="mt-4 bg-[#008140] hover:bg-[#183f2c] text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        Show More
                    </button>

                </div>
            )}
        </div>
    );
};

export default PopularCategory;
