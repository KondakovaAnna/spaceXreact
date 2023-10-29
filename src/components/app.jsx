import {LaunchList} from "./launchList";
import {Map, HoverOn, HoverOff} from "./map";
import {useEffect, useState} from "react";
import {SpaceX} from "../api/spacex";
import * as d3 from "d3";

function App(){

    const [launches, setLaunches] = useState([]);
    const spacex = new SpaceX();
    useEffect(()=>{
        spacex.launches().then(data =>{
            setLaunches(data)
        })
    },[]);
    
    let onOn = (id) => {let launchpad = launchpads_map.get(id);
        HoverOn(launchpad);
        /*svg.selectAll("circle")
        .filter(function() {
            let latitude = d3.select(this).attr("real_cx");
            let longitude = d3.select(this).attr("real_cy");
            let equal = latitude == launchpad[0] && longitude == launchpad[1]; // filter by single attribute
            return equal

        })
        .attr("fill", "red")
        .attr("r", "8px");*/
    };
    let onOff = (id) => {let launchpad = launchpads_map.get(id);
        HoverOff(launchpad);
        /*svg.selectAll("circle")
            .filter(function() {
                let latitude = d3.select(this).attr("real_cx");
                let longitude = d3.select(this).attr("real_cy");
                let equal = latitude == launchpad[0] && longitude == launchpad[1]; // filter by single attribute
                return equal
            })
            .attr("fill", "black")
            .attr("r", "5px");*/
        };
    return(
        <main className='main'>
            <LaunchList launches = {launches} onHoverOn = {onOn} onHoverOff = {onOff} />
            <Map/>
        </main>
    )
}

export {App};
