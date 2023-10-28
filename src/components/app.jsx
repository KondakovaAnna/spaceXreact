import {LaunchList} from "./launchList";
import {Map} from "./map";
import {useEffect, useState} from "react";
import {SpaceX} from "../api/spacex";

function App(){

    const [launches, setLaunches] = useState([]);
    const spacex = new SpaceX();
    useEffect(()=>{
        spacex.launches().then(data =>{
            setLaunches(data)
        })
    },[]);
    
    let onOn = (id) => console.log("entering" +  id);
    let onOff = (id) => console.log("leaving" +  id);
    return(
        <main className='main'>
            <LaunchList launches = {launches} onHoverOn = {onOn} onHoverOff = {onOff} />
            <Map/>
        </main>
    )
}

export {App};
