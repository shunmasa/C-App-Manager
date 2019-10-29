import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../featuers/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite"; //observer is HOC
import { IActivity } from "../models/activity";
import NavBar from "../../featuers/nav/NavBar";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
//IActivity [] array set difinition//uniontype Iactivity | null (null) type null
const App = () => {
  const activityStore = useContext(ActivityStore);
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

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); //loading activities
  //so activityStore.loadActivities() is function and external func from other file , needs dependency in the []
  //function inside the effect and tell the about inside dependency
  //function or external property .. user effects depends on have to fill in the []

  //second user efect is one time loading to keep, 2 para is prevent one time run to keep execute
  //if not have a [] , it will keep loading infinite loop
  //useEffect , DidMount(one time run),DidUpdate(check to see any property is recieved if they have component update )
  //WillUnmount(clean up anything need to )

  //if wrap sigle elemnt div or fragment//path down loadingIntial and activities from ActivityStore
  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading Avtivities..." />;
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};
//all the method which was pathed will store in the one place with mobx
//{selected!} ! define either activity or null ... type definition of selectedActivity
//type error activities
export default observer(App);
//if external file will be use in the useEffect, it will be need to wrap observer in all the belonging components
//because of data path
//activityStore and App ...and ActivitiesDashboard,activityList,and form

//HOC observer wrap App , one component return new component

//mobX centulized data in the store
//FC function component
//define 1property 2state in the compoennet
