import axios from "axios";
//const API_URL =
  /*window.location.hostname === "localhost"
    ? `${process.env.REACT_APP_BACKEND_URI}`
    : "https://travel-log-api.now.sh";*/

//const createHeaders = () => {
  //return {
    //headers: {
    //  Authorization: `Access-Control-Allow-Origin: *`,
   // },
  //};
//};

export async function listLogEntries() {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/api/logs`);
  console.log({ response });
  return response.data;
}

export async function createLogEntry(entry) {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  let json;
  if (response.headers.get("content-type").includes("text/html")) {
    const message = await response.text();
    json = {
      message,
    };
  } else {
    json = await response.json();
  }
  if (response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}
