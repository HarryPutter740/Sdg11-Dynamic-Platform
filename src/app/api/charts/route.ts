import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { charts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

const VALID_CHART_TYPES = ['bar', 'line', 'pie', 'doughnut'] as const;
type ChartType = typeof VALID_CHART_TYPES[number];

function isValidChartType(type: string): type is ChartType {
  return VALID_CHART_TYPES.includes(type as ChartType);
}

function isValidJsonArray(value: any): boolean {
  return Array.isArray(value) && value.length > 0;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const published = searchParams.get('published');

    // Single chart by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const chart = await db.select()
        .from(charts)
        .where(eq(charts.id, parseInt(id)))
        .limit(1);

      if (chart.length === 0) {
        return NextResponse.json({ error: 'Chart not found' }, { status: 404 });
      }

      return NextResponse.json(chart[0]);
    }

    // List charts with optional published filter
    let query = db.select().from(charts);

    // Filter by published status (default: true)
    const publishedFilter = published === 'false' ? false : true;
    query = query.where(eq(charts.published, publishedFilter));

    const results = await query.orderBy(desc(charts.createdAt));

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
    const { title, description, chartType, labels, datasets } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }

    if (!chartType) {
      return NextResponse.json({ 
        error: "Chart type is required",
        code: "MISSING_CHART_TYPE" 
      }, { status: 400 });
    }

    if (!labels) {
      return NextResponse.json({ 
        error: "Labels are required",
        code: "MISSING_LABELS" 
      }, { status: 400 });
    }

    if (!datasets) {
      return NextResponse.json({ 
        error: "Datasets are required",
        code: "MISSING_DATASETS" 
      }, { status: 400 });
    }

    // Validate chartType
    if (!isValidChartType(chartType)) {
      return NextResponse.json({ 
        error: `Chart type must be one of: ${VALID_CHART_TYPES.join(', ')}`,
        code: "INVALID_CHART_TYPE" 
      }, { status: 400 });
    }

    // Validate JSON arrays
    if (!isValidJsonArray(labels)) {
      return NextResponse.json({ 
        error: "Labels must be a non-empty array",
        code: "INVALID_LABELS" 
      }, { status: 400 });
    }

    if (!isValidJsonArray(datasets)) {
      return NextResponse.json({ 
        error: "Datasets must be a non-empty array",
        code: "INVALID_DATASETS" 
      }, { status: 400 });
    }

    const now = new Date().toISOString();
    
    const newChart = await db.insert(charts)
      .values({
        title: title.trim(),
        description: description ? description.trim() : null,
        chartType,
        labels,
        datasets,
        published: true,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(newChart[0], { status: 201 });
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

    // Check if chart exists
    const existingChart = await db.select()
      .from(charts)
      .where(eq(charts.id, parseInt(id)))
      .limit(1);

    if (existingChart.length === 0) {
      return NextResponse.json({ error: 'Chart not found' }, { status: 404 });
    }

    const body = await request.json();
    const { title, description, chartType, labels, datasets, published } = body;

    // Validate chartType if provided
    if (chartType !== undefined && !isValidChartType(chartType)) {
      return NextResponse.json({ 
        error: `Chart type must be one of: ${VALID_CHART_TYPES.join(', ')}`,
        code: "INVALID_CHART_TYPE" 
      }, { status: 400 });
    }

    // Validate labels if provided
    if (labels !== undefined && !isValidJsonArray(labels)) {
      return NextResponse.json({ 
        error: "Labels must be a non-empty array",
        code: "INVALID_LABELS" 
      }, { status: 400 });
    }

    // Validate datasets if provided
    if (datasets !== undefined && !isValidJsonArray(datasets)) {
      return NextResponse.json({ 
        error: "Datasets must be a non-empty array",
        code: "INVALID_DATASETS" 
      }, { status: 400 });
    }

    // Build update object with only provided fields
    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description ? description.trim() : null;
    if (chartType !== undefined) updates.chartType = chartType;
    if (labels !== undefined) updates.labels = labels;
    if (datasets !== undefined) updates.datasets = datasets;
    if (published !== undefined) updates.published = published;

    const updatedChart = await db.update(charts)
      .set(updates)
      .where(eq(charts.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedChart[0]);
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

    // Check if chart exists
    const existingChart = await db.select()
      .from(charts)
      .where(eq(charts.id, parseInt(id)))
      .limit(1);

    if (existingChart.length === 0) {
      return NextResponse.json({ error: 'Chart not found' }, { status: 404 });
    }

    const deleted = await db.delete(charts)
      .where(eq(charts.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Chart deleted successfully',
      deleted: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}