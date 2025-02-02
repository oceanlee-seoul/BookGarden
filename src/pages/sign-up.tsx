import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useForm } from 'react-hook-form';

type SignUpFormDataType = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormDataType>();

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="w-[400px] p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          회원가입
        </h1>
        <form className="space-y-4">
          <Input id="email" label="이메일" register={register('email')} />
          <Input id="nickname" label="닉네임" register={register('password')} />
          <Input
            id="password"
            label="비밀번호"
            register={register('password')}
          />
          <Input
            id="passwordConfirm"
            label="비밀번호 확인"
            register={register('passwordConfirm')}
          />
          <div className="flex w-full justify-end">
            <Button>회원가입</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
