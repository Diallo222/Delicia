interface EmptyComponentProps {
  placeholder: string;
  image?: string;
}

const EmptyComponent = ({ placeholder }: EmptyComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="type-display text-ink/30">
        {placeholder}
      </p>
      <p className="type-body text-muted">Use the search above to begin.</p>
    </div>
  );
};

export default EmptyComponent;
