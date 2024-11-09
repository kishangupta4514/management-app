import express from "express";
import multer from "multer";
import {
  Client,
  Storage,
  Databases,
  ID,
  Permission,
  Role,
} from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
const port = process.env.PORT || 5000;

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const storageService = new Storage(client);
const databases = new Databases(client);

// Multer setup for in-memory file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Invalid file type, only image files are allowed"));
    }
    cb(null, true);
  },
});

// ----------- CLIENT ROUTES -----------
app.post("/clients", upload.single("image"), async (req, res) => {
  try {
    const { name, description, designation } = req.body;
    const file = req.file;

    if (!file) {
      console.log("no file", file);
      return res.status(400).json({ error: "No image file uploaded" });
    }

    if (!name || !description || !designation) {
      console.log("no name desc design", name, description, designation);
      return res.status(400).json({ error: "All fields are required" });
    }

    const fileUpload = await storageService.createFile(
      process.env.APPWRITE_STORAGE_BUCKET_ID,
      ID.unique(),
      InputFile.fromBuffer(file.buffer, file.originalname),
      [
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any()),
      ]
    );

    const imgUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_STORAGE_BUCKET_ID}/files/${fileUpload.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    const clientData = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      ID.unique(),
      {
        name: name,
        description: description,
        designation: designation,
        imgUrl: imgUrl,
      }
    );

    return res.status(201).json({
      message: "Client created successfully",
      imgUrl: imgUrl,
      client: clientData,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all clients
app.get("/clients", async (req, res) => {
  try {
    const clients = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID
    );
    res.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get client by ID
app.get("/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const clientData = await databases.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      id
    );
    res.json(clientData);
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/clients/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, designation } = req.body;
    let imgUrl = req.body.imgUrl;

    // If a new file is provided, upload it and replace the imgUrl
    if (req.file) {
      const fileUpload = await storageService.createFile(
        process.env.APPWRITE_STORAGE_BUCKET_ID,
        ID.unique(),
        InputFile.fromBuffer(req.file.buffer, req.file.originalname),
        [
          Permission.read(Role.any()),
          Permission.update(Role.any()),
          Permission.delete(Role.any()),
        ]
      );
      imgUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_STORAGE_BUCKET_ID}/files/${fileUpload.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
    }

    const updatedClient = await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      id,
      { name, description, designation, imgUrl }
    );

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a client
app.delete("/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await databases.deleteDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      id
    );
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ error: error.message });
  }
});

// ----------- PROJECT ROUTES -----------
// Create a new project
app.post("/projects", upload.single("image"), async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    if (!name || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const fileUpload = await storageService.createFile(
      process.env.APPWRITE_STORAGE_BUCKET_ID,
      ID.unique(),
      InputFile.fromBuffer(file.buffer, file.originalname),
      [
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any()),
      ]
    );

    const imgUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_STORAGE_BUCKET_ID}/files/${fileUpload.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    // Create project data in the database
    const projectData = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID, // Database ID
      process.env.APPWRITE_PROJECTS_COLLECTION_ID, // Project Collection ID
      ID.unique(),
      {
        name: name,
        description: description,
        imgUrl: imgUrl,
        location: location,
      }
    );

    return res.status(201).json({
      message: "Project created successfully",
      imgUrl: imgUrl,
      project: projectData,
      location: location,
    });
  } catch (error) {
    console.error("Error uploading project image:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_PROJECTS_COLLECTION_ID
    );
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get a project by ID
app.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const projectData = await databases.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_PROJECTS_COLLECTION_ID,
      id
    );
    res.json(projectData);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update a project by ID
app.put("/projects/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location } = req.body;
    let imgUrl = req.body.imgUrl;

    if (req.file) {
      const fileUpload = await storageService.createFile(
        process.env.APPWRITE_STORAGE_BUCKET_ID,
        ID.unique(),
        InputFile.fromBuffer(req.file.buffer, req.file.originalname),
        [
          Permission.read(Role.any()),
          Permission.update(Role.any()),
          Permission.delete(Role.any()),
        ]
      );
      imgUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_STORAGE_BUCKET_ID}/files/${fileUpload.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
    }

    const updatedProject = await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_PROJECTS_COLLECTION_ID,
      id,
      { name, description, imgUrl, location }
    );

    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a project by ID
app.delete("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await databases.deleteDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_PROJECTS_COLLECTION_ID,
      id
    );
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: error.message });
  }
});

// ----------- SUBSCRIPTION ROUTES -----------
app.post("/subscriptions", async (req, res) => {
  try {
    const { clientId, planName, startDate, endDate } = req.body;
    if (!clientId || !planName || !startDate || !endDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Example: Create subscription record
    const subscription = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_SUBSCRIPTIONS_COLLECTION_ID,
      ID.unique(),
      {
        clientId,
        planName,
        startDate,
        endDate,
      }
    );

    res
      .status(201)
      .json({ message: "Subscription created successfully", subscription });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: error.message });
  }
});

// ----------- CONTACT FORM ROUTES -----------

// Create a new contact form response
app.post("/contact-form", async (req, res) => {
  try {
    const { fullName, email, mobile, location } = req.body;

    if (!fullName || !email || !mobile || !location) {
      console.log({ fullName, email, mobile, location });
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create contact form response document in the database
    const contactFormResponse = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID, // Database ID
      process.env.APPWRITE_CONTACT_FORM_COLLECTION_ID, // Collection ID
      ID.unique(),
      {
        fullName: fullName,
        email: email,
        mobile: String(mobile),
        location: location,
      }
    );

    return res.status(201).json({
      message: "Contact form response created successfully",
      contactFormResponse,
    });
  } catch (error) {
    console.error("Error creating contact form response:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all contact form responses
app.get("/contact-form", async (req, res) => {
  try {
    const contactFormResponses = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_CONTACT_FORM_COLLECTION_ID
    );
    res.json(contactFormResponses);
  } catch (error) {
    console.error("Error fetching contact form responses:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get a contact form response by ID
app.get("/contact-form/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contactFormResponse = await databases.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_CONTACT_FORM_COLLECTION_ID,
      id
    );
    res.json(contactFormResponse);
  } catch (error) {
    console.error("Error fetching contact form response:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
