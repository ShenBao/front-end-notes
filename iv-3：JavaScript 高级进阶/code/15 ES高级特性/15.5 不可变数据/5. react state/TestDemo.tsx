import React, { PureComponent } from 'react';
import TestItem from './TestItem';

interface IState {
    listData: any[];
}

class TestDemo extends PureComponent<{}, IState> {
    constructor(props) {
        super(props);
        this.state = {
            listData: [
                { data: 1, id: 1, info: { test: 1 } },
                { data: 2, id: 1, info: { test: 2 } },
            ],
        };
    }

    changeList = () => {
        const { listData } = this.state;
        const newListData = [...listData];
        console.log(newListData);
        newListData[0].info.test = 7;
        this.setState({
            listData: newListData,
        });
    };

    render() {
        const { listData } = this.state;
        console.log('listData：', listData);
        return (
            <div className="page1">
                <button type="button" onClick={this.changeList}>
                    改变数据
                </button>
                {listData.map((item, key) => (
                    <TestItem key={item.data} data={item.info}></TestItem>
                ))}
            </div>
        );
    }
}

export default TestDemo;