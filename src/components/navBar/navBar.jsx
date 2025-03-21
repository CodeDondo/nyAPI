import { NavBarStyled } from './navBarStyled';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <NavBarStyled>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Forside</NavLink>
                    </li>
                    <li>
                        <NavLink to="boligerTilSalg">Boliger til salg</NavLink>
                    </li>
                    <li>
                        <NavLink to="login">Login</NavLink>
                    </li>
                </ul>
            </nav>
        </NavBarStyled>
    );
};