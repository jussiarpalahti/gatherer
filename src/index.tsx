import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

class Gatherings {
    @observable choices = "";
}

@observer
class Gather extends React.Component<{gatherings: Gatherings}, {}> {

    change(e) {
        gatherings.choices = e.target.value;
    }

    render() {
        return (
            <div>
                <input value={this.props.gatherings.choices} placeholder="your data" onChange={this.change} />
                <div>Your data: {this.props.gatherings.choices}</div>
                <DevTools />
            </div>
        );
     }
}

const gatherings =  new Gatherings();
ReactDOM.render(<Gather gatherings={gatherings} />, document.getElementById('root'));
