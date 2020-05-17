import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

export default withStyles({
  root: {
    color: '#aaf',
    '&$checked': {
      color: '#aaf',
    },
  },
  checked: {}
})(Checkbox);