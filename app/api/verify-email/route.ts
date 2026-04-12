import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/verify-email
 *
 * Accepts a verification token from the Podium mobile app email link,
 * validates it, and marks the user's email as verified.
 *
 * Body: { token: string }
 */
export async function POST(req: NextRequest) {
  let token: string | undefined;

  try {
    const body = await req.json();
    token = typeof body?.token === "string" ? body.token.trim() : undefined;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!token) {
    return NextResponse.json(
      { error: "A verification token is required." },
      { status: 400 }
    );
  }

  // TODO: Replace this stub with a real token lookup against your database.
  // The token should be validated against a stored record that includes an
  // expiry time.  Example using a hypothetical db client:
  //
  //   const record = await db.verificationTokens.findUnique({ where: { token } });
  //   if (!record) return error("Token not found.");
  //   if (record.expiresAt < new Date()) return error("Token has expired.");
  //   await db.users.update({ where: { id: record.userId }, data: { emailVerified: new Date() } });
  //   await db.verificationTokens.delete({ where: { token } });

  const isValid = await verifyToken(token);

  if (!isValid) {
    return NextResponse.json(
      { error: "This verification link is invalid or has expired." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Your email has been verified. Welcome to Podium!" },
    { status: 200 }
  );
}

/**
 * Stub token verification function.
 * Replace with a real database lookup when the backend is ready.
 */
async function verifyToken(token: string): Promise<boolean> {
  // This stub always returns false so the endpoint is safe to deploy
  // before a real database is connected.  Swap in your DB query here.
  void token;
  return false;
}
