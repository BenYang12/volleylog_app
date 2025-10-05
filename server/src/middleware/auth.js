export function requireAuth(req, res, next) {
  if (req.session?.user) return next();
  res.status(401).json({ error: "Unauthorized" });
}
