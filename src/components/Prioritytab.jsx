import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {BLUEPRINT} from './HomeTab';


const colors = [
    '#D3D3D3',
    '#686868',
    '#fbb4b9',
    '#c51b8a',
    '#49006a'
];


const PLANS = {
    'ACJV': {
        label: 'ACJV migratory bird priority areas',
        description: 'Atlantic Coast Joint Venture (ACJV)/ South Atlantic Migratory Bird Initiative (SAMBI) Priority Areas',
        url: 'http://acjv.org/planning/bird-conservation-regions/sambi/',
        type: 'regional'
    },
    'EPA': {
        label: 'EPA priority watersheds',
        description: 'Environmental Protection Agency (EPA) Region 4 Priority Watersheds (except Virginia)',
        url: 'http://www.epa.gov/region4/water/watersheds/priority.html',
        type: 'regional'
    },
    'PARCA': {
        label: 'Amphibian and reptile conservation',
        description: 'Partners in Amphibian & Reptile Conservation (PARC) Priority Areas',
        url: 'http://www.separc.org/',
        type: 'regional'
    },
    'NBCI': {
        label: 'Bobwhite conservation areas',
        description: 'National Bobwhite Conservation Initiative (NBCI) Plan',
        url: 'http://bringbackbobwhites.org/',
        type: 'regional'
    },
    'TNC': {
        label: "TNC's conservation priorities",
        description: "The Nature Conservancy's (TNC) Ecoregional Priorities for the Mid-Atlantic Coastal Plain, South Atlantic Coastal Plain, and Piedmont",
        url: 'http://www.landscope.org/focus/understand/tnc_portfolio/',
        type: 'regional'
    },
    'Alabama': {
        label: 'AL Strategic Habitat Units',
        description: 'Alabama Strategic Habitat Units',
        url: 'http://www.alh2o.org/shus/',
        type: 'state'
    },
    'Florida': {
        label: 'FL Critical Lands & Waters',
        description: 'Florida Critical Lands and Waters (CLIP)',
        url: 'http://www.fnai.org/clip.cfm',
        type: 'state'
    },
    'Georgia': {
        label: 'GA Priority Waters',
        description: 'Georgia Priority Waters',
        url: 'http://www.georgiawildlife.com/node/1377',
        type: 'state'
    },
    'NorthCarolina': {
        label: 'NC Green Growth Toolbox',
        description: 'Integrated priorities from the NC Green Growth Toolbox',
        url: 'http://www.ncwildlife.org/Conserving/Programs/GreenGrowthToolbox.aspx',
        type: 'state'
    },
    'Virginia': {
        label: 'VA Natural Landscapes Assessment',
        description: 'Virginia Natural Landscapes Assessment',
        url: 'http://www.dcr.virginia.gov/natural_heritage/vaconvisvnla.shtml',
        type: 'state'
    },
    'ImportantBirdAreas': {
        label: 'Important Bird Areas',
        description: 'Important Bird Areas',
        url: null,
        type: 'marine'
    },
    'NC_Capes': {
        label: 'NC Seashore Viewsheds',
        description: '5 mile buffer around NC Capes',
        url: null,
        type: 'marine'
    },
    'RightWhale': {
        label: 'Right Whale Habitat',
        description: 'Right Whale Critical Habitat',
        url: 'http://www.nmfs.noaa.gov/pr/species/mammals/cetaceans/rightwhale_northatlantic.htm',
        type: 'marine'
    },
    'SAFMC_HAPC_wDeepwater_Coral': {
        label: 'Habitat areas of particular concern',
        description: 'All habitat areas of particular concern (HAPC) from the South Atlantic Fisheries Management Council',
        url: 'http://safmc.net/',
        type: 'marine'
    },
    'SnapperHAPC': {
        label: 'Snapper habitat areas',
        description: 'Snapper habitat areas of particular concern (HAPC) from the South Atlantic Fisheries Management Council',
        url: 'http://safmc.net/',
        type: 'marine'
    },
    'ViewSheds': {
        label: 'Viewsheds',
        description: 'Buffer around National Seashores',
        url: null,
        type: 'marine'
    }
};




class Prioritytab extends Component {

    renderPriority(priority, percent) {
        const {label, background, color} = BLUEPRINT[priority];

        return (
            <div>
                <div className="priorityColorPatch"
                     style={{backgroundColor: background, color: color}}>
                    {percent}%
                </div>
                <div>
                    {label}
                </div>
            </div>
        )
    }

    renderPlan(plan) {
        const {label, url} = PLANS[plan];

        return (
            <li key={plan}>
                {(url !== null)
                    ?
                    <a href={url} target="_blank">{label}</a>
                    :
                    {label}
                }
            </li>
        );
    }


