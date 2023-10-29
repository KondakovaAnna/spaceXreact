import {SpaceX} from "../api/spacex";
import {ListofLaunchpads} from "./launchpads";
import * as d3 from "d3";
import * as Geo from "../geo.json";
import {useRef, useEffect} from "react";

var svg;
function Map(props){
    const width = 1140;
    const height = 680;
    const margin = {
        top: 20,
        right: 10,
        bottom: 20,
        left: 100
    };
    const containerRef = useRef(null);
    useEffect(()=> {svg = d3.select(containerRef.current).append("svg");
        svg.selectAll("*").remove();
        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom )
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)

        const projection = d3.geoMercator()
            .scale(140)
            .center([0, 20])
            .translate([width/2 - margin.left, height/2 - margin.top]);
        const g = svg.append("g");

        g.selectAll("path")
            .data(Geo.features)
            .enter()
            .append("path")
            .attr("class", "topo")
            .attr("d", d3.geoPath().projection(projection))
            .style("opacity", .7)
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on('zoom', function(event) {
                g.selectAll('path')
                    .attr('transform', event.transform);
                g.selectAll('circle')
                    .attr('transform', event.transform);
            });
            
            const spaceX = new SpaceX();
            spaceX.launchpads().then(datapads=>{
                data = ListofLaunchpads(datapads);
                g.selectAll("circle")
                    .data(data).enter()
                    .append("circle")
                    .attr("cx", function (d) { return projection(d)[0]; })
                    .attr("cy", function (d) { return projection(d)[1]; })
                    .attr("real_cx", function(d) {return d[0]})
                    .attr("real_cy", function(d) {return d[1]})
                    .attr("r", "3px")
                    .attr("fill", "black")
                });

        svg.call(zoom); }, []);

    return(
        <div className="mapContainer map" ref={containerRef}>
        </div>
    )
}

function HoverOn(props){
    console.log(props);
    svg.selectAll("circle")
            .filter(function() {
                let latitude = d3.select(this).attr("real_cx");
                let longitude = d3.select(this).attr("real_cy");
                let equal = latitude == props[0] && longitude == props[1]; // filter by single attribute
                return equal
            })
            .attr("fill", "red")
            .attr("r", "5px");
}

function HoverOff(props){
    svg.selectAll("circle")
            .filter(function() {
                let latitude = d3.select(this).attr("real_cx");
                let longitude = d3.select(this).attr("real_cy");
                let equal = latitude == props[0] && longitude == props[1]; // filter by single attribute
                return equal
            })
            .attr("fill", "black")
            .attr("r", "3px");
}

export {Map, HoverOn, HoverOff}