import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'muted';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'primary', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-500 font-montserrat';

    const variantStyles = {
      primary: 'bg-primary text-white',
      success: 'bg-available text-white',
      warning: 'bg-reserved text-white',
      danger: 'bg-sold text-white',
      muted: 'bg-text-muted text-white',
    };

    return (
      <span ref={ref} className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
