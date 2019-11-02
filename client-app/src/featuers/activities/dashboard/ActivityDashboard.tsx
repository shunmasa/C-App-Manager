import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "../../activities/dashboard/ActivityList";

import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

//if selectedActivity has , show selectedActivity.id or 0
export default observer(ActivityDashboard);

//activiry | null ...selectedActivity !...selectedActivity is func path as null
//if not editmode and selectedActivity has not null , activityDetail will be seen
//if editmode is true , will open activityForm

// interface IProps {
//   deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
//   submitting: boolean;
//   target: string;
// }
//path null setSelected paticular case
//setActivity return void //define function id:string return void
//Grid.Column width 10 //Grid.column 6
//path props ..props.activities => destructure ({activities})
//previously this props below coming through the parant but
