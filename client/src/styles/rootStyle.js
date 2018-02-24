const rootStyles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20
  },
  card: {
    marginTop: theme.spacing.unit * 10,
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  }
});

export default rootStyles;
