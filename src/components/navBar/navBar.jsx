import { NavBarStyled } from './navBarStyled';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
    return (
        <NavBarStyled>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Forside</NavLink>
                    </li>
                    <li>
                        <NavLink to="boligPage">Boliger til salg</NavLink>
                    </li>
                    <li>
                        <NavLink to="loginPage">Login</NavLink>
                    </li>
                </ul>
            </nav>
        </NavBarStyled>
    );
};