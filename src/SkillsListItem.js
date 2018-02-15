import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogActions,
} from 'material-ui/Dialog';

const styles = theme => ({
    card: {
        minWidth: 140,
        margin: 20,
        minHeight: 250,
        position: 'relative',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    icon: {
        color: 'blue',
        position: 'absolute',
        bottom: 0,
    },
});

class SkillsListItem extends Component {
  static propTypes = {
      classes: PropTypes.shape({
          card: PropTypes.string,
          title: PropTypes.string,
          icon: PropTypes.string,
      }).isRequired,
      label: PropTypes.string.isRequired,
      deleteSkill: PropTypes.func.isRequired,
  }

  constructor(props) {
      super(props);

      this.state = {
          dialogOpen: false,
      };
  }

  openDialog = () => {
      this.setState({ dialogOpen: true });
  }

  closeDialog = () => {
      this.setState({ dialogOpen: false });
  }

  render() {
      const { classes, label, deleteSkill } = this.props;
      return (
          <div>
              <Card className={classes.card}>
                  <CardHeader title="Skills" />
                  <CardContent>
                      <Typography className={classes.title}>{label}</Typography>
                  </CardContent>
                  <CardActions>
                      <IconButton
                          onClick={this.openDialog}
                          className={classes.icon}
                      >
                          <DeleteIcon />
                      </IconButton>
                  </CardActions>
              </Card>
              <Dialog
                  open={this.state.dialogOpen}
              >
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogContent>
                      Do you want to delete <strong>{label}</strong> skill?
                  </DialogContent>
                  <DialogActions>
                      <Button
                          onClick={deleteSkill}
                      >
                          Delete
                      </Button>
                      <Button
                          onClick={this.closeDialog}
                      >
                          Cancel
                      </Button>
                  </DialogActions>
              </Dialog>

          </div>
      );
  }
}

export default withStyles(styles)(SkillsListItem);
