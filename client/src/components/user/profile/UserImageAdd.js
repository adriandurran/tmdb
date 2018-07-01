import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Button, Header, Image, Form } from 'semantic-ui-react';

import { selectCurrentUser } from '../../../reducers/selectors/userSelectors';
import { addUserProfileImage } from '../../../actions/user';

class UserImageAdd extends Component {
  state = {
    selectedFile: null,
    selectedFileUrl: null
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

  submitUserImage = event => {
    const { addUserProfileImage, user } = this.props;
    addUserProfileImage(user._id, this.state.selectedFile);
  };

  render() {
    const { selectedFileUrl } = this.state;
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
            <Form onSubmit={this.submitUserImage}>
              <Form.Field>
                <Form.Input
                  icon="star"
                  iconPosition="left"
                  label="Analyst image...."
                  placeholder="Analyst image"
                  name="AnalystImage"
                  type="file"
                  onChange={this.fileChangedHandler}
                />
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
            {/* put message in here or progress... */}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
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
