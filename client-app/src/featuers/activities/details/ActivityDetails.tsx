import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

// interface IProps {
//   setEditMode: (editMode: boolean) => void;
//   setSelectedActivity: (activity: IActivity | null) => void;
// }
//activity! when got error, props may be null or undefined
// ! mean type as defined or null
const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    openEditForm,
    canselSelectedActivity
  } = activityStore;
  //selectedActivity(): type activity path activity (as null or undefined )in the selectedActivity() use activity
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(activity!.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={canselSelectedActivity}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
//onclick setSelected Activity (null) cancel button
//when click display form , setEditmode(true)
export default observer(ActivityDetails);
