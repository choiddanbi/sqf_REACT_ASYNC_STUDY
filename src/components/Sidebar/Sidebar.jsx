import React from 'react';

/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { BASIC_MENU } from '../../constants/basicMenu';
import { Link } from 'react-router-dom';

function Sidebar(props) {
    return (
        <div>
            <div css={s.layout}>
                <ul css={s.list}>
                    {
                        BASIC_MENU.map(menu => 
                            <Link key={menu.id} to={menu.path}>
                                <li css={s.listItem}>{menu.icon}<span css={s.itemText}>{menu.name}</span></li>
                            </Link>
                         )
                    }
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;