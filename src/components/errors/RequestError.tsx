interface RequestErrorProps {
  error: string | number | null;
}

const RequestError = ({ error }: RequestErrorProps) => {
  if (!error) return null;

  const message =
    error === 404
      ? "Nothing turned up in the kitchen."
      : typeof error === "number"
        ? `Something went wrong (${error}).`
        : String(error);

  return (
    <div
      role="alert"
      className="my-6 border border-amber/50 bg-night px-6 py-4 text-center"
    >
      <p className="type-cta text-amber">{message}</p>
      <p className="mt-1 type-meta text-foam/70 normal-case tracking-normal">
        Try another search or refresh the page.
      </p>
    </div>
  );
};

export default RequestError;
