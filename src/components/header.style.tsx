import { Button } from "@material-ui/core";
import styled from "styled-components";

export const HeaderPaper = styled.header`
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    align-items: center;
`

export const Title = styled.h1`
    color: #109CF1;
`

export const LogoutButton = styled(Button)`
    max-height: 48px;
`