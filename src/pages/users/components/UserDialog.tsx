import { useState } from 'react';
import { postRequest } from '../../../base/api-requests';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

import { Circle, MenuItemText } from '../users.styled';

const UserDialog = (props: any) => {
  const { open, handleClose, classes, statuses, setShouldUpdate } = props;

  // state
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');

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

export default UserDialog;
