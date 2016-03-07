import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, autorun} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import 'isomorphic-fetch';
import {get_data} from './lib/piper';

const API_BASE = "http://localhost:8000";
const API_LIST_URL = API_BASE + "/apis";

class ApiView {

    api = null;
    @observable items = [];

    constructor(api) {
        this.api = api;
        get_data(API_BASE + this.api.url, data => this.items = data);
    }

}


class Gatherings {

    @observable choices = "";
    @observable apis = [];
    @observable chosen = [];

    makeChange(val) {
        this.choices = val;
    }

    choose(choice) {
        console.log("choicing", choice);
        this.chosen.push(new ApiView(choice));
    }

    constructor() {
        get_data(API_LIST_URL, data => this.apis = data);
    }
}


const YourData = ({choices}) => <div>Your data: {choices}</div>;


const Apis = ({apis, choose}) => <div>
    <ul>
        {apis.map(item => <li key={item.id} onClick={() => choose(item)}>{item.title}</li>)}
    </ul>
</div>;


const Items = ({api}) => <div key={"item_" + api.api.id}>
    <span>{api.api.id}</span>
</div>;


@observer
class Gather extends React.Component<{gatherings: Gatherings}, {}> {

    change(e) {
        gatherings.makeChange(e.target.value);
    }

    makeChoice(choice) {
        gatherings.choose(choice);
    }

    render() {
        var {choices, apis, choose, chosen} = gatherings;
        return (
            <div>
                <input value={choices} placeholder="your data" onChange={this.change} />
                <YourData choices={choices} />
                {apis? <Apis apis={apis} choose={this.makeChoice} /> : null}
                {chosen.map((api,i) => <div key={"items_" + i}><Items api={api} /></div>)}
                <DevTools />
            </div>
        );
     }
}

const gatherings =  new Gatherings();
ReactDOM.render(<Gather gatherings={gatherings} />, document.getElementById('root'));
