
import { Link } from 'react-router-dom';

const SideNavbarMenuItem = () => {
    const menuItems = [
        {
            id: 1,
            text: "Dashboard",
            link: "/dashboard",
        },
        {
            id: 2,
            text: "Order",
            link: "/dashboard/order",
        },
        {
            id: 3,
            text: "Customer",
            link: "/dashboard/customer",
        },
        {
            id: 4,
            text: "Product",
            link: "/dashboard/product",
        },
        {
            id: 5,
            text: "Create Product",
            link: "/dashboard/product/create",
        },
        {
            id: 5,
            text: "Slider",
            link: "/dashboard/slider",
        },
        {
            id: 6,
            text: "Menu",
            link: "/dashboard/menu",
        },
        {
            id: 7,
            text: "Category",
            link: "/dashboard/category",
        },
        {
            id: 8,
            text: "Sub Category",
            link: "/dashboard/sub_category",
        },
        {
            id: 9,
            text: "Color",
            link: "/dashboard/color",
        },
        {
            id: 10,
            text: "Collection",
            link: "/dashboard/collection",
        },
        {
            id: 11,
            text: "Feature",
            link: "/dashboard/feature",
        },
        {
            id: 12,
            text: "Style",
            link: "/dashboard/style",
        },
        {
            id: 13,
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