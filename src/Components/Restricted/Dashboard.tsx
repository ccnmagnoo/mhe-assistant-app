import React from 'react';
import { Link, Route, Switch, withRouter, useRouteMatch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Create from './Create';
import Incoming from './Incoming';

import { Edit as Edition } from './Edition';
import { auth } from '../../Config/firebase';
import { firebase } from '../../Config/firebase';
import Typography from '@material-ui/core/Typography';

//icons
import PostAddIcon from '@material-ui/icons/PostAdd';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import Outgoing from './Outgoing';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Oversuscription } from './Oversuscription';

const Dashboard = (props: any) => {
  //nested routing
  let { path, url } = useRouteMatch();

  //
  const [admin, setAdmin] = React.useState<firebase.User | null>(null);

  //protected routing
  React.useEffect(() => {
    if (auth.currentUser) {
      console.log('admin is logged?', true);
      setAdmin(auth.currentUser);
    } else {
      //kick out to login retrited place
      console.log('admin is logged?', false);
      props.history.push('/login');
    }
  }, [props.history]);

  const closeAdmin = () => {
    auth.signOut().then(() => {
      console.log('admin is loggin out', false);
      props.history.push('/login');
    });
  };

  return (
    <Grid
      container
      spacing={1}
      direction='row'
      justify='center'
      alignItems='center'
      alignContent='center'
    >
      <Grid item xs={12}>
        <ButtonGroup
          variant='outlined'
          color='primary'
          aria-label='dashboad commands'
          fullWidth
        >
          <Button component={Link} to={url}>
            <HomeIcon />
          </Button>
          <Button component={Link} to={`${url}/incoming`}>
            <DateRangeIcon />
          </Button>
          <Button component={Link} to={`${url}/outgoing`}>
            <EventAvailableIcon />
          </Button>
          <Button component={Link} to={`${url}/addperson`}>
            <PersonAddIcon />
          </Button>
          <Button component={Link} to={`${url}/create`}>
            <PostAddIcon />
          </Button>
          <Button onClick={closeAdmin}>
            <ExitToAppIcon />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <Switch>
          <Route exact path={path}>
            <Typography variant='body2' color='primary'>
              Bienvenido {admin?.email}
            </Typography>
          </Route>
          <Route path={`${path}/incoming`}>
            <Incoming />
          </Route>
          <Route path={`${path}/outgoing`}>
            <Outgoing />
          </Route>
          <Route path={`${path}/addperson`}>
            {/*create new unsuscribed person after period gap*/}
            <Oversuscription />
          </Route>
          <Route path={`${path}/create`}>
            {/*create new classroom*/}
            <Create />
          </Route>
          <Route path={`${path}/edition`}>
            <Edition />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
};

export default withRouter(Dashboard);
