import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../featuers/activities/dashboard/ActivityDashboard";

import { IActivity } from "../models/activity";
import NavBar from "../../featuers/nav/NavBar";

//IActivity [] array set difinition//uniontype Iactivity | null (null) type null
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]); //type array
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  ); //null

  //path null cancel activity
  const [editMode, setEditMode] = useState(false);
  //set false switch view when true view display , false do not display

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  //existing activities and new activities
  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity); //diplay activity on the view page side bar
    setEditMode(false);
  };
  //update filter and find id if not , update
  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity); //diplay activity on the form
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);
  }; //set activities which dose not match id..except id--> second argument is []

  //exsisting activities.filter(id match), new activity to update
  //[] array

  //id[0] first id a= activities//setSelected use like function
  //useEffect(()=>{
  //componentDidMount().then(res=>setState())
  //})
  //path only array not object as difinition
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        let activities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity); //response.data...from backend then convert to string
        }); //for date date is date but string
        //first array split string//push activity in the array

        setActivities(activities); //used to be res.data
      });
  }, []); //second user efect is one time loading to keep, 2 para is prevent one time run to keep execute
  //if not have a [] , it will keep loading infinite loop
  //useEffect , DidMount(one time run),DidUpdate(check to see any property is recieved if they have component update )
  //WillUnmount(clean up anything need to )
  //if wrap sigle elemnt div or fragment

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};
//{selected!} ! define either activity or null ... type definition of selectedActivity
//type error activities
export default App;

//FC function component
//define 1property 2state in the compoennet

//set values //fetch data //fetch//CARS orgin problem
//cross origin resource share headers//axios return <Iactivity[]>
// componentDidMount() {
//   axios
//     .get<IActivity[]>("http://localhost:5000/api/activities")
//     .then(response => {
//       this.setState({
//         activities: response.data
//       });
//     });
// }
//get all activities then type difine so if i path activity.name get error
//interface IActivity has already set what will get
