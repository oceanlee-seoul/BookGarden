import LinkWrapper from '@/components/common/LinkWrapper';
import Image from 'next/image';

export default function LogoLink() {
  return (
    <LinkWrapper path="/">
      <Image
        src="/images/logo.png"
        width={50}
        height={50}
        style={{ borderRadius: '10px' }}
        alt="책뜰 로고 이미지"
      />
    </LinkWrapper>
  );
}
