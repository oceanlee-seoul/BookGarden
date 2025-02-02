import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useForm } from 'react-hook-form';

type SignInFormDataType = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormDataType>();

  const onSubmit = (data: SignInFormDataType) => {
    console.log('Sign In Data:', data);
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="w-[400px] p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          로그인
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input id="email" label="이메일" register={register('email')} />
          <Input
            id="password"
            label="비밀번호"
            register={register('password')}
          />
          <div className="flex w-full justify-end">
            <Button type="submit">로그인</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
