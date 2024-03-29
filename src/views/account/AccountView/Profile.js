import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
  input: {
    display: 'none'
  }
}));

const Profile = ({
  className,
  profile,
  onChangeImage,
  imagePreview,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar
            className={classes.avatar}
            src={
              imagePreview ?? `data:image/jpeg;base64,${profile.profile_pic}`
            }
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {`${profile.first_name} ${profile.last_name}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${profile.phone_number}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment(profile.birth_date).format('MM/DD/YYYY')}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Box display="flex" flexGrow="1" justifyContent="center">
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={onChangeImage}
          />

          <label htmlFor="contained-button-file">
            <Button color="primary" variant="text" component="span">
              Upload picture
            </Button>
          </label>
        </Box>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
