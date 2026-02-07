import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/app/actions';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const eventId = parseInt(resolvedParams.id);
        
        // Validate that eventId is a valid number
        if (isNaN(eventId)) {
            return NextResponse.json(
                { error: 'Invalid event ID' },
                { status: 400 }
            );
        }

        // Check if user is logged in
        const user = await getCurrentUser();
        if (!user) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Check if event exists
        const event = await db.event.findUnique({
            where: { id: eventId }
        });

        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        // In a real application, you would register the user for the event
        // For now, we'll simulate the registration and redirect back to events page
        // with a success message in URL parameters

        // Return a success response that redirects to events page with success message
        const redirectUrl = new URL('/events', request.url);
        redirectUrl.searchParams.set('registered', 'true');
        redirectUrl.searchParams.set('event', event.title);
        
        return NextResponse.redirect(redirectUrl);
    } catch (error) {
        console.error('Error registering for event:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}