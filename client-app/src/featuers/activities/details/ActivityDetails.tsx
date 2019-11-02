import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";

import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

// interface IProps {
//   setEditMode: (editMode: boolean) => void;
//   setSelectedActivity: (activity: IActivity | null) => void;
// }
//activity! when got error, props may be null or undefined
// ! mean type as defined or null//RouteComponentProps from react rooter//definition check
//RouteComponentProps has...match, location,history
interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;
  //selectedActivity(): type activity path activity (as null or undefined )in the selectedActivity() use activity

  useEffect(() => {
    loadActivity(match.params.id); //to access id need to type id:string
  }, [loadActivity, match.params.id]); //need dependecy due to external func fetching

  if (loadingInitial || !activity)
    return <LoadingComponent content="loading activity..." />;
  //activity is setted as undefined so if undefined
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};
//history.push('root')---redirect
//onclick setSelected Activity (null) cancel button
//when click display form , setEditmode(true)
export default observer(ActivityDetails);
