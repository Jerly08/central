import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterCompanyAdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/auth/registerCompanyUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      alert("Admin CompanyUser registered successfully");
      router.push("/dashboard");
    } else {
      alert("Registration failed");
    }
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Register Admin CompanyUser</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full mb-4">
          Register Admin
        </button>
        <button
          type="button"
          onClick={handleBackToDashboard}
          className="bg-gray-500 text-white p-2 rounded w-full"
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
}