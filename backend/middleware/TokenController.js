const dotenv = require("dotenv");
const admin = require("firebase-admin");

dotenv.config();
// const serviceAccount = require(process.env.FIREBASE_CONFIG_PATH);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    console.log("Received from Middleware:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: 401, message: "Unauthorized: No token provided!" });
    }

    // Extract the actual token
    const token = authHeader.split("Bearer ")[1]; 

    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    // console.log("Decoded Token:", decodedToken);.
    req.user = decodedToken;
    next();

  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ invalid: false, error: "Forbidden: Invalid token" });
  }
};

module.exports = { verifyToken };
