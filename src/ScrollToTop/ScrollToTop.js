import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
    // when route changes, automatically scroll to top of page
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }
  
    render() {
        return this.props.children;
    }
}
  
export default withRouter(ScrollToTop);