    render() {
        const {data} = this.props;
        let {blueprint, justification, plans} = data;


        const position = [
            0,
            data.blueprint[0]*2,
            data.blueprint[0]*2+data.blueprint[1]*2,
            data.blueprint[0]*2+data.blueprint[1]*2+data.blueprint[2]*2,
            data.blueprint[0]*2+data.blueprint[1]*2+data.blueprint[2]*2+data.blueprint[3]*2,
            data.blueprint[0]*2+data.blueprint[1]*2+data.blueprint[2]*2+data.blueprint[3]*2+data.blueprint[4]*2
        ];

        let sum = 100 - (data.blueprint[1] + data.blueprint[2] + data.blueprint[3] +data.blueprint[4]);

        const sortedPriorities = [4, 3, 2, 1, 0];
        blueprint.reverse(); // Flip order to match above

        const regionalPlans = data.plans.filter((p) => {return PLANS[p].type === 'regional'});
        const statePlans = data.plans.filter((p) => {return PLANS[p].type === 'state'});
        const marinePlans = data.plans.filter((p) => {return PLANS[p].type === 'marine'});

        return (
            <div id = "Content">
                <section>
                    <h3>Blueprint 2.1 Priority</h3>
                    <h4>for shared conservation action</h4>
                    <div id="PriorityValues">
                        { sortedPriorities.map((p, i) => this.renderPriority(p, blueprint[i])) }
                    </div>

                    {/*<div>*/}
                        {/*<svg width="100%" height="200">*/}
                            {/*{*/}
                                {/*data.blueprint.map((num, i)=>*/}
                                    {/*<rect key={i} x="0" y={position[i]} width="520" height={num*2} fill = {colors[i]}/>*/}
                                {/*)}*/}
                        {/*</svg>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                        {/*<div className="flex-container2">*/}
                            {/*<div className="flex-item2">*/}
                                {/*<svg width ="17" height="17">*/}
                                    {/*<rect width = "100%" height= "100%" fill = "#D3D3D3" stroke="gray" strokeWidth="2"/>*/}
                                {/*</svg>*/}
                            {/*</div>*/}
                            {/*<div className="flex-item2">Not a priority {sum}%</div>*/}
                        {/*</div>*/}
                        {/*<div className="flex-container2">*/}
                            {/*<div className="flex-item2">*/}
                                {/*<svg width ="17" height="17">*/}
                                    {/*<rect width = "100%" height= "100%" fill = {colors[1]} stroke="gray" strokeWidth="2"/>*/}
                                {/*</svg>*/}
                            {/*</div>*/}
                            {/*<div className="flex-item2">Corridors {data.blueprint[1]}%</div>*/}
                        {/*</div>*/}
                        {/*<div className="flex-container2">*/}
                            {/*<div className="flex-item2">*/}
                                {/*<svg width ="17" height="17">*/}
                                    {/*<rect width = "100%" height= "100%" fill = {colors[2]} stroke="gray" strokeWidth="2"/>*/}
                                {/*</svg>*/}
                            {/*</div>*/}
                            {/*<div className="flex-item2">Medium priority {data.blueprint[2]}%</div>*/}
                        {/*</div>*/}
                        {/*<div className="flex-container2">*/}
                            {/*<div className="flex-item2">*/}
                                {/*<svg width ="17" height="17">*/}
                                    {/*<rect width = "100%" height= "100%" fill = {colors[3]} stroke="gray" strokeWidth="2"/>*/}
                                {/*</svg>*/}
                            {/*</div>*/}
                            {/*<div className="flex-item2">High priority {data.blueprint[3]}%</div>*/}
                        {/*</div>*/}
                        {/*<div className="flex-container2">*/}
                            {/*<div className="flex-item2">*/}
                                {/*<svg width ="17" height="17">*/}
                                    {/*<rect width = "100%" height= "100%" fill = {colors[4]} stroke="gray" strokeWidth="2"/>*/}
                                {/*</svg>*/}
                            {/*</div>*/}
                            {/*<div className="flex-item2">Highest priority {data.blueprint[4]}%</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </section>

                {justification &&
                    <section>
                        <h3>Priority Justification</h3>
                        <h4>Blueprint 1.0 Workshop Feedback</h4>
                        <p className="text-small">{justification}</p>
                    </section>
                }

                {plans.length > 0 &&
                    <section>
                        <h3>Other Conservation Plans</h3>

                        {regionalPlans.length > 0 &&
                        <div>
                            <h4>Regional Conservation Plans</h4>
                            <ul>
                                { regionalPlans.map(this.renderPlan) }
                            </ul>
                        </div>
                        }

                        {statePlans.length >0 &&
                            <div>
                            <h4>Statewide Conservation Plans</h4>
                            { statePlans.map(this.renderPlan) }
                            </div>
                        }

                        {marinePlans.length >0 &&
                            <div>
                            <h3>Marine Conservation Plans</h3>
                            { marinePlans.map(this.renderPlan) }
                            </div>
                        }
                    </section>
                }
            </div>
        );
    }
}

Prioritytab.propTypes = {
    data: PropTypes.shape({
        blueprint: PropTypes.array,
        justification: PropTypes.string,
        name: PropTypes.string
    })
};

Prioritytab.defaultProps = {};

export default Prioritytab;



