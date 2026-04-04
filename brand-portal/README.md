# Athlete ID Brand Portal - Setup Guide

A production-grade multi-sided platform portal for brands to sell sports products directly to athletes.

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- Supabase account (https://supabase.com)
- Cloudinary account (https://cloudinary.com)

### 2. Environment Setup

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local .env.local
```

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Setup

1. Go to your Supabase dashboard
2. Open SQL Editor
3. Copy the entire content from `DATABASE_SCHEMA.sql`
4. Execute the SQL to create all tables and indexes

### 5. Cloudinary Setup

1. Create an upload preset in Cloudinary:
   - Go to Settings → Upload
   - Create unsigned upload preset named: `athlete_id_brand`
   - Set folder to auto-organize uploads

2. Get your Cloud Name and API Key from Settings → API Keys

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📊 Project Structure

```
brand-portal/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles
│   ├── auth/
│   │   ├── request/
│   │   │   └── page.tsx        # Brand approval request form
│   │   └── signin/
│   │       └── page.tsx        # Brand sign-in
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   ├── page.tsx            # Dashboard home
│   │   ├── products/
│   │   │   ├── page.tsx        # Products list
│   │   │   ├── new/
│   │   │   │   └── page.tsx    # Add new product
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx # Edit product
│   │   └── orders/
│   │       └── page.tsx        # Orders management
│   └── admin/
│       └── page.tsx            # Admin approval panel
├── components/
│   └── Sidebar.tsx             # Sidebar navigation
├── lib/
│   ├── supabase.ts             # Supabase client & types
│   ├── db.ts                   # Database functions
│   ├── auth.ts                 # Authentication helpers
│   └── cloudinary.ts           # Cloudinary upload
├── public/                     # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── .env.local                  # Environment variables
└── DATABASE_SCHEMA.sql         # SQL schema file
```

---

## 🔐 Authentication Flow

### 1. Brand Request Page (`/auth/request`)
- Brands submit approval request with:
  - Brand Name
  - Email
  - Business Type
  - Description

### 2. Admin Approval (`/admin`)
- Admin reviews pending requests
- Generates unique sign-in code
- Approves and stores brand in `brands` table

### 3. Brand Sign In (`/auth/signin`)
- Email + Sign-In Code authentication
- Creates local auth state
- Redirects to dashboard

### 4. Dashboard (`/dashboard`)
- Protected route - checks local auth state
- Access products, orders, and analytics

---

## 📦 Product Management

### Add Product
- Fill product details
- Upload image to Cloudinary
- Image stored with secure URL
- Automatically saved to database

### Edit Product
- View all brand products
- Edit details and image
- Delete products with confirmation

### Product Database Fields
- `id`: UUID (primary key)
- `brand_id`: Link to brand
- `name`: Product name
- `description`: Product details
- `price`: Product price
- `category`: Category (apparel, footwear, etc.)
- `image_url`: Cloudinary image URL
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

---

## 📋 Order Management

### Orders Dashboard
- View all incoming orders
- See order details:
  - Product info
  - Buyer name
  - Order status
  - Order date

### Order Status
- **Pending**: New order
- **Shipped**: Order dispatched
- **Delivered**: Order completed

### Update Status
- Click order status dropdown
- Select new status
- Automatically updates database

---

## 🎨 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework (App Router) |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Supabase** | Database & Auth |
| **Cloudinary** | Image hosting |
| **Axios** | API calls |

---

## 🔄 API Routes (Optional)

For building additional features, you can create API routes:

```bash
app/api/products/route.ts
app/api/orders/route.ts
app/api/auth/route.ts
```

---

## 🧪 Testing

### Test Brand Request
1. Go to `/auth/request`
2. Fill form and submit
3. Check admin panel at `/admin`

### Test Brand Sign In
1. Approve request in admin panel
2. Go to `/auth/signin`
3. Use email and provided sign-in code

### Test Product Management
1. Sign in as brand
2. Go to `/dashboard/products/new`
3. Add product with image
4. Edit/delete from products list

### Test Orders
1. (Mock data will appear)
2. Change order status
3. Check dashboard updates

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy
vercel
```

### Environment Variables on Vercel
1. Go to Project Settings → Environment Variables
2. Add all `.env.local` variables

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Enable RLS policies in Supabase
- [ ] Configure CORS in Supabase
- [ ] Set up Cloudinary production preset
- [ ] Use strong sign-in codes
- [ ] Enable HTTPS
- [ ] Set up monitoring/logging

---

## 📝 Database Schema

### brand_requests
```sql
id (UUID)
name (text)
email (text)
business_type (text)
description (text)
status (pending|approved|rejected)
created_at (timestamp)
```

### brands
```sql
id (UUID)
name (text)
email (text)
sign_in_code (text)
created_at (timestamp)
```

### products
```sql
id (UUID)
brand_id (UUID → brands)
name (text)
description (text)
price (numeric)
category (text)
image_url (text)
created_at (timestamp)
updated_at (timestamp)
```

### orders
```sql
id (UUID)
product_id (UUID → products)
buyer_id (UUID)
buyer_name (text)
status (pending|shipped|delivered)
created_at (timestamp)
updated_at (timestamp)
```

---

## 🔒 Security Notes

1. **Authentication**: Client-side auth with localStorage (upgrade to sessions in production)
2. **RLS**: Enable Row Level Security in Supabase for data isolation
3. **Cloudinary**: Use unsigned uploads with restricted upload presets
4. **Sign-In Codes**: Generate strong unique codes (at least 12 characters)
5. **CORS**: Configure Supabase CORS for your domain
6. **Rate Limiting**: Implement in production

---

## 🐛 Troubleshooting

### "Cannot find Supabase client"
- Check `.env.local` has correct URL and keys
- Restart dev server: `npm run dev`

### "Image upload fails"
- Verify Cloudinary cloud name in `.env.local`
- Check upload preset is set to `athlete_id_brand`
- Ensure unsigned uploads are enabled

### "Brand not found on sign in"
- Verify brand was approved in admin panel
- Check email is correct
- Ensure brand exists in `brands` table

### "Product not showing"
- Verify product created successfully (check database)
- Ensure brand_id matches logged-in brand
- Check Cloudinary image URL is accessible

---

## 📞 Support

For issues:
1. Check the troubleshooting section
2. Review DATABASE_SCHEMA.sql for database structure
3. Verify environment variables
4. Check browser console for errors
5. Review server logs

---

## 📄 License

MIT License - Feel free to use and modify for your startup!

---

**Built with ❤️ for Athlete ID**
