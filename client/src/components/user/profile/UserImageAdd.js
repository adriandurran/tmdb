import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Grid,
  Button,
  Header,
  Image,
  Form,
  Message,
  Progress
} from 'semantic-ui-react';

import { selectCurrentUser } from '../../../reducers/selectors/userSelectors';
import { selectProgress } from '../../../reducers/selectors/sharedSelectors';
import { addUserProfileImage } from '../../../actions/user';

const initalMessageState = { message: { visible: false } };

const UserImageAdd = () => {
  const user = useSelector(selectCurrentUser);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(user.imageUrl);
  const [messaging, setMessaging] = useState(initalMessageState);
  const progress = useSelector(selectProgress);
  const dispatch = useDispatch();

  const fileChangedHandler = (event) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFileUrl(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const resetMessageState = () => {
    setTimeout(() => {
      setMessaging({ message: { visible: false } });
    }, 3000);
  };

  const submitUserImage = () => {
    dispatch(addUserProfileImage(user._id, selectedFile)).then((res) => {
      let message = { ...messaging };
      if (res.status === 200) {
        message.header = 'Success!';
        message.content = `Your profile photo was successfully uploaded`;
        message.positive = true;
        setSelectedFileUrl(res.data.imageUrl);
      } else {
        message.header = 'Ooops!';
        message.content = `Something went wrong updating this Course. Error: ${res}`;
        message.negative = true;
      }
      setMessaging({ message });
      resetMessageState();
    });
  };

  return (
    <>
      <Header as="h3" textAlign="center">
        Add a profile image
      </Header>
      <Grid columns={2}>
        <Grid.Column>
          {selectedFileUrl && (
            <Image
              src={`${process.env.REACT_APP_DEV_IMAGE_URL}${selectedFileUrl}`}
              alt="No image selected"
              fluid
              centered
              rounded
            />
          )}
        </Grid.Column>
        <Grid.Column>
          <Form
            onSubmit={() => submitUserImage()}
            style={{ marginBottom: '1em' }}
          >
            <Form.Field>
              <Form.Input
                icon="star"
                iconPosition="left"
                label="User image...."
                placeholder="User image"
                name="AnalystImage"
                type="file"
                onChange={(event) => fileChangedHandler(event)}
              />
            </Form.Field>

            <Button type="submit">Submit</Button>
          </Form>
          <Progress percent={progress} autoSuccess />
          <Message
            header={messaging.header}
            content={messaging.content}
            visible={messaging.visible}
            positive={messaging.positive}
            negative={messaging.negative}
          />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default UserImageAdd;
