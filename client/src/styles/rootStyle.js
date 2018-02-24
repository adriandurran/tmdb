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
    marginTop: theme.spacing.unit * 15,
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  }
});

export default rootStyles;
