import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const apiUrl = import.meta.env.VITE_API_URL;

interface IClientData {
  $id: string;
  name: string;
  description: string;
  designation: string;
  imgUrl: string;
}

interface IClientFormData {
  name: string;
  description: string;
  designation: string;
  image: (string | Blob)[];
}


export function ClientManagement() {
  const { register, handleSubmit, reset } = useForm<IClientFormData>();
  const [clients, setClients] = useState<IClientData[]>([]);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${apiUrl}/clients`);
      setClients(response.data.documents || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleAddClient = async (data: {
    name: string;
    description: string;
    designation: string;
    image: (string | Blob)[];
  }) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("designation", data.designation);
      formData.append("image", data.image[0]);

      const response = await axios.post(`${apiUrl}/clients`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setClients([...clients, response.data.client]);
      reset();
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  const handleClientUpdate = async (data: IClientFormData, clientId: string) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("designation", data.designation);

      // Only append the new image if it exists in the form data
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      } else {
        const existingClient = clients.find(
          (client) => client.$id === clientId
        );
        if (existingClient) {
          formData.append("imgUrl", existingClient.imgUrl);
        }
      }

      const response = await axios.put(
        `${apiUrl}/clients/${clientId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setClients(
        clients.map((client) =>
          client.$id === response.data.$id ? response.data : client
        )
      );
      setEditingClientId(null);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleEditClick = (clientId: string) => {
    setEditingClientId(clientId);
    const client = clients.find((client) => client.$id === clientId);
    if (client) {
      reset({
        name: client.name,
        description: client.description,
        designation: client.designation,
      });
    }
  };

  const handleCancelClick = () => {
    setEditingClientId(null);
    reset();
  };

  const handleDeleteClient = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/clients/${id}`);
      setClients(clients.filter((client) => client.$id !== id));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <div className="">
      {/* Display all clients */}
      <h2 className="text-2xl font-bold mb-4">Client Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Name
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Description
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Designation
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Image
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row for adding a new client */}
            <tr className="border-b">
              <td className="px-4 py-2">
                <input
                  {...register("name")}
                  placeholder="Name"
                  required
                  className="border p-1"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  {...register("description")}
                  placeholder="Description"
                  required
                  className="border p-1"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  {...register("designation")}
                  placeholder="Designation"
                  required
                  className="border p-1"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  {...register("image")}
                  type="file"
                  accept="image/*"
                  required
                  className="border p-1"
                />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={handleSubmit(handleAddClient)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add Client
                </button>
              </td>
            </tr>

            {/* Existing clients */}
            {clients.map((client) => (
              <tr key={client.$id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-800">
                  {editingClientId === client.$id ? (
                    <input {...register("name")} className="border p-1" />
                  ) : (
                    client.name
                  )}
                </td>
                <td className="px-4 py-2 text-gray-800">
                  {editingClientId === client.$id ? (
                    <input
                      {...register("description")}
                      className="border p-1"
                    />
                  ) : (
                    client.description
                  )}
                </td>
                <td className="px-4 py-2 text-gray-800">
                  {editingClientId === client.$id ? (
                    <input
                      {...register("designation")}
                      className="border p-1"
                    />
                  ) : (
                    client.designation
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingClientId === client.$id ? (
                    <input
                      {...register("image")}
                      type="file"
                      accept="image/*"
                      className="border p-1"
                    />
                  ) : (
                    <img
                      src={client.imgUrl}
                      alt={client.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingClientId === client.$id ? (
                    <>
                      <button
                        onClick={handleSubmit((data) =>
                          handleClientUpdate(data, client.$id)
                        )}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(client.$id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.$id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
