import prismadb from '@/lib/prismadb';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    // Get the stats from Docker hub.
    const dockerResponse = await fetch("https://hub.docker.com/v2/repositories/dickwolff/export-to-ghostfolio");
    const dockerData = await dockerResponse.json();

    // Get the last entry for known pull data (so yesterday).
    const lastEntries = await prismadb.pullData.findMany({
        orderBy: {
            date: 'desc',
        },
        take: 1
    });

    // Get the pull count (or 0 if none present).
    var lastPullCount = lastEntries.length === 0 ? 0 : lastEntries[0].pullsTotal;

    // Add todays pull count.
    const newData = {
        pullsToday: dockerData.pull_count,
        pullsTotal: lastPullCount += dockerData.pull_count
    }

    // Add entry to database.
    await prismadb.pullData.create({
        data: newData
    });

    // Return 200 with new pull data.
    return Response.json({ success: true, data: newData });
}