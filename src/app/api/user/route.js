import { NextResponse } from "next/server";
const admin = require("../admin"); // Adjust path if needed

export async function POST(req) {
  const { action, email, password, uid, newPassword } = await req.json();

  try {
    if (action === "create") {
      // Check if user already exists
      try {
        await admin.auth().getUserByEmail(email);
        return NextResponse.json({ error: "User with this email already exists." }, { status: 400 });
      } catch (err) {
        if (err.code !== "auth/user-not-found") {
          return NextResponse.json({ error: err.message }, { status: 500 });
        }
      }
      const user = await admin.auth().createUser({ email, password });
      return NextResponse.json({ success: true, user });
    }

    if (action === "delete") {
      await admin.auth().deleteUser(uid);
      return NextResponse.json({ success: true });
    }

    if (action === "updatePassword") {
      await admin.auth().updateUser(uid, { password: newPassword });
      return NextResponse.json({ success: true });
    }

    if (action === "checkEmail") {
      try {
        await admin.auth().getUserByEmail(email);
        console.log("User exists:", email);
        // User exists, return success response
        return NextResponse.json({ exists: true });
      } catch (err) {
        console.log("User does not exist:", err);
        if (err.code === "auth/user-not-found") {
          return NextResponse.json({ exists: false });
        }
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
