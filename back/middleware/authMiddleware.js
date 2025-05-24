export const authenticate = (req, res, next) => {
  const apiKey = req.header("Authorization")?.replace("Bearer ", "");

  const VALID_API_KEY = "my_secret_api_key";

  if (!apiKey || apiKey !== VALID_API_KEY) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or missing API key" });
  }

  next();
};
