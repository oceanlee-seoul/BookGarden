export default function Custom404() {
  return (
    <div className="border p-[40px] rounded-xl bg-white shadow-lg flex flex-col items-center max-w-md mx-auto">
      <p className="text-[80px] text-gray-600">😥</p>
      <h1 className="text-[120px] font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-500 mt-4">Page Not Found</p>
      <p className="text-sm text-gray-400 text-center mt-2 px-4">
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다. 페이지가 삭제되었거나,
        주소가 변경되었을 수 있습니다. 입력하신 URL이 정확한지 다시 한 번
        확인해주시기 바랍니다.
      </p>
    </div>
  );
}
