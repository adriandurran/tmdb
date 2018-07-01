import React, { Component } from 'react';
import { connect } from 'react-redux';

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

class UserImageAdd extends Component {
  state = {
    selectedFile: null,
    selectedFileUrl: null,
    message: {
      visible: false
    }
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({ selectedFileUrl: user.imageUrl });
  }

  fileChangedHandler = event => {
    let reader = new FileReader();
    reader.onload = e => {
      this.setState({ selectedFileUrl: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
    this.setState({ selectedFile: event.target.files[0] });
  };

  resetMessageState() {
    let message = {};
    message.visible = false;
    setTimeout(() => {
      this.setState({ message });
    }, 3000);
  }

  submitUserImage = event => {
    const { addUserProfileImage, user } = this.props;
    addUserProfileImage(user._id, this.state.selectedFile).then(res => {
      let message = { ...this.state.message };
      if (res.status === 200) {
        message.header = 'Success!';
        message.content = `Your profile photo was successfully uploaded`;
        message.positive = true;
        this.setState({ selectedFileUrl: res.data.imageUrl });
      } else {
        message.header = 'Ooops!';
        message.content = `Something went wrong updating this Course. Error: ${res}`;
        message.negative = true;
      }
      this.setState({ message });
      this.resetMessageState();
    });
  };

  render() {
    const { selectedFileUrl, message } = this.state;
    const { progress } = this.props;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Add a profile image
        </Header>
        <Grid columns={2}>
          <Grid.Column>
            {selectedFileUrl && (
              <Image
                src={selectedFileUrl}
                alt="No image selected"
                fluid
                centered
                rounded
              />
            )}
          </Grid.Column>
          <Grid.Column>
            <Form
              onSubmit={this.submitUserImage}
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
                  onChange={this.fileChangedHandler}
                />
              </Form.Field>

              <Button type="submit">Submit</Button>
            </Form>
            <Progress percent={progress} autoSuccess />
            <Message
              header={message.header}
              content={message.content}
              visible={message.visible}
              positive={message.positive}
              negative={message.negative}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state),
    progress: selectProgress(state)
  };
};

const mapDispatchToProps = {
  addUserProfileImage
};

UserImageAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserImageAdd);

export default UserImageAdd;
