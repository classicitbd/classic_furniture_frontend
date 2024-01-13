
import { Link } from 'react-router-dom';

const SideNavbarMenuItem = () => {
    const menuItems = [
        // {
        //     id: 1,
        //     text: "Home",
        //     link: "/dashboard",
        // },
        {
            id: 1,
            text: "Slider",
            link: "/dashboartd/slider",
        },
        {
            id: 2,
            text: "Menu",
            link: "/dashboartd/menu",
        },
        {
            id: 3,
            text: "Category",
            link: "/dashboartd/category",
        },
        {
            id: 4,
            text: "Sub Category",
            link: "/dashboartd/sub_category",
        },
        {
            id: 5,
            text: "Color",
            link: "/dashboartd/color",
        },
        {
            id: 6,
            text: "Collection",
            link: "/dashboartd/collection",
        },
        {
            id: 7,
            text: "Feature",
            link: "/dashboartd/feature",
        },
        {
            id: 8,
            text: "Style",
            link: "/dashboartd/style",
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