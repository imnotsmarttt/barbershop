import s from "./AdminNav.module.css";
import {NavLink} from "react-router-dom";

type PropsType = {
    link: string;
    title: string
}

function AdminNavItem(props: PropsType) {
    return <li className={s.item}>
        <NavLink to={props.link} className={
            ({isActive}) => (isActive ? s.active : '') + ` ${s.link}`
        }
        >{props.title}</NavLink>
    </li>
}

export default AdminNavItem