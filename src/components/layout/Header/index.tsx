import LogoLink from './_components/LogoLink';
import Menu from './_components/Menu';

export default function Header() {
  return (
    <div className="flex bg-[#FFFFFF] px-[15px] py-[10px] box-border justify-between items-center shadow-lg fixed w-[100vw] z-10">
      <LogoLink />
      <div className="flex-1 px-[20px]">
        <Menu />
      </div>
      <div className="font-bold">유저 정보</div>
    </div>
  );
}
