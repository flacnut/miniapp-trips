/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import "./App.css";
import { Fab, TextField, Button, Typography, ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton } from "@material-ui/core"
import { useState } from "react";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AddIcon from "@material-ui/icons/Add";
import Queries from "./Queries";

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

const locationImages: {[key: string]: string} = {
  "New York": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-688899881-1519413300.jpg",
  "Montana": "https://www.wpi.edu/sites/default/files/Montana-Glacier-National-Park-Mountains-Cracker-Lake-1733309_0.jpg",
};


export default function App() {
  let { data, loading, error } = useQuery<getUser>(Queries.GET_USER_WITH_TRIPS, {
    variables: {
      identifier: "111111",
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
  let [showCreateTripView, setShowCreateTripView] = useState(false);
  let [selectedTripId, setSelectedTripId] = useState<number | null>(null);
  const selectedTrip = props.user.trips?.filter(t => t.id === selectedTripId).pop();

  switch(true) {
    case showCreateTripView:
      return (
        <div className="App">
          <CreateTrip
            userid={props.user.id}
            onComplete={() => setShowCreateTripView(false)}
          />
        </div>
      );

    case selectedTrip != null:
      invariant(selectedTrip != null, "stupid linter");
      return (
        <div className="App">
          <Stays
            tripid={selectedTrip.id}
            inviteCode={selectedTrip.inviteCode}
            stays={[...selectedTrip.stays]}
            onBack={() => setSelectedTripId(null)}
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
            createTrip={() => setShowCreateTripView(true)}
          />
        </div>
      );
  }
}


function CreateTrip(props: {userid: number, onComplete: () => void}) {
  const [createTripForUser] = useMutation<createTripForUser>(Queries.CREATE_TRIP_FOR_USER);

  let [fromDate, setFromDate] = useState("2022-01-01");
  let [toDate, setToDate] = useState("2022-01-04");
  let [location, setLocation] = useState("");

  return (
    <>
      <TextField
        variant="outlined"
        label="Location" value={location}
        onChange={e => setLocation(e.target.value)}
      />

      <TextField
        id="date"
        label="From"
        type="date"
        value={fromDate}
        onChange={e => setFromDate(e.target.value)}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        id="date"
        label="To"
        type="date"
        value={toDate}
        onChange={e => setToDate(e.target.value)}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button variant="contained" onClick={() => {
        createTripForUser({
          variables: {
            userid: props.userid,
            options: {
              location: location, from: fromDate, to: toDate,
            }
          },
          refetchQueries: ["getUser"],
          onCompleted: props.onComplete,
        });
      }}>Create</Button>
    </>
  );
}


function Trips(props: {
  userid: number,
  trips: getUser_user_trips[],
  setSelectedTrip: (trip: getUser_user_trips) => void,
  createTrip: () => void,
}) {
  const [joinTrip] = useMutation<joinTrip>(Queries.JOIN_EXISTING_TRIP);
  const [inviteCode, setInviteCode] = useState("");

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>Trips</Typography>
      <ImageList cols={1}>
        {props.trips.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={`${locationImages[item.location] ?? ""}?w=248&fit=crop&auto=format`}
              srcSet={`${locationImages[item.location] ?? ""}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.location}
              loading="lazy"
              onClick={() => props.setSelectedTrip(item)}
            />
            <ImageListItemBar
              title={item.location}
              subtitle={item.from + "  -  " + item.to}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Fab onClick={props.createTrip}><AddIcon /></Fab>
      <TextField value={inviteCode} onChange={(e) => {setInviteCode(e.target.value)}} variant="outlined" />
      <Button variant="contained" onClick={() => {
        joinTrip({
          variables: {
            userid: props.userid,
            inviteCode: inviteCode,
          }, refetchQueries: ["getUser"],
        })
      }}>Join</Button>
    </>
  );
}


function Stays(props: {
  tripid: number,
  inviteCode: string,
  stays: getUser_user_trips_stays[],
  onBack: () => void,
}) {
  const [createStayForTrip] = useMutation<createStayForTrip>(Queries.CREATE_STAY_FOR_TRIP);
  const [voteForStay] = useMutation<voteForStay>(Queries.VOTE_FOR_STAY);
  let [newStayUrl, setNewStayUrl] = useState("");

  // todo: back button
  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>Stays</Typography>
      <Typography variant="h6">Invite Someone: {props.inviteCode}</Typography>

      <ImageList cols={1}>
        {props.stays?.sort((s1, s2) => s2.votes - s1.votes).map((item) => (
          <ImageListItem key={item.id} >
            <img
              src={`${item.imageUrl}`}
              srcSet={`${item.imageUrl}`}
              alt={item.name}
              loading="lazy"
              onClick={() => {}}
            />
            <ImageListItemBar
              title={item.name}
              subtitle={`Votes: ${item.votes}`}
              actionIcon={
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
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      <TextField
        variant="outlined"
        label="AirBnB Url"
        value={newStayUrl}
        onChange={e => setNewStayUrl(e.target.value)}
      />
      <Button onClick={() => {
        createStayForTrip({variables: {
          tripid: props.tripid,
          url: newStayUrl,
        },
        refetchQueries: ["getUser"],
        onCompleted: () => setNewStayUrl("")});
      }}>Add Stay</Button>
      </>
  )
}
