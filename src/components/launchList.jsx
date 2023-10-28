function LaunchList(props) {
console.log(props);
    return (
        <aside className="aside" id="launchesContainer">
            <h3>Launches</h3>
            <div id="listContainer">


                <ul>
                    {props.launches.map(launch => {
                        return <li key={launch.id}
                        onMouseEnter={(event) => {
                            event.target.style.color = "red";
                            props.onHoverOn(launch.id);
                        }}
                        onMouseLeave={(event) => {
                            event.target.style.color = "black";
                            props.onHoverOff(launch.id);
                        }}>
                            {launch.name}
                        </li>
                    })}
                </ul>
            </div>
        </aside>
    )
}

export {LaunchList}