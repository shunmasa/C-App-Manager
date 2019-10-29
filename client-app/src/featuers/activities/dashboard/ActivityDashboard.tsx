import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityList from "../../activities/dashboard/ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../../activities/form/ActivityForm";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

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
const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore); //use ActivityStore by useContext
  const { editMode, selectedActivity } = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

//if selectedActivity has , show selectedActivity.id or 0
export default observer(ActivityDashboard);

//activiry | null ...selectedActivity !...selectedActivity is func path as null
//if not editmode and selectedActivity has not null , activityDetail will be seen
//if editmode is true , will open activityForm
