import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/image",
    "/image/iphone.png",
    "/opengraph-image",
    "/imprint",
  ],
  afterAuth(auth, req, evt) {
    if (
      req.nextUrl.pathname === "/admin" &&
      auth.userId !== process.env.ADMIN_USER_ID
    ) {
      const voteUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(voteUrl);
    }
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (auth.userId && req.nextUrl.pathname === "/") {
      const voteUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(voteUrl);
    }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
