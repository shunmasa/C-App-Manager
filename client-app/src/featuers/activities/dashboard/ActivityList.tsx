import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";

import ActivityListItem from "./ActivityListItem";

//group of activities //group acrivity by date and activities
const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate } = activityStore;
  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>

          <Item.Group divided>
            {activities.map(activity => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};
//loadding target ,activity.id ...name or submitting
export default observer(ActivityList);

// interface IProps {
//   deleteActivity: (
//     event: SyntheticEvent<HTMLButtonElement>,
//     id: string
//   ) => void;
//   submitting: boolean;
//   target: string;
// }
//type pf component React.FC(function)<IProps>
