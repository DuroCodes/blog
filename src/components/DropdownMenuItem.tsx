import { Menu } from '@headlessui/react';
import React, { type ReactNode } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  href: string;
  children: ReactNode;
};

export default function DropdownMenuItem({ href, children }: Props) {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={href}
          className={classNames(
            active ? 'bg-indigo-200 dark:bg-slate-700' : '',
            'block px-4 py-2 text-sm',
          )}
        >
          {children}
        </a>
      )}
    </Menu.Item>
  );
}
