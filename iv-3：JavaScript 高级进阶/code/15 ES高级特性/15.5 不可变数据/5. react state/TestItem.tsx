import React, { PureComponent } from 'react';

interface IProps {
    data: any;
}

class TestItem extends PureComponent<IProps> {

    render() {
        const { data } = this.props;
        return (
            <div>{data.test}</div>
        );
    }
}

export default TestItem;

