interface EmptyComponentProps {
  placeholder: string;
  image?: string;
}

const EmptyComponent = ({ placeholder }: EmptyComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="font-display text-3xl md:text-5xl text-ink/30 uppercase">
        {placeholder}
      </p>
      <p className="font-body text-muted">Use the search above to begin.</p>
    </div>
  );
};

export default EmptyComponent;
