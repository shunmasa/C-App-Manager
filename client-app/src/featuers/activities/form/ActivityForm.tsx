import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
//no more path props from parant component so dont need interface
// interface IProps {
//   activity: IActivity;
// }
//activityduplicate ..rename  activity:initialFormState

//root component props
interface DetailParams {
  id: string;
}
//RouteConponentProps has ...match,history,location
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity
  } = activityStore;

  //initializedForm in the useState()
  //new useStateonce have an activity set empty again
  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });
  //load activity
  //rerender component, reinitialized with key,make use of locationkey
  //activity is null , no more activity load
  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      ); //potential undefined if initialFormState have, setactivity(initialForm) run
    } //&& undefined set
    return () => {
      clearActivity();
    };
  }, [loadActivity, clearActivity, match.params.id, activity.id.length]); //dependency from outer file and func

  //use create,edit activity to submit save and update with id and exisitng data to path
  //if does not match id mean no id
  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }; //uuid() func
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      ); //redirect
    } else {
      editActivity(activity).then(() =>
        history.push(`/activites/${activity}.id}`)
      );
    }
  };
  //FormEvent as type<HTMLInputElement>changeEvent from React , text area is react form event
  //union type | when drag , HTMLTextAreaElement
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget; //event.target nut error event.currentTarget
    setActivity({ ...activity, [name]: value });
  };
  //form handle change , title is any[event.target.name] ...activity use all activity and update

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title"
              value={activity.title}
            />
            <Form.TextArea
              onChange={handleInputChange}
              name="description"
              rows={2}
              placeholder="Description"
              value={activity.description}
            />
            <Form.Input
              onChange={handleInputChange}
              name="category"
              placeholder="Category"
              value={activity.category}
            />
            <Form.Input
              onChange={handleInputChange}
              name="date"
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
            />
            <Form.Input
              onChange={handleInputChange}
              name="city"
              placeholder="City"
              value={activity.city}
            />
            <Form.Input
              onChange={handleInputChange}
              name="venue"
              placeholder="Venue"
              value={activity.venue}
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              onClick={() => history.push("/activities")}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
//data-time-local show time
//segment clearing margin
export default observer(ActivityForm);
