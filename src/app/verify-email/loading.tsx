export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">正在验证邮箱...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
      </div>
    </div>
  );
}