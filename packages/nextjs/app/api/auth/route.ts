import { NextResponse } from "next/server"

type UserRole = "freelancer" | "employer" | "admin"

interface AuthBody {
  action: "signin" | "signup" | "signout" | "update"
  role?: UserRole
  kycComplete?: boolean
}

const COOKIE_NAME = "swn_user"

function readUserFromCookie(cookieValue: string | undefined) {
  if (!cookieValue) return null
  try {
    return JSON.parse(cookieValue)
  } catch {
    return null
  }
}

export async function GET() {
  const response = NextResponse.json({ success: true })
  const cookie = response.cookies.get(COOKIE_NAME)
  const user = readUserFromCookie(cookie?.value)
  return NextResponse.json({ success: true, data: user })
}

export async function POST(request: Request) {
  const body = (await request.json()) as AuthBody
  const res = NextResponse.json({ success: true })

  if (body.action === "signout") {
    res.cookies.set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 })
    return NextResponse.json({ success: true, message: "Signed out" })
  }

  if (body.action === "signin" || body.action === "signup" || body.action === "update") {
    const role: UserRole = body.role || "freelancer"
    const kycComplete = body.kycComplete ?? (body.action === "signin")
    const user = { role, kycComplete }
    const response = NextResponse.json({ success: true, data: user })
    response.cookies.set(COOKIE_NAME, JSON.stringify(user), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return response
  }

  return NextResponse.json({ success: false, message: "Unsupported action" }, { status: 400 })
}

