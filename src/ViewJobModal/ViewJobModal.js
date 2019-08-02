import React, { Component } from 'react';
import './ViewJobModal.css';
import SleuthContext from '../SleuthContext';

export default class ViewJobModal extends Component {
    static contextType = SleuthContext;

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    handleClick = (e) => {
        if (!this.node.contains(e.target)) {
            this.props.closeModal('showJobModal');
        }
    }

    render() {
        const { showModal } = this.props;
        const showOrHideModal = showModal ? 'Modal display' : 'Modal hide';
        let clickedJob = sessionStorage.getItem('clickedJob');
        clickedJob = JSON.parse(clickedJob);

        return (
            <div className={showOrHideModal}>
                <section ref={node => this.node = node} className="ViewJobModal_section">
                    <section className="ViewJobModal_company">
                        <p>{clickedJob && clickedJob.company}</p>
                    </section>
                </section>
            </div>
        );
    }
}