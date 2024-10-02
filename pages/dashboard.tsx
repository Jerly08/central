import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation"; // Impor komponen Navigation

interface Company {
  id: number;
  name: string;
  token: string;
}

interface CompanyUser {
  id: number;
  username: string;
  company_id: number;
}

interface ActivationKey {
  id: number;
  key: string;
  expiresAt: string;
  company_id: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyUsers, setCompanyUsers] = useState<CompanyUser[]>([]);
  const [activationKeys, setActivationKeys] = useState<ActivationKey[]>([]);
  const [newAdminUsername, setNewAdminUsername] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCompanies = await fetch("/api/companies");
        const dataCompanies: Company[] = await resCompanies.json();
        setCompanies(Array.isArray(dataCompanies) ? dataCompanies : []);

        const resCompanyUsers = await fetch("/api/companyUsers");
        const dataCompanyUsers: CompanyUser[] = await resCompanyUsers.json();
        setCompanyUsers(Array.isArray(dataCompanyUsers) ? dataCompanyUsers : []);

        const resActivationKeys = await fetch("/api/activationKeys");
        const dataActivationKeys: ActivationKey[] = await resActivationKeys.json();
        setActivationKeys(Array.isArray(dataActivationKeys) ? dataActivationKeys : []);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const handleRegisterCompanyNavigation = () => {
    router.push("/auth/registerCompany");
  };

  const handleCreateActivationKey = async (companyId: number) => {
    try {
      const res = await fetch("/api/activationKeys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyId, expiresInDays: 30 }),
      });
      const newKey: ActivationKey = await res.json();
      setActivationKeys([...activationKeys, newKey]);
    } catch (error) {
      console.error("Failed to create activation key", error);
    }
  };

  const handleDeleteActivationKey = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this activation key?");
    if (!confirmDelete) return;

    try {
      await fetch("/api/activationKeys", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setActivationKeys(activationKeys.filter((key) => key.id !== id));
    } catch (error) {
      console.error("Failed to delete activation key", error);
    }
  };

  const handleAddAdmin = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleSubmitAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCompany === null) return;

    try {
      const res = await fetch("/api/auth/registerCompanyUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId: selectedCompany.id,
          username: newAdminUsername,
          password: newAdminPassword,
        }),
      });

      if (res.ok) {
        alert("Admin user added successfully");
        setNewAdminUsername("");
        setNewAdminPassword("");
        setSelectedCompany(null);
        setIsModalOpen(false);
      } else {
        alert("Failed to add admin user");
      }
    } catch (error) {
      console.error("Failed to add admin user", error);
    }
  };

  const handleDeleteCompany = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (!confirmDelete) return;

    try {
      await fetch("/api/companies", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setCompanies(companies.filter((company) => company.id !== id));
    } catch (error) {
      console.error("Failed to delete company", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navigation /> {/* Tambahkan komponen Navigation */}
      <h2 className="text-xl mt-8 mb-1 text-center">Companies</h2>
      <div className="mb-3 ml-3">
        <button
          onClick={handleRegisterCompanyNavigation}
          className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600 transition duration-500 ease-in-out transform hover:scale-110"
        >
          Register Company and Admin
        </button>
      </div>
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Company ID</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Token</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(companies) && companies.map((company) => (
            <tr key={company.id} className="border-b">
              <td className="py-2 px-4 text-left">{company.id}</td>
              <td className="py-2 px-4 text-left">{company.name}</td>
              <td className="py-2 px-4 text-left">{company.token}</td>
              <td className="py-2 px-4 text-left">
                <button
                  onClick={() => handleCreateActivationKey(company.id)}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-500 ease-in-out transform hover:scale-110"
                >
                  Create Activation Key
                </button>
                <button
                  onClick={() => handleAddAdmin(company)}
                  className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-600 transition duration-500 ease-in-out transform hover:scale-110"
                >
                  Add Admin User
                </button>
                <button
                  onClick={() => handleDeleteCompany(company.id)}
                  className="bg-red-500 text-white p-2 rounded ml-2 hover:bg-red-600 transition duration-500 ease-in-out transform hover:scale-110"
                >
                  Delete Company
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedCompany && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4">Add Admin User for Company: {selectedCompany.name}</h2>
            <form onSubmit={handleSubmitAdmin}>
              <input
                type="text"
                value={newAdminUsername}
                onChange={(e) => setNewAdminUsername(e.target.value)}
                placeholder="Admin Username"
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="password"
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
                placeholder="Admin Password"
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              />
              <button type="submit" className="bg-green-500 text-white p-2 rounded w-full mb-4">
                Add Admin User
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white p-2 rounded w-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-xl mt-8 mb-4 text-center">Activation Keys</h2>
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">No</th>
            <th className="py-2 px-4 text-left">Key</th>
            <th className="py-2 px-4 text-left">Expires At</th>
            <th className="py-2 px-4 text-left">Company ID</th>
            <th className="py-2 px-4 text-left">Actions</th> {/* Tambahkan kolom Actions */}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(activationKeys) && activationKeys.map((key, index) => (
            <tr key={key.id} className="border-b transition duration-500 ease-in-out transform hover:bg-gray-100">
              <td className="py-2 px-4 text-left">{index + 1}</td>
              <td className="py-2 px-4 text-left">{key.key}</td>
              <td className="py-2 px-4 text-left">{new Date(key.expiresAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 text-left">{key.company_id}</td>
              <td className="py-2 px-4 text-left">
                <button
                  onClick={() => handleDeleteActivationKey(key.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-500 ease-in-out transform hover:scale-110"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}