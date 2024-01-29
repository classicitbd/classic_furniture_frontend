
import { Link } from 'react-router-dom';

const SideNavbarMenuItem = () => {
    const menuItems = [
        {
            id: 1,
            text: "Dashboard",
            link: "/istiak",
        },
        {
            id: 2,
            text: "Order",
            link: "/istiak/order",
        },
        {
            id: 3,
            text: "Customer",
            link: "/istiak/customer",
        },
        {
            id: 4,
            text: "Product",
            link: "/istiak/product",
        },
        {
            id: 5,
            text: "Create Product",
            link: "/istiak/product/create",
        },
        {
            id: 5,
            text: "Slider",
            link: "/istiak/slider",
        },
        {
            id: 6,
            text: "Menu",
            link: "/istiak/menu",
        },
        {
            id: 7,
            text: "Category",
            link: "/istiak/category",
        },
        {
            id: 8,
            text: "Sub Category",
            link: "/istiak/sub_category",
        },
        {
            id: 9,
            text: "Color",
            link: "/istiak/color",
        },
        {
            id: 10,
            text: "Collection",
            link: "/istiak/collection",
        },
        {
            id: 11,
            text: "Feature",
            link: "/istiak/feature",
        },
        {
            id: 12,
            text: "Style",
            link: "/istiak/style",
        },
        {
            id: 13,
            text: "Setting",
            link: "/istiak/setting",
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