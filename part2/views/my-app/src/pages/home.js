import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

function Home(props) {
  const [data, setDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  //for borrow
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [date, setdate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [datas, setDatas] = useState("");

  useEffect(() => {}, []);

  const submit = () => {
    var bodyFormData = new FormData();

    bodyFormData.append("from ", from);
    bodyFormData.append("to", to);
    bodyFormData.append("time", time);
    bodyFormData.append("date", date);

    console.log("from", from);
    console.log("to", to);

    var data = qs.stringify({
      from: from,
      to: to,
      time: "time",
      date: date,
    });

    console.log("my data solution", bodyFormData);

    console.warn(data);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
   
    let url = "http://localhost:5000/routes/trainSolution";

    axios.post(url, data, config).then(
      (response) => {
        console.log(data);
        console.warn(response);
        console.log(response);
        setLoading(false);
        setSuccess(response.data);
        console.log("success", success);
      },
      (error) => {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    );
  };

  return (
    <React.Fragment>
    <div>
        <section class="">
          <div class="uk-container">

          <form class="uk-form-horizontal uk-margin-large" uk-grid>
            <div >
              <label class="uk-form-label" for="form-horizontal-text">insert Info</label>
              <div class="uk-width-1-4@s">
              <input  onChange={(e) => {
                          setFrom(e.target.value);
                        }}
                         class="uk-input" 
                         id="form-horizontal-text" 
                         type="text" 
                         placeholder="from">

                         </input>
           </div>
            <div class="uk-width-1-4@s">
            <input  onChange={(e) => {
                          setTo(e.target.value);
                        }}
                         class="uk-input" 
                         id="form-horizontal-text" 
                         type="text" 
                         placeholder="to">

                         </input>
            </div>
            <div class="uk-width-1-4@s">
            <input  onChange={(e) => {
                          setTime(e.target.value);
                        }}
                         class="uk-input" 
                         id="form-horizontal-text" 
                         type="text" 
                         placeholder="at time....">

                         </input>
            </div>
            <div class="uk-width-1-4@s">
            <input  onChange={(e) => {
                          setdate(e.target.value);
                        }}
                         class="uk-input" 
                         id="form-horizontal-text" 
                         type="text" 
                         placeholder="date">

                         </input>
            </div>
            <div class=" uk-align@s ">
                      <button
                        onClick={() => {
                          submit();

                        }}
                        class="uk-button uk-button-primary "
                      >
                        Find
                      </button>
                    </div>
              
            </div>

          </form>
           
          </div>
          
        </section>
      </div>
    </React.Fragment>
  );
}

export default Home;
