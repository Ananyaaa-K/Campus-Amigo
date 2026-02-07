import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const pyqId = parseInt(resolvedParams.id);
        
        // Validate that pyqId is a valid number
        if (isNaN(pyqId)) {
            return NextResponse.json(
                { error: 'Invalid PYQ ID' },
                { status: 400 }
            );
        }
        
        // Fetch the PYQ with the given ID
        const pyq = await db.pyq.findUnique({
            where: { id: pyqId }
        });

        if (!pyq) {
            return NextResponse.json(
                { error: 'PYQ not found' },
                { status: 404 }
            );
        }

        // For now, we'll simulate a file download with a placeholder PDF
        // In a real application, you would serve the actual file from storage
        
        // Create a mock PDF response for demonstration purposes
        const mockPdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
0 750 Td
(${pyq.subject} - ${pyq.year} PYQ - Shared via Campus Amigo) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000123 00000 n 
0000000268 00000 n 
0000000363 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
424
%%EOF`;

        const buffer = Buffer.from(mockPdfContent);

        const response = new NextResponse(buffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${encodeURIComponent(pyq.subject.replace(/\s+/g, '_'))}_${pyq.year}_PYQ.pdf"`,
                'Content-Length': buffer.length.toString(),
            },
        });

        return response;
    } catch (error) {
        console.error('Error downloading PYQ:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}