import { HeaderPaper, LogoutButton, Title } from './header.style'

const Header = () => {
    return (
        <HeaderPaper>
            <Title>Employees</Title>
            <LogoutButton variant="outlined" size='medium' color='primary'>Log out</LogoutButton>
        </HeaderPaper>
    )
}

export default Header
