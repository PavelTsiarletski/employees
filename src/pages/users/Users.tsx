import { useEffect, useMemo, useState } from 'react';
import { getRequest } from '../../base/api-requests';
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

import {
  Circle,
  FilterPaper,
  MenuItemText,
  UserList,
  FilterContainer,
} from './users.styled';
import UserDialog from './components/UserDialog';
import User from './components/User';

const Users = () => {
  // state
  const [usersList, setUsersList] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [open, setOpen] = useState(false);
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

  return (
    <>
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
      <UserList>
        {data
          ? data.map((u: any, index: number) => {
              return (
                <User
                  key={index + u.id + u.username}
                  u={u}
                  usersList={usersList}
                  statuses={statuses}
                  index={index}
                  setUsersList={setUsersList}
                />
              );
            })
          : null}
      </UserList>
      <UserDialog
        open={open}
        setOpen={setOpen}
        statuses={statuses}
        classes={classes}
        setShouldUpdate={setShouldUpdate}
        handleClose={handleClose}
      />
    </>
  );
};

export default Users;
