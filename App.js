
import './App.css';

import { useState } from "react";
import img from "./img/team-member-2.png"
import img2 from "./img/city-map-location-marker-high-angle-view-red-126304585.jpg"

import { BsFillFilterCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";

function App() {

  // state of rides
  var rides = [
    {
      distance : 0,
      id : "001",
      origin_station_code : 23,
      station_path : [23,42,45,48,56,60,77,81,93],
      destination_station_code : 93,
      date : 1644924365 ,
      map_url : "url",
      state : "Maharashtra",
      city : "Panvel"
    },
    {
      distance : 0,
      id : "002",
      origin_station_code : 20,
      station_path : [20,39,40,42,54,63,72,88,98],
      destination_station_code : 98,
      date : 1644924365 ,
      map_url : "url",
      state : "Maharashtra",
      city : "Panvel"
    },
    {
      distance : 0,
      id : "003",
      origin_station_code : 13,
      station_path : [13,25,41,48,59,64,75,81,91],
      destination_station_code : 91,
      date : 1613344500000 ,
      map_url : "url",
      state : "Maharashtra",
      city : "Panvel"
    }
  ];

  // state of user
  let user = {
    station_code : 40 ,
    name : "Dhruv Singh",
    profile_key : "url"
  }



  // this for calcuate the distance between user and near station 
  for (let index = 0; index < rides.length ; index++) {
    rides.forEach(element => {
      for (let index = 0; user.station_code + index < element.destination_station_code; index++) {
        if(element.station_path.find(des => des === user.station_code + index)){
        element.distance = index ;
        break;
        }
      }
      })
    };
  
  // sort by near station ( distance )
  rides.sort((a,b) => a.distance - b.distance);

  // this for sort and chamge station for the future   
  const [Rides, setRides] = useState(rides);

  // this for show dropdown menu
  const [show,setShow] = useState(false);
  
  // this for filters
  const [state,setState] = useState(false);

  const [city,setCity] = useState(false);


  // this for show and hide each section  
  const [nearRide,setNearRide] = useState(true);

  const [upcoming,setUpcoming] = useState(false);

  const [pastRide , setPastRide] = useState(false);

  // this for underline the main links nearride , upcoming , pastride
  const [foucesnear,setFoucesnear] = useState("unfouces");

  const [foucesup,setFoucesup] = useState("unfouces");

  const [foucespast,setFoucespast] = useState("unfouces");


  // this section for the upcoming and pastride state to change as date change
  const [upcomingRides, setupcomingRides] = useState(Rides.filter( Ride =>  Ride.date >= 0 ));

  const [pastRides, setPastRides] = useState(Rides.filter( Ride =>  Ride.date <= 0 ));

  return (
    <div className='mainContainer'>
      <header>
        <p className='title'><strong>Edvora</strong></p>
        <section className='information'>
        <p>{user.name}</p>
        <img src={img} alt="profile_image" style={{width:"60px",borderRadius:"30%",marginLeft:"20px"}}/>
        </section>
      </header>
      <div>
        <section className='list'>
          <p className={foucesnear} onClick={() => 
            {
              setNearRide(!nearRide);
              setUpcoming(false);
              setPastRide(false);
              setFoucesnear("fouces");
              setFoucesup("unfouces");
              setFoucespast("unfouces");
              }}>Nearest rides</p>
          <p className={foucesup} onClick={() => 
            {
              setUpcoming(!upcoming);
              setNearRide(false);
              setPastRide(false);
              setFoucesnear("unfouces");
              setFoucesup("fouces");
              setFoucespast("unfouces");
              }}>Upcoming ride ({upcomingRides.length})</p>
          <p className={foucespast} onClick={() => 
            {
              setPastRide(!pastRide);
              setNearRide(false);
              setUpcoming(false);
              setFoucesnear("unfouces");
              setFoucesup("unfouces");
              setFoucespast("fouces");
              }}>Past rides ({pastRides.length})</p>
          <div>
            <p onClick={() => {
              setShow(!show);
            }}><BsFillFilterCircleFill/> Filter</p>
          
          { show &&
          <div>
                  <p onClick={() => {
              setState(!state);
            }}>State <BsFillArrowDownCircleFill/></p>
                  { state && (
                  Rides.map((state) => {
                    return(
                  <p>{state.state}</p>
                  )})
                  )}
                  <p onClick={() => {
              setCity(!city);
            }}>City  <BsFillArrowDownCircleFill/></p>
                  { city && (
                  Rides.map((c) => {
                    return(
                  <div>
                  <p>{c.city }</p>
                  </div>
                  )})
                  )}
                </div>
        }
        </div>
        </section>
      </div>
      { nearRide &&
      <section className='locations'>
      {upcomingRides.map((Ride,index) => {
        return(
          <div>
            <img src={img2} alt="location"  style={{width:"150px", height:"fit-content"}}/>
        <li key={index}>
          <p>Ride Id : {Ride.id}</p>
          <p>Origin Station : {Ride.origin_station_code}</p>
          <p>station path : [ {Ride.station_path.toString()} ]</p>
          <p>Date : {Date(Ride.date)}</p>
          <p>Distance : {Ride.distance}</p>
        </li>
        <div id='citystate' key={Ride.id}>
            <p>{Ride.city}</p>
            <p>{Ride.state}</p>
        </div>
        </div>
      )
      })}
      </section>
}   
{ upcoming &&
      <section className='locations'>
      {upcomingRides.map((Ride,index) => {
        return(
          <div>
            <img src={img2} alt="location"  style={{width:"150px", height:"fit-content"}}/>
        <li key={Ride.id}>
          <p>Ride Id : {Ride.id}</p>
          <p>Origin Station : {Ride.origin_station_code}</p>
          <p>station path : [ {Ride.station_path.toString()} ]</p>
          <p>Date : {Date(Ride.date)}</p>
          <p>Distance : {Ride.distance}</p>
        </li>
        <div id='citystate' key={index}>
            <p>{Ride.city}</p>
            <p>{Ride.state}</p>
        </div>
        </div>
      )
      })}
      </section>
}   
{ pastRide &&
      <section className='locations'>
      {pastRides.map((Ride,index) => {
        return(
          <div>
            <img src={img2} alt="location"  style={{width:"150px", height:"fit-content"}}/>
        <li key={index}>
          <p>Ride Id : {Ride.id}</p>
          <p>Origin Station : {Ride.origin_station_code}</p>
          <p>station path : [ {Ride.station_path.toString()} ]</p>
          <p>Date : {Date(Ride.date)}</p>
          <p>Distance : {Ride.distance}</p>
        </li>
        <div id='citystate' key={Ride.id}>
            <p>{Ride.city}</p>
            <p>{Ride.state}</p>
        </div>
        </div>
      )
      })}
      </section>
}
    </div>

    
    
    );
}

export default App;
