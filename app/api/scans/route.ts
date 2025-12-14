// app/api/scans/route.ts
// Scan history API endpoint

import { NextRequest } from "next/server";
import { getScanRecordsForUser } from "@/lib/scanStore";

// TODO: Replace with auth-based user identification
const TEST_USER_ID = "user_test_001";

/**
 * GET /api/scans
 * Returns scan history for the authenticated user
 *
 * Query params:
 * - limit: max number of records (default: 50)
 * - offset: pagination offset (default: 0)
 */
export async function GET(req: NextRequest) {
  try {
    // TODO: Get userId from authenticated session
    // const session = await getServerSession(authOptions);
    // const userId = session?.user?.id;
    const userId = TEST_USER_ID;

    if (!userId) {
      return Response.json(
        { error: "UNAUTHORIZED", message: "Please sign in to view scan history" },
        { status: 401 }
      );
    }

    // Parse query params
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");

    // Get scan records for user
    const allRecords = getScanRecordsForUser(userId);

    // Sort by createdAt descending (newest first)
    const sortedRecords = allRecords.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Apply pagination
    const paginatedRecords = sortedRecords.slice(offset, offset + limit);

    return Response.json({
      scans: paginatedRecords,
      total: allRecords.length,
      limit,
      offset,
      hasMore: offset + limit < allRecords.length,
    });
  } catch (error) {
    console.error("Error fetching scan history:", error);
    return Response.json(
      { error: "INTERNAL_ERROR", message: "Failed to fetch scan history" },
      { status: 500 }
    );
  }
}
