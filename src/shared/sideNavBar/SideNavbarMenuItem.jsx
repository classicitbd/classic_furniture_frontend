
import { Link } from 'react-router-dom';

const SideNavbarMenuItem = () => {
    const menuItems = [
        {
            id: 1,
            text: "Home",
            link: "/dashboard",
        },
        {
            id: 2,
            text: "Menu",
            link: "/dashboartd/menu",
        }
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