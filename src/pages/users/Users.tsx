import { useEffect, useMemo, useState } from 'react';
import { getRequest, postRequest, putRequest } from '../../base/api-requests';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

import {
  Avatar,
  Circle,
  FilterPaper,
  MenuItemText,
  UserPaper,
  UserList,
  FilterContainer,
} from './users.styled';

const Users = () => {
  // state
  const [usersList, setUsersList] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 140,
      maxWidth: 185,
      width: '100%',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    shouldUpdate &&
      getRequest('/users')
        .then((res) => {
          setShouldUpdate(false);
          setUsersList(res.users);
        })
        .catch(() => {
          setShouldUpdate(false);
          setUsersList([]);
        });
  }, [shouldUpdate, searchList]);

  const handleClose = () => {
    setOpen(false);
  };

  const statuses = useMemo(
    () => [
      {
        value: 'BusinessTrip',
        name: 'Business Trip',
        color: 'purple',
      },
      {
        value: 'LunchTime',
        name: 'Lunch Time',
        color: 'red',
      },
      {
        value: 'OnVacation',
        name: 'On Vacation',
        color: 'orange',
      },
      {
        value: 'Working',
        name: 'Working',
        color: 'lightgreen',
      },
    ],
    []
  );

  const searchUser = (search: string, filter: string) => {
    let filtered = [];
    filtered = usersList.filter(
      (user: any) =>
        user.username.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
        user.status.toLowerCase().indexOf(filter.toLowerCase()) > -1
    );
    setSearchList(filtered);
    console.log(filtered);
  };

  const data =
    searchList.length > 0 || search.length > 0 || filter.length > 0
      ? searchList
      : usersList;

  const User = (props: any) => {
    const { index, u } = props;
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
            {statuses.map((status, index) => (
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

  const Filter = () => {
    return (
      <FilterPaper>
        <Button
          variant="contained"
          size="large"
          style={{ color: 'white' }}
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Create +
        </Button>
        <FilterContainer>
          <TextField
            label="Type to search"
            type="search"
            onChange={(e: any) => {
              setSearch(e.target.value);
              searchUser(e.target.value, filter);
            }}
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Filter by status</InputLabel>
            <Select
              label="Filter by status"
              id="grouped-select"
              onChange={(e: any) => {
                setFilter(e.target.value);
                searchUser(search, e.target.value);
              }}
            >
              <MenuItem value="">None</MenuItem>
              {statuses.map((status, index) => (
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
          </FormControl>
        </FilterContainer>
      </FilterPaper>
    );
  };

  const UserDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create new employee</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="grouped-select">status</InputLabel>
              <Select
                onChange={(e: any) => {
                  setStatus(e.target.value);
                }}
              >
                {statuses.map((status, index) => (
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
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              let params = {
                username: username.length > 0 ? username : null,
                status: status.length > 0 ? status : null,
              };
              postRequest('/users/create', params).then(() => {
                handleClose();
                setShouldUpdate(true);
              });
            }}
            color="primary"
            style={{ color: 'white' }}
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <Filter />
      <UserList>
        {data
          ? data.map((u: any, index: number) => {
              return <User key={index + u.id + u.username} u={u} />;
            })
          : null}
      </UserList>
      <UserDialog />
    </>
  );
};

export default Users;
