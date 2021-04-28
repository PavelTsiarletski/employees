import { MenuItem, Select } from '@material-ui/core';
import { putRequest } from '../../../base/api-requests';
import { Avatar, Circle, MenuItemText, UserPaper } from '../users.styled';

const User = (props: any) => {
  const { index, u, setUsersList, statuses, usersList } = props;

  return (
    <UserPaper key={index + u.id + u.username}>
      <Avatar src={u.photo} alt="avatar" loading="lazy" />
      <div>
        <h4>{u.username}</h4>
        <Select
          defaultValue={u.status}
          onChange={(e) => {
            putRequest(`/users`, {
              status: e.target.value,
              userId: u.id,
            }).then(() => {
              let users = usersList;
              let user: any = users.find((user: any) => user.id === u.id);
              user.status = e.target.value;
              setUsersList(users);
            });
          }}
        >
          {statuses.map((status: any, index: number) => (
            <MenuItem
              value={status.value}
              key={status.name + status.color + index}
            >
              <MenuItemText style={{ display: 'flex' }}>
                <Circle color={status.color} />
                {status.name}
              </MenuItemText>
            </MenuItem>
          ))}
        </Select>
      </div>
    </UserPaper>
  );
};

export default User;
