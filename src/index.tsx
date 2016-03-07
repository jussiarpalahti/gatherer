import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, autorun} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import 'isomorphic-fetch';
import {get_data} from './lib/piper';

class Gatherings {

    API_URL = "http://localhost:8000/apis";

    @observable choices = "";
    @observable apis = [];

    makeChange(val) {
        this.choices = val;
    }

    constructor() {
        get_data(this.API_URL, data => this.apis = data);
    }
}

const YourData = ({choices}) => <div>Your data: {choices}</div>;


const Apis = ({apis}) => <div>
    <ul>
        {apis.map(item => <li key={item.id}>{item.title}</li>)}
    </ul>
</div>;


@observer
class Gather extends React.Component<{gatherings: Gatherings}, {}> {

    change(e) {
        gatherings.makeChange(e.target.value);
    }

    render() {
        var {choices, apis} = gatherings;
        return (
            <div>
                <input value={choices} placeholder="your data" onChange={this.change} />
                <YourData choices={choices} />
                {apis? <Apis apis={apis} /> : null}
                <DevTools />
            </div>
        );
     }
}

const gatherings =  new Gatherings();
ReactDOM.render(<Gather gatherings={gatherings} />, document.getElementById('root'));
