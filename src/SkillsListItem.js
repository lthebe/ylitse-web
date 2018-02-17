import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogActions,
} from 'material-ui/Dialog';

const styles = theme => ({
    card: {
        width: 140,
        margin: 7,
        minHeight: 100,
    },
    content: {
        fontSize: 18,
        display: 'flex',
        wordWrap: 'break-word',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        color: theme.palette.text.secondary,
    },
    icon: {
        margin: 0,
        color: 'blue',
    },
});

class SkillsListItem extends Component {
  static propTypes = {
      classes: PropTypes.shape({
          card: PropTypes.string,
          content: PropTypes.string,
          icon: PropTypes.string,
      }).isRequired,
      label: PropTypes.string.isRequired,
      deleteSkill: PropTypes.func.isRequired,
  }

  constructor(props) {
      super(props);

      this.state = {
          dialogOpen: false,
          displayIcon: false,
      };
  }

  onMouseEnter = () => {
      this.setState({ displayIcon: true });
  }

  onMouseLeave = () => this.setState({ displayIcon: false });

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
              <Card
                  className={classes.card}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
              >
                  <CardContent>
                      <Typography
                          variant="headline"
                          className={classes.content}
                      >
                          {label}
                      </Typography>
                  </CardContent>
                  {this.state.displayIcon &&
                  <CardActions>
                      <IconButton
                          onClick={this.openDialog}
                          className={classes.icon}
                      >
                          <DeleteIcon />
                      </IconButton>
                  </CardActions> }
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
