import React, { Component } from 'react';
import Ecosystem from './Ecosystem';
import SwipeableViews from 'react-swipeable-views';


class IndicatorsTab extends Component {

    state = {
        index: 0,
        ecosystem: null,  // selected ecosystem
        indicator: null  // selected indicator
    };

    handleChangeIndex = (index) => {
        this.setState({index});
    };

    handleSetIndicator = (ecosystem, indicator) => {
        this.setState({
            ecosystem: ecosystem,
            indicator: indicator
        });
    }

    getIcon(ecosystem) {
        return `/icons/${ecosystem}.svg`;
    }

    sortEcosystems(e1, e2) {
        // Sort in decreasing percent, then alphabetically

        const p1 = e1[1].percent, p2 = e2[1].percent;
        // Some of these are null: cross system ecosystems
        if (p1 === p2) {
            // sort alphabetically
            const name1 = e1[0], name2 = e2[0];
            return name1 < name2 ? -1 : 1;
        }
        if (p1 === null || p1 === undefined) {
            return 1;
        }
        if (p2 === null || p2 === undefined) {
            return -1;
        }
        if (p1 < p2) {
            return 1;
        }
        if (p1 > p2) {
            return -1
        }

        return 0;
    }

    renderNav(ecosystemIDs){
        if (ecosystemIDs.length < 2) return null;

        return (
            <div id="EcosystemsNav" className="flex-container flex-justify-center">
                {ecosystemIDs.map((ecosystem, index)=>

                    <img key={ecosystem}
                         src={this.getIcon(ecosystem)}
                         height={20}
                         alt=""
                         className={this.state.index === index ? 'active' : ''}
                         onClick={() => {this.handleChangeIndex(index)}}/>
                )}
            </div>
        );
    }

    renderEcosystems(ecosystemIDs){
        const {ecosystems} = this.props.data;
        return ecosystemIDs.map((ecosystem, index)=>
            <Ecosystem key={ecosystem}
                       index={index}
                       ecosystem={ecosystem}
                       icon={this.getIcon(ecosystem)}
                       {...ecosystems[ecosystem]}
                       onSetIndicator={this.handleSetIndicator}
            />
        );
    }


    render(){
        // if there is an ecosystem selected, only show that
        const {ecosystem, indicator} = this.state;
        if (ecosystem !== null) {
            return (
                <div id="Content">
                    <div id="Ecosystems" className="flex-container-column">
                        <Ecosystem key={ecosystem}
                                index={0}
                                ecosystem={ecosystem}
                                icon={this.getIcon(ecosystem)}
                                selectedIndicator={indicator}
                                onSetIndicator={this.handleSetIndicator} />
                    </div>
                </div>
            );
        }


        // sort ecosystems by decreasing area, so that cross-system indicators are always on the right
        let ecosystems = Object.entries(this.props.data.ecosystems);  // => [[ecosystemID, ecosystemData]...]
        ecosystems = ecosystems.filter((d) => d[1].indicators);  // only keep the ecosystems that have indicators
        ecosystems.sort(this.sortEcosystems);

        const ecosystemIDs = ecosystems.map((e) => e[0]);

        return (
            <div id="Content">
                <div id="Ecosystems" className="flex-container-column">
                    <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                       { this.renderEcosystems(ecosystemIDs) }
                    </SwipeableViews>

                    {this.renderNav(ecosystemIDs)}
                </div>
            </div>
        );
    }
}

export default IndicatorsTab;