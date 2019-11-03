import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../featuers/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite"; //observer is HOC
import { ToastContainer } from "react-toastify";
import NavBar from "../../featuers/nav/NavBar";

import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import ActivityForm from "../../featuers/activities/form/ActivityForm";
import HomePage from "../../featuers/home/HomePage";
import ActivityDetails from "../../featuers/activities/details/ActivityDetails";
import NotFound from "./NotFound";
//IActivity [] array set difinition//uniontype Iactivity | null (null) type null
//location from RouteComponentProps

const App: React.FC<RouteComponentProps> = ({ location }) => {
  //loading activities
  //so activityStore.loadActivities() is function and external func from other file , needs dependency in the []
  //function inside the effect and tell the about inside dependency
  //function or external property .. user effects depends on have to fill in the []

  //second user efect is one time loading to keep, 2 para is prevent one time run to keep execute
  //if not have a [] , it will keep loading infinite loop
  //useEffect , DidMount(one time run),DidUpdate(check to see any property is recieved if they have component update )
  //WillUnmount(clean up anything need to )
  //if wrap sigle elemnt div or fragment//path down loadingIntial and activities from ActivityStore
  //switch  A <Switch> looks through its children <Route>s and
  // the first one that matches the current URL. */}
  return (
    <Fragment>
      <ToastContainer position="bottom-right" />
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/activities" component={ActivityDashboard} />
          <Route path="/activities/:id" component={ActivityDetails} />
          <Route
            key={location.key}
            path={["/createActivity", "/manage/:id"]}
            component={ActivityForm}
          />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default withRouter(observer(App));
//take App as parameter and return new component

//location.key whenever location.key is changed either createActivity or manage route
//2 parameter , when props change inside the root , define which props chnges in the route
//need location key
//withRouter HOC take app class in the router
//root structure
//represents landing page ... Navbar ...homepage,activityDashboard,details,form

//{['..','....']}//editactivity 2root parameter
//:id root parameter
//all the method which was pathed will store in the one place with mobx
//{selected!} ! define either activity or null ... type definition of selectedActivity
//type error activities

//if external file will be use in the useEffect, it will be need to wrap observer in all the belonging components
//because of data path
//activityStore and App ...and ActivitiesDashboard,activityList,and form

//HOC observer wrap App , one component return new component

//mobX centulized data in the store
//FC function component
//define 1property 2state in the compoennet

// const [activities, setActivities] = useState<IActivity[]>([]); //type array
// const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
//   null
// ); //null//path null cancel activity
// const [editMode, setEditMode] = useState(false);
// const [loading, setLoading] = useState(true);
// const [submitting, setSubmitting] = useState(false);
// const [target, setTarget] = useState("");
//target button
//set false switch view when true view display , false do not display
//existing activities and new activities
