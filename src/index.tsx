import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, autorun} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

class Gatherings {

    @observable choices = "";

    makeChange(val) {
        this.choices = val;
    }
}

const YourData = ({choices}) => <div>Your data: {choices}</div>;

@observer
class Gather extends React.Component<{gatherings: Gatherings}, {}> {

    change(e) {
        gatherings.makeChange(e.target.value);
    }

    render() {
        var {choices} = gatherings;
        return (
            <div>
                <input value={choices} placeholder="your data" onChange={this.change} />
                <YourData choices={choices} />
                <DevTools />
            </div>
        );
     }
}

const gatherings =  new Gatherings();
ReactDOM.render(<Gather gatherings={gatherings} />, document.getElementById('root'));
