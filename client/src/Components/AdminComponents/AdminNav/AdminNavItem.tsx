import s from "./AdminNav.module.css";
import {NavLink} from "react-router-dom";

type PropsType = {
    link: string;
    title: string
}

function AdminNavItem(props: PropsType) {
    const {link, title} = props

    return (
        <li className={s.nav_items__item}>
            <NavLink
                to={link}
                className={({isActive}) => (isActive ? s.active : '') + ` ${s.item_link}`}
            >
                {title}
            </NavLink>
        </li>)
}

export default AdminNavItem