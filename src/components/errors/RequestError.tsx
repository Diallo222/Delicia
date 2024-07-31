import React from "react";

interface RequestErrorProps {
  error: number | string | null;
}

const RequestError: React.FC<RequestErrorProps> = ({ error }) => {
  let message;

  if (typeof error === "number") {
    switch (error) {
      case 400:
        message = "Bad Request. Please check your input.";
        break;
      case 404:
        message = "Not Found. The requested resource could not be found.";
        break;
      case 500:
        message = "Internal Server Error. Something went wrong .";
        break;
      default:
        message = "An unexpected error occurred.";
    }
  } else {
    message = "Connection Error. Please check your network connection.";
  }

  return (
    <div className=" my-4 p-4 bg-red-200 text-red-800 rounded-md">
      <h2 className="text-lg font-semibold">Error</h2>
      <p>{message}</p>
    </div>
  );
};

export default RequestError;
