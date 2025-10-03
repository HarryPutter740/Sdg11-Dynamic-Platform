import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const pages = sqliteTable('pages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  content: text('content').notNull(),
  metaDescription: text('meta_description'),
  metaKeywords: text('meta_keywords'),
  published: integer('published', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const galleryImages = sqliteTable('gallery_images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  altText: text('alt_text').notNull(),
  imageUrl: text('image_url').notNull(),
  category: text('category').notNull(),
  order: integer('order').default(0),
  published: integer('published', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const storyCards = sqliteTable('story_cards', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  category: text('category').notNull(),
  backgroundImage: text('background_image').notNull(),
  linkUrl: text('link_url'),
  content: text('content'),
  size: text('size').default('standard'),
  order: integer('order').default(0),
  published: integer('published', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const translations = sqliteTable('translations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull(),
  language: text('language').notNull(),
  value: text('value').notNull(),
});

export const siteSettings = sqliteTable('site_settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const blogPosts = sqliteTable('blog_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  featuredImage: text('featured_image'),
  author: text('author').notNull(),
  category: text('category').notNull(),
  tags: text('tags'),
  published: integer('published', { mode: 'boolean' }).default(false),
  publishedAt: text('published_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const charts = sqliteTable('charts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  chartType: text('chart_type').notNull(),
  labels: text('labels', { mode: 'json' }).notNull(),
  datasets: text('datasets', { mode: 'json' }).notNull(),
  published: integer('published', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const contactSubmissions = sqliteTable('contact_submissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  page: text('page'),
  read: integer('read', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
});