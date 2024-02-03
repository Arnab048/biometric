const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb Connect
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://biometricdb:EZhDP3tNyBxx3SgP@cluster0.6nxonq0.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // DB Collection
    const usersCollection = client.db("biometric").collection("user");
    const usersLogsCollection = client.db("biometric").collection("userLogs");

    // Get data
    app.get("/user", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // Search data by date
    app.post("/userLogs", async (req, res) => {
      try {
        const date = req.body.date;
        console.log(date);
        // Query the collection for logs on the specified date
        const logsQuery = { checkindate: date };
        const result = await usersLogsCollection.find(logsQuery).toArray();

        res.status(200).json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // patch data
    app.patch("/addFingerPrint/:id", async (req, res) => {
      const userID = req.params.id;

      try {
        const updateUser = await usersCollection.findOneAndUpdate(
          { fingerprint_id: parseInt(userID) },
          { $set: { fingerprint_select: 1 } },
          { returnDocument: "after" } // Return the updated document
        );

        if (updateUser.value) {
          res
            .status(200)
            .json({ message: `Fingerprint updated for user ${userID}` });
        } else {
          res.status(404).json({ message: `User with ID ${userID} not found` });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // Update User 
    app.patch("/updateUser/:id", async (req, res) => {
      const fingerID = parseInt(req.params.id);
      try {
        const existingUser = await usersCollection.findOne({
          fingerprint_id: fingerID,
        });

        if (existingUser) {
          const { username, email, gender } = req.body;

          // Update only the provided fields, leave others unchanged
          const updatedFields = {
            username: username || existingUser.username,
            email: email || existingUser.email,
            gender: gender || existingUser.gender,
          };

          // Update the user details
          const updateUser = await usersCollection.findOneAndUpdate(
            { fingerprint_id: fingerID },
            { $set: updatedFields },
            { returnDocument: "after" } // Return the updated document
          );

          res.status(200).json({
            message: "User details updated successfully",
            user: updateUser.value,
          });
        } else {
          res
            .status(404)
            .json({ message: `User with ID ${fingerID} not found` });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // Add user
    app.post("/addUser", async (req, res) => {
      const fingerID = req.body.fingerprint_id;
      // console.log(fingerID);
      try {
        const existingUser = await usersCollection.findOne({
          fingerprint_id: fingerID,
        });

        if (existingUser) {
          // Existing fingerprint logic for login or logout
          const Uname = existingUser.username;
          const Number = existingUser.serialnumber;

          const logsQuery = {
            fingerprint_id: fingerID,
            checkindate: new Date().toISOString().split("T")[0],
            timeout: "",
          };
          // console.log("logs", logsQuery);
          const existingLog = await usersLogsCollection.findOne(logsQuery);

          if (!existingLog) {
            // Login logic
            const loginQuery = {
              username: Uname,
              serialnumber: Number,
              fingerprint_id: fingerID,
              checkindate: new Date().toISOString().split("T")[0],
              timein: new Date().toLocaleTimeString(),
              timeout: "",
            };

            await usersLogsCollection.insertOne(loginQuery);

            res.status(200).json({ message: `Login ${Uname} successful` });
          } else {
            // Logout logic
            await usersLogsCollection.updateOne(logsQuery, {
              $set: { timeout: new Date().toLocaleTimeString() },
            });

            res.status(200).json({ message: `Logout ${Uname} successful` });
          }
        } else {
          // New user add
          const data = req.body;
          console.log(data)
          const result = await usersCollection.insertOne(data);
          const copyData = {
            username:data.username,
            serialnumber: data.serialnumber,
            fingerprint_id: data.fingerprint_id,
            checkindate: data.regDate,
            timein: data.timein,
            timeout: "",
          }
          const logResult = await usersLogsCollection.insertOne(copyData);

          res
            .status(200)
            .json({ message: `User ${data.username} added successfully` });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // Delete User
    app.delete("/deleteUser", async (req, res) => {
      console.log(req.body)
      try {
        const userID = req.body.userID;
        // Delete user from userCollection
        const deleteResultUser = await usersCollection.deleteOne({
          fingerprint_id: userID,
        });

        // Delete user from userLogsCollection
        const deleteResultLogs = await usersLogsCollection.deleteMany({
          fingerprint_id: userID,
        });

        if (deleteResultUser.deletedCount > 0) {
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// listener
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
