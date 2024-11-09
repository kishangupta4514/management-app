import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const apiUrl = import.meta.env.VITE_API_URL;

interface IProjectData {
  $id: string;
  name: string;
  description: string;
  imgUrl: string;
  location: string;
}

interface IProjectFormData {
  name: string;
  description: string;
  location: string;
  image: (string | Blob)[];
}

export function ProjectManagement() {
  const { register, handleSubmit, reset } = useForm<IProjectFormData>();
  const [projects, setProjects] = useState<IProjectData[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}/projects`);
      setProjects(response.data.documents || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleAddProject = async (data: {
    name: string;
    description: string;
    location: string;
    image: (string | Blob)[];
  }) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("image", data.image[0]);

      const response = await axios.post(`${apiUrl}/projects`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProjects([...projects, response.data.project]);
      reset();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleProjectUpdate = async (
    data: IProjectFormData,
    projectId: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      } else {
        formData.append(
          "imgUrl",
          projects.find((project) => project.$id === projectId)?.imgUrl || ""
        );
      }

      const response = await axios.put(
        `${apiUrl}/projects/${projectId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProjects(
        projects.map((project) =>
          project.$id === response.data.$id ? response.data : project
        )
      );
      setEditingProjectId(null);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleEditClick = (projectId: string) => {
    setEditingProjectId(projectId);
    const project = projects.find((project) => project.$id === projectId);
    if (project) {
      reset({
        name: project.name,
        description: project.description,
      });
    }
  };

  const handleCancelClick = () => {
    setEditingProjectId(null);
    reset();
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/projects/${id}`);
      setProjects(projects.filter((project) => project.$id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="App">
      {/* Display all projects */}
      <h2 className="text-2xl font-bold mb-4">Project Management</h2>
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
                Location
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
                  {...register("location")}
                  placeholder="Location"
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
                  onClick={handleSubmit(handleAddProject)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add Project
                </button>
              </td>
            </tr>

            {projects.map((project) => (
              <tr key={project.$id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-800">
                  {editingProjectId === project.$id ? (
                    <input {...register("name")} className="border p-1" />
                  ) : (
                    project.name
                  )}
                </td>
                <td className="px-4 py-2 text-gray-800">
                  {editingProjectId === project.$id ? (
                    <input
                      {...register("description")}
                      className="border p-1"
                    />
                  ) : (
                    project.description
                  )}
                </td>
                <td className="px-4 py-2 text-gray-800">
                  {editingProjectId === project.$id ? (
                    <input {...register("location")} className="border p-1" />
                  ) : (
                    project.location
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingProjectId === project.$id ? (
                    <input
                      {...register("image")}
                      type="file"
                      accept="image/*"
                      className="border p-1"
                    />
                  ) : (
                    <img
                      src={project.imgUrl}
                      alt={project.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingProjectId === project.$id ? (
                    <>
                      <button
                        onClick={handleSubmit((data) =>
                          handleProjectUpdate(data, project.$id)
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
                        onClick={() => handleEditClick(project.$id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.$id)}
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
