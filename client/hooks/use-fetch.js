import { useState } from "react";

export default ({ url, body, method, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body,
  };

  const executeRequest = async () => {
    setErrors(null);
    const response = fetch(url, options)
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          if (onSuccess) {
            onSuccess(data);
          }
          return data;
        } else {
          setErrors(
            <div className="alert alert-danger">
              <h4>Oops...</h4>
              <ul>
                {data.errors.map((err, index) => {
                  return <li key={index}>{err.message}</li>;
                })}
              </ul>
            </div>
          );
          return Promise.reject(errors);
        }
      })
      .catch(() => {});
  };

  return { executeRequest, errors };
};
