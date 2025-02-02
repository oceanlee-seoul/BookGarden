import { MENU_LIST } from '@/constants/constants';

export default function Menu() {
  return (
    <nav>
      <ul className="flex">
        <li className="font-bold">{MENU_LIST.MY_LIBRARY.label}</li>
      </ul>
    </nav>
  );
}
