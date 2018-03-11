const rootStyles = theme => ({
  root: {
    flexGrow: 1
  },

  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  card: {
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 10
    // color: theme.palette.primary.contrastText,
    // backgroundColor: theme.palette.primary.main
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  appbarTitle: {
    textDecoration: 'none',
    flex: 1
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formFields: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: 400
  }
});

export default rootStyles;
