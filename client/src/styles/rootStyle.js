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
    marginBottom: theme.spacing.unit * 10,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  appbarTitle: {
    textDecoration: 'none',
    flex: 1
  }
});

export default rootStyles;
