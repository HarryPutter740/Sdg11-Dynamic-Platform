import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { translations } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

const VALID_LANGUAGES = ['EN', 'ES'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const lang = searchParams.get('lang');

    // Single record fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const record = await db.select()
        .from(translations)
        .where(eq(translations.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
      }

      return NextResponse.json(record[0]);
    }

    // List fetch with language filtering
    if (!lang) {
      return NextResponse.json({ 
        error: "Language parameter is required. Use ?lang=EN or ?lang=ES",
        code: "MISSING_LANGUAGE_PARAMETER" 
      }, { status: 400 });
    }

    // Normalize language parameter (accept both 'en' and 'EN')
    const normalizedLang = lang.toUpperCase();
    
    if (!VALID_LANGUAGES.includes(normalizedLang)) {
      return NextResponse.json({ 
        error: `Invalid language. Must be one of: ${VALID_LANGUAGES.join(', ')}`,
        code: "INVALID_LANGUAGE" 
      }, { status: 400 });
    }

    const results = await db.select()
      .from(translations)
      .where(eq(translations.language, normalizedLang));

    // Convert to key-value pairs object format
    const keyValuePairs = results.reduce((acc, translation) => {
      acc[translation.key] = translation.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json(keyValuePairs);

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { key, language, value } = requestBody;

    // Validate required fields
    if (!key) {
      return NextResponse.json({ 
        error: "Key is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!language) {
      return NextResponse.json({ 
        error: "Language is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!value) {
      return NextResponse.json({ 
        error: "Value is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    // Validate language
    if (!VALID_LANGUAGES.includes(language)) {
      return NextResponse.json({ 
        error: `Invalid language. Must be one of: ${VALID_LANGUAGES.join(', ')}`,
        code: "INVALID_LANGUAGE" 
      }, { status: 400 });
    }

    // Check for duplicate key+language combination
    const existing = await db.select()
      .from(translations)
      .where(and(
        eq(translations.key, key.trim()),
        eq(translations.language, language)
      ))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ 
        error: `Translation with key '${key}' already exists for language '${language}'`,
        code: "DUPLICATE_KEY_LANGUAGE" 
      }, { status: 409 });
    }

    // Sanitize inputs
    const sanitizedData = {
      key: key.trim(),
      language: language.toUpperCase(),
      value: value.trim()
    };

    const newRecord = await db.insert(translations)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newRecord[0], { status: 201 });

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

    const requestBody = await request.json();
    const { key, language, value } = requestBody;

    // Check record exists
    const existingRecord = await db.select()
      .from(translations)
      .where(eq(translations.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
    }

    // Validate language if provided
    if (language && !VALID_LANGUAGES.includes(language)) {
      return NextResponse.json({ 
        error: `Invalid language. Must be one of: ${VALID_LANGUAGES.join(', ')}`,
        code: "INVALID_LANGUAGE" 
      }, { status: 400 });
    }

    // If updating key or language, check for duplicate combination
    const updateKey = key !== undefined ? key.trim() : existingRecord[0].key;
    const updateLanguage = language !== undefined ? language.toUpperCase() : existingRecord[0].language;

    if ((key !== undefined || language !== undefined) && 
        (updateKey !== existingRecord[0].key || updateLanguage !== existingRecord[0].language)) {
      const duplicate = await db.select()
        .from(translations)
        .where(and(
          eq(translations.key, updateKey),
          eq(translations.language, updateLanguage)
        ))
        .limit(1);

      if (duplicate.length > 0 && duplicate[0].id !== parseInt(id)) {
        return NextResponse.json({ 
          error: `Translation with key '${updateKey}' already exists for language '${updateLanguage}'`,
          code: "DUPLICATE_KEY_LANGUAGE" 
        }, { status: 409 });
      }
    }

    // Prepare updates
    const updates: any = {};
    if (key !== undefined) updates.key = key.trim();
    if (language !== undefined) updates.language = language.toUpperCase();
    if (value !== undefined) updates.value = value.trim();

    const updated = await db.update(translations)
      .set(updates)
      .where(eq(translations.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
    }

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

    // Check record exists
    const existingRecord = await db.select()
      .from(translations)
      .where(eq(translations.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
    }

    const deleted = await db.delete(translations)
      .where(eq(translations.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Translation deleted successfully',
      deleted: deleted[0] 
    });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}