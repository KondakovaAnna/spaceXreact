function ListofLaunchpads(launchpads){
    launchpads_map = new Map();
    let arr = new Array();
    launchpads.forEach(launchpad=>{
        const latitude = launchpad.latitude;
        const longitude = launchpad.longitude;
        const launchpad_id = launchpad.id;
        let entry = [longitude, latitude];
        arr.push(entry);
        launchpads_map.set(launchpad_id, entry);
    });

    return arr;
}

export {ListofLaunchpads}