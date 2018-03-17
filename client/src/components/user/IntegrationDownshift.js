import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Downshift from 'downshift';

function renderInput(props) {
  // console.log(props);
  const { InputProps, classes, ref, ...other } = props;

  return (
    <TextField
      {...other}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input
        },
        ...InputProps
      }}
    />
  );
}

function renderSuggestion(params) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = params;
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem === suggestion.label;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.value}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(suggestions, inputValue) {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue ||
        suggestion.label.toLowerCase().includes(inputValue.toLowerCase())) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

const styles = {
  container: {
    // flexGrow: 1,
    // height: 200,
    // width: 200,
  }
};

function IntegrationDownshift(props) {
  const { classes, suggestions, placeholder } = props;
  // console.log(props);

  return (
    <Downshift>
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex
      }) => (
        <div className={classes.container}>
          {renderInput({
            fullWidth: true,
            classes,
            InputProps: getInputProps({
              placeholder: placeholder,
              id: 'integration-downshift'
            })
          })}
          {isOpen ? (
            <Paper square>
              {getSuggestions(suggestions, inputValue).map(
                (suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem
                  })
              )}
            </Paper>
          ) : null}
        </div>
      )}
    </Downshift>
  );
}

IntegrationDownshift.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntegrationDownshift);
