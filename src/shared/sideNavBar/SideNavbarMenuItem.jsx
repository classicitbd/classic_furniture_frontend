
import { Link } from 'react-router-dom';

const SideNavbarMenuItem = () => {
    const menuItems = [
        {
            id: 1,
            text: "Order",
            link: "/dashboard",
        },
        {
            id: 2,
            text: "Customer",
            link: "/dashboard/customer",
        },
        {
            id: 3,
            text: "Product",
            link: "/dashboard/product",
        },
        {
            id: 4,
            text: "Slider",
            link: "/dashboard/slider",
        },
        {
            id: 3,
            text: "Menu",
            link: "/dashboard/menu",
        },
        {
            id: 4,
            text: "Category",
            link: "/dashboard/category",
        },
        {
            id: 5,
            text: "Sub Category",
            link: "/dashboard/sub_category",
        },
        {
            id: 6,
            text: "Color",
            link: "/dashboard/color",
        },
        {
            id: 7,
            text: "Collection",
            link: "/dashboard/collection",
        },
        {
            id: 8,
            text: "Feature",
            link: "/dashboard/feature",
        },
        {
            id: 9,
            text: "Style",
            link: "/dashboard/style",
        },
        {
            id: 9,
            text: "Setting",
            link: "/dashboard/setting",
        },
        
    ];

    return (
        <ul>
            {menuItems?.map((item) => (
                <li key={item?.id} className='mt-2'>
                    <Link
                        to={item?.link}
                        className="flex items-center gap-[10px] rounded-lg text-base font-medium"
                    >
                        <span> {item?.text}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default SideNavbarMenuItem;