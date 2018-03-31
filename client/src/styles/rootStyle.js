const rootStyles = theme => ({
  root: {
    flexGrow: 1
  },

  flex: {
    flex: 1
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  dashboardButton: {},
  paper: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  adminCard: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3
  },
  adminPaper: {
    marginTop: theme.spacing.unit * 10,
    padding: theme.spacing.unit * 2
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

  adderPaper: {
    marginTop: theme.spacing.unit * 1,
    padding: theme.spacing.unit * 2
    // display: 'flex'
  },
  formFields: {
    flex: 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: 400
  }
});

export default rootStyles;
