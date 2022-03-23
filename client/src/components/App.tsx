/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import "./App.css";
import { useState } from "react";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AddIcon from "@material-ui/icons/Add";
import Queries from "./Queries";
import {
  Box,
  Grid,
  Button,
  CardActionArea,
  CardActions,
  Typography,
  CardMedia,
  CardContent,
  Card,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Modal,
  IconButton,
  TextField,
 } from '@mui/material';
import JoinFull from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {format, parseISO} from 'date-fns';
import {DateRangePicker, LocalizationProvider, LoadingButton} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import {
  useQuery,
  gql,
  useMutation
} from "@apollo/client";
import { getUser, getUser_user, getUser_user_trips, getUser_user_trips_stays } from "./types/getUser";
import { createTripForUser } from "./types/createTripForUser";
import { createStayForTrip } from "./types/createStayForTrip";
import invariant from "invariant";
import { joinTrip } from "./types/joinTrip";
import { voteForStay } from "./types/voteForStay";

export default function App() {
  let userid = (new URL(window.location.href)).searchParams.get("fbid");
  let { data, loading, error } = useQuery<getUser>(Queries.GET_USER_WITH_TRIPS, {
    variables: {
      identifier: userid,
    }
  });

  switch(true) {
    case data?.user != null:
      invariant(data?.user != null, "stupid linter");
      return (<AppWithUser user={data.user}/>);

    case error != null:
      return <div>{error?.message}</div>;

    case loading:
    default:
      return (<div>Loading...</div>);
  }
}


function AppWithUser(props: {
  user: getUser_user,
}) {
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);
  const selectedTrip = props.user.trips?.filter(t => t.id === selectedTripId).pop();

  switch(true) {
    case selectedTrip != null:
      invariant(selectedTrip != null, "stupid linter");
      return (
        <div className="App">
          <IconButton
            aria-label="back"
            sx={{position: 'fixed', top: '8px', left: '8px'}}
            onClick={()=>{
              setSelectedTripId(null);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Stays
            tripid={selectedTrip.id}
            inviteCode={selectedTrip.inviteCode}
            stays={[...selectedTrip.stays]}
            onBack={() => setSelectedTripId(null)}
            location={selectedTrip.location}
          />
        </div>
      );

    default:
      return (
        <div className="App">
          <Trips
            userid={props.user.id}
            trips={props.user.trips ?? []}
            setSelectedTrip={(trip) => setSelectedTripId(trip.id)}
          />
        </div>
      );
  }
}


function CreateTrip(props: {userid: number, onComplete: () => void}) {
  const [createTripForUser] = useMutation<createTripForUser>(Queries.CREATE_TRIP_FOR_USER);

  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom sx={{textAlign: 'start'}}>Add new trip</Typography>
      <Grid container rowSpacing={2}
        direction="row"
        justifyContent="flex-end"
      >
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Location" value={location}
            onChange={e => setLocation(e.target.value)}
            sx={{width: '100%'}}
          />
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            startText="From"
            endText="To"
            value={dateValue}
            onChange={setDateValue}
            renderInput={(startProps, endProps) => (
              <Grid container spacing={2} sx={{paddingTop: 2}}>
                <Grid item xs={6}>
                  <TextField
                    {...startProps}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{width: '100%'}}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...endProps}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{width: '100%'}}
                  />
                </Grid>
              </Grid>
            )}
          />
        </LocalizationProvider>
        <Grid item>
          <LoadingButton loading={loading} variant="contained" onClick={() => {
            const [from, to] = dateValue;

            if (!from || !to || !location) return;

            setLoading(true);
            createTripForUser({
              variables: {
                userid: props.userid,
                options: {
                  location: location, from: from?.toISOString(), to: to?.toISOString(),
                }
              },
              refetchQueries: ["getUser"],
              onCompleted: props.onComplete,
            }).then(()=>{
              setLocation('');
              setDateValue([null, null]);
              setLoading(false);
            });
          }}>Create</LoadingButton>
        </Grid>
      </Grid>
    </>
  );
}


