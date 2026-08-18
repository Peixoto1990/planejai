interface InfoItemProps {
  title: string;
  value: string;
  variant?: 'normal' | 'reverse';
}

const variantClasses = {
  normal: {
    title: 'text-muted-foreground text-sm',
    value: 'font-semibold',
  },
  reverse: {
    title: 'font-semibold',
    value: 'text-muted-foreground text-sm',
  },
};

export function InfoItem({ title, value, variant = 'normal' }: InfoItemProps) {
  const styles = variantClasses[variant];
  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
}
