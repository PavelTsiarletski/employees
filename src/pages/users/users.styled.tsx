import styled from 'styled-components';

export const Avatar = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
`;
export const UserList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const UserPaper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  width: 350px;
  box-shadow: 0px 0px 20px silver;
  margin: 20px;
  border-radius: 4px;
  background-color: white;
  padding: 20px;
`;

export const Circle = styled.div`
  height: 8px;
  width: 8px;
  border: 3px solid ${(props) => props.color};
  border-radius: 50%;
  margin-right: 5px;
`;

export const MenuItemText = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterPaper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const FilterContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin: 0 20px;
  width: 400px;
`;
