import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            }

            this.requestInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.responseInterceptors = axios.interceptors.response.use(res => res, err => {
                this.setState({ error: err });
            });
        }

        // componentWillMount() {           // this is commented because in future the componentWillMount() will be deprecated and removed
        //                                  // so we have placed the below code in constructor which will work perfectly fine.
        //     axios.interceptors.request.use(req => {
        //         this.setState({ error: null });
        //         return req;
        //     });

        //     axios.interceptors.response.use(res => res, err => {
        //         this.setState({ error: err });
        //     });
        // }

        componentWillUnmount = () => {
            axios.interceptors.request.eject(this.requestInterceptors);
            axios.interceptors.response.eject(this.responseInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {/* Something went wrong !!! */}
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler;