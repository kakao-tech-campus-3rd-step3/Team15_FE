import HeaderAuth from './HeaderAuth';
import HeaderGuest from './HeaderGuest';

export default function Header() {
  // const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const isLoggedIn = true;
  return isLoggedIn ? <HeaderAuth /> : <HeaderGuest />;
}
