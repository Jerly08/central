import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterCompanyPage() {
  const [companyName, setCompanyName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/auth/registerCompany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyName, username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      alert("Company and Admin registered successfully");
      setToken(data.token); // Set the token to state
      saveCompanyToken(data.token); // Save the token locally
    } else {
      alert("Registration failed");
    }
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const saveCompanyToken = (token: string) => {
    // Save the token locally (e.g., in localStorage or a config file)
    localStorage.setItem('companyToken', token);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Register Company and Admin</h1>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Admin Username"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin Password"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full mb-4">
          Register Company and Admin
        </button>
        <button
          type="button"
          onClick={handleBackToDashboard}
          className="bg-gray-500 text-white p-2 rounded w-full"
        >
          Back to Dashboard
        </button>
      </form>
      {token && (
        <div className="mt-4 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl">Your Company Token:</h2>
          <p className="text-lg break-all">{token}</p>
        </div>
      )}
    </div>
  );
}