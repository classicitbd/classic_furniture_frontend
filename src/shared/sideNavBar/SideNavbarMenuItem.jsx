
import { Link } from 'react-router-dom';

const SideNavbarMenuItem = () => {
    const menuItems = [
        {
            id: 1,
            text: "Dashboard",
            link: "/admin",
        },
        {
            id: 2,
            text: "Order",
            link: "/admin/order",
        },
        {
            id: 3,
            text: "Customer",
            link: "/admin/customer",
        },
        {
            id: 4,
            text: "Product",
            link: "/admin/product",
        },
        {
            id: 5,
            text: "Create Product",
            link: "/admin/product/create",
        },
        {
            id: 5,
            text: "Slider",
            link: "/admin/slider",
        },
        {
            id: 6,
            text: "Banner",
            link: "/admin/banner",
        },
        {
            id: 7,
            text: "Menu",
            link: "/admin/menu",
        },
        {
            id: 15,
            text: "Category",
            link: "/admin/category",
        },
        {
            id: 8,
            text: "Sub Category",
            link: "/admin/sub_category",
        },
        {
            id: 9,
            text: "Color",
            link: "/admin/color",
        },
        {
            id: 10,
            text: "Collection",
            link: "/admin/collection",
        },
        {
            id: 11,
            text: "Feature",
            link: "/admin/feature",
        },
        {
            id: 12,
            text: "Style",
            link: "/admin/style",
        },
        {
            id: 13,
            text: "Setting",
            link: "/admin/setting",
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