function Trips(props: {
  userid: number,
  trips: getUser_user_trips[],
  setSelectedTrip: (trip: getUser_user_trips) => void,
}) {
  const [joinTrip] = useMutation<joinTrip>(Queries.JOIN_EXISTING_TRIP);
  const [inviteCode, setInviteCode] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const handleCreateOpen = () => setOpenCreate(true);
  const handleCreateClose = () => setOpenCreate(false);

  const [openJoin, setOpenJoin] = useState(false);
  const handleJoinOpen = () => setOpenJoin(true);
  const handleJoinClose = () => setOpenJoin(false);

  const [loadingJoin, setLoadingJoin] = useState(false);

  return (
    <Box sx={{padding: '16px 16px 80px 16px', width: '100%', boxSizing: 'border-box'}}>
      <Typography variant="h5" component="div" gutterBottom>Trips</Typography>
      <Grid container rowSpacing={2}>
        {props.trips.map((item) => (
          <Grid item key={item.id} sx={{width: '100%'}}>
            <Card >
              <CardActionArea onClick={() => props.setSelectedTrip(item)} sx={{display: 'block !important'}}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.stays && item.stays.length ? `${item.stays[item.stays.length-1].imageUrl}&fit=crop&auto=format` : ''}
                  alt={item.location}
                />
                <CardContent sx={{textAlign: 'start'}}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.location}
                  </Typography>
                  {item.from && item.to && <Typography variant="body2">
                    {`${format(parseISO(item.from), 'do LLL, yyyy')} - ${format(parseISO(item.to), 'do LLL, yyyy')}`}
                  </Typography>}
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
            <SpeedDialAction
              icon={<AddIcon/>}
              tooltipTitle="Add"
              onClick={handleCreateOpen}
              tooltipOpen
            />
            <SpeedDialAction
              icon={<JoinFull/>}
              tooltipTitle="Join"
              onClick={handleJoinOpen}
              tooltipOpen
            />
        </SpeedDial>
      </Grid>
      <Modal
        open={openCreate}
        onClose={handleCreateClose}
        onBackdropClick={handleCreateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disablePortal
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
          boxSizing: 'border-box',
        }}>
          <CreateTrip userid={props.userid} onComplete={handleCreateClose}/>
        </Box>
      </Modal>
      <Modal
        open={openJoin}
        onClose={handleJoinClose}
        onBackdropClick={handleJoinClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disablePortal
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          boxSizing: 'border-box',
        }}>
          <Typography variant="h5" component="div" gutterBottom sx={{textAlign: 'start'}}>Join</Typography>
          <Grid container rowSpacing={2}
            direction="row"
            justifyContent="flex-end"
          >
            <Grid item xs={12}>
              <TextField value={inviteCode} onChange={(e) => {setInviteCode(e.target.value)}} variant="outlined" sx={{width: '100%'}}/>
            </Grid>
            <Grid item>
              <LoadingButton loading={loadingJoin} disabled={!inviteCode} variant="contained" onClick={() => {
                setLoadingJoin(true);
                joinTrip({
                  variables: {
                    userid: props.userid,
                    inviteCode: inviteCode,
                  }, refetchQueries: ["getUser"],
                }).then(()=>{
                  setInviteCode('');
                  setLoadingJoin(false);
                  handleJoinClose();
                });
              }}>Join</LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}


function Stays(props: {
  tripid: number,
  inviteCode: string,
  stays: getUser_user_trips_stays[],
  onBack: () => void,
  location: string,
}) {
  const [createStayForTrip] = useMutation<createStayForTrip>(Queries.CREATE_STAY_FOR_TRIP);
  const [voteForStay] = useMutation<voteForStay>(Queries.VOTE_FOR_STAY);
  const [newStayUrl, setNewStayUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [openAddStay, setOpenAddStay] = useState(false);
  const handleAddStayOpen = () => setOpenAddStay(true);
  const handleAddStayClose = () => setOpenAddStay(false);

  return (
    <Box sx={{padding: '16px 16px 80px 16px', width: '100%', boxSizing: 'border-box'}}>
      <Typography variant="h5" component="div" gutterBottom>Stays: {props.location}</Typography>
      <Typography variant="subtitle1">Invite Someone: {props.inviteCode}</Typography>
      <Grid container rowSpacing={2}>
        {props.stays?.sort((s1, s2) => s2.votes - s1.votes).map((item) => (
          <Grid item key={item.id} sx={{width: '100%'}}>
            <Card >
              <CardMedia
                component="img"
                height="200"
                image={item.imageUrl}
                alt={item.name}
              />
              <CardContent sx={{textAlign: 'start'}}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {item.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="body2">{`Votes: ${item.votes}`}</Typography>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => {
                      voteForStay({
                        variables: {
                          stayid: item.id
                        },
                        refetchQueries: ["getUser"]
                      })
                    }}>
                      <ThumbUpIcon />
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClick={handleAddStayOpen}
        />
      </Grid>

      <Modal
        open={openAddStay}
        onClose={handleAddStayClose}
        onBackdropClick={handleAddStayClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disablePortal
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          boxSizing: 'border-box',
        }}>
          <Typography variant="h5" component="div" gutterBottom sx={{textAlign: 'start'}}>Add Stay</Typography>
          <Grid container rowSpacing={2}
            direction="row"
            justifyContent="flex-end"
          >
            <Grid item xs={12}>
              <TextField label="AirBnB Url" value={newStayUrl} onChange={(e) => {setNewStayUrl(e.target.value)}} variant="outlined" sx={{width: '100%'}}/>
            </Grid>
            <Grid item>
              <LoadingButton
                loading={loading}
                disabled={!newStayUrl}
                variant="contained"
                onClick={() => {
                  setLoading(true);
                  createStayForTrip({
                    variables: {
                      tripid: props.tripid,
                      url: newStayUrl,
                    },
                    refetchQueries: ["getUser"],
                    onCompleted: () => setNewStayUrl("")
                  }).then(()=>{
                    handleAddStayClose();
                    setLoading(false);
                  });
                }}
              >
                Add
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  )
}
