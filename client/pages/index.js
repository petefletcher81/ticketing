import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log("im in the component", currentUser);

  return <h1>Woo haaaa</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server!
    // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk
    console.log("IM ON THE SERVER");
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser"
    );
    return data;
  } else {
    const { data } = await axios.get(
      "https://ticketing.dev/api/users/currentUser"
    );
    return data;
  }
  return {};
  // // this is executed on the server logs there
  // // rendering this server side means we cannot make any requests for data
  // // window only exists in the browser
  // const server = typeof window === "undefined";
  // // calling out the correct route / service within ingress-nginx
  // // 'http://SERVICENAME.NAMESPACE.svc.cluster.local.'
  // // 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local.'
  // const url = server
  //   ? "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser"
  //   : "https://ticketing.dev/api/users/currentUser";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     ...req.headers,
  //   },
  // };

  // const response = await fetch(url, options)
  //   .then(async (resp) => {
  //     const data = await resp.json();
  //     if (resp.ok) {
  //       return data;
  //     } else {
  //       return Promise.reject(errors);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("There has been an error", error);
  //   });
  // return { response };
};

export default LandingPage;
