import { Link, type LinkProps } from '@tanstack/react-router';
import clsx from 'clsx';

type ButtonLinkProps = LinkProps & {
  className?: string;
};

function ButtonLink({ className, children, ...props }: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={clsx(
        'rounded-lg border items-center text-center py-2.5 px-4 transition-all duration-300 focus:outline-none focus:ring-2',
        className,
      )}
    >
      {children}
    </Link>
  );
}

export { ButtonLink };
