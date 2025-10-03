import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { contactSubmissions } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = (page - 1) * limit;
    
    // Filter by read status
    const readParam = searchParams.get('read');
    
    let query = db.select().from(contactSubmissions);
    
    if (readParam !== null) {
      const readValue = readParam === 'true';
      query = query.where(eq(contactSubmissions.read, readValue));
    }
    
    const results = await query
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(limit)
      .offset(offset);
    
    return NextResponse.json(results);
    
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, page } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ 
        error: "Name, email, and message are required",
        code: "MISSING_REQUIRED_FIELDS" 
      }, { status: 400 });
    }
    
    // Trim strings
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();
    const trimmedPage = page?.trim();
    
    // Validate trimmed fields are not empty
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json({ 
        error: "Name, email, and message cannot be empty",
        code: "EMPTY_REQUIRED_FIELDS" 
      }, { status: 400 });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ 
        error: "Invalid email format",
        code: "INVALID_EMAIL" 
      }, { status: 400 });
    }
    
    // Create new contact submission
    const insertData = {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      page: trimmedPage || null,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    const newSubmission = await db.insert(contactSubmissions)
      .values(insertData)
      .returning();
    
    return NextResponse.json({
      message: "Contact submission created successfully",
      submissionId: newSubmission[0].id,
      submission: newSubmission[0]
    }, { status: 201 });
    
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }
    
    const body = await request.json();
    const { read } = body;
    
    // Check if record exists
    const existingRecord = await db.select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, parseInt(id)))
      .limit(1);
    
    if (existingRecord.length === 0) {
      return NextResponse.json({ 
        error: "Contact submission not found" 
      }, { status: 404 });
    }
    
    // Prepare update data
    const updateData: any = {};
    
    if (typeof read === 'boolean') {
      updateData.read = read;
    }
    
    // Update the record
    const updated = await db.update(contactSubmissions)
      .set(updateData)
      .where(eq(contactSubmissions.id, parseInt(id)))
      .returning();
    
    return NextResponse.json(updated[0]);
    
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }
    
    // Check if record exists
    const existingRecord = await db.select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, parseInt(id)))
      .limit(1);
    
    if (existingRecord.length === 0) {
      return NextResponse.json({ 
        error: "Contact submission not found" 
      }, { status: 404 });
    }
    
    // Delete the record
    const deleted = await db.delete(contactSubmissions)
      .where(eq(contactSubmissions.id, parseInt(id)))
      .returning();
    
    return NextResponse.json({
      message: "Contact submission deleted successfully",
      deleted: deleted[0]
    });
    
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}