import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full min-h-screen overflow-hidden">
        {/* Left Side with Background Image */}
        <div
          className="w-1/2 text-white p-28 flex flex-col justify-center"
          style={{
            backgroundImage: "url('/assets/shopping-cart-with-wooden-elements.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-2xl font-bold">Simplify management with our dashboard.</h2>
          <p className="mt-2 text-sm opacity-80">
            Simplify your e-commerce management with our user-friendly admin dashboard.
          </p>
        </div>

        {/* Right Side (Form) */}
          <LoginForm/>
      </div>
    </div>
  );
}
