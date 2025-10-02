# Creator Workflow (Workspace B) - Flow Diagram

## Complete Creator Journey

```
Landing Page
    ↓
[Sign Up as Creator Button]
    ↓
Registration Form (/auth/register?type=creator)
    ↓
[Basic Account Creation]
    ↓
Creator Account Setup (/creator/setup)
    ↓
[Step 1: Personal Information]
    ↓
[Step 2: Creator Profile]
    ↓
[Step 3: Payout Setup]
    ↓
Creator Verification (/creator/verification)
    ↓
[Email Verification]
    ↓
[Optional ID Verification]
    ↓
[Optional Social Verification]
    ↓
Workspace Selection (/creator/workspace-selection)
    ↓
[Choose Creator Workspace]
    ↓
Creator Onboarding (/creator/onboarding)
    ↓
[Step 1: Portfolio Setup]
    ↓
[Step 2: Social Connections]
    ↓
[Step 3: Rate Settings]
    ↓
[Step 4: Working Preferences]
    ↓
Creator Dashboard (/creator/dashboard)
    ↓
[Full Workspace Access]
```

## Creator Dashboard Sections

```
Creator Dashboard
├── Overview
│   ├── Earnings Summary
│   ├── Content Stats
│   ├── Quick Actions
│   └── Recent Activity
├── Opportunities
│   ├── Available Briefs
│   ├── My Applications
│   └── Quick Stats
├── Independent Content
│   ├── Content Creation Hub
│   ├── Content Management
│   └── Performance Tracking
├── Analytics
│   ├── Performance Insights
│   ├── Engagement Metrics
│   └── Growth Tracking
├── Earnings
│   ├── Income Tracking
│   ├── Revenue Analytics
│   └── Payment History
├── Payouts
│   ├── Payment Methods
│   ├── Payout History
│   └── Payout Settings
├── Messages
│   ├── Message Lists
│   ├── Conversation Window
│   └── Contact Details
├── Campaigns
│   ├── Active Campaigns
│   ├── Campaign Management
│   └── Contract Tracking
├── Audience
│   ├── Follower Insights
│   ├── Demographics
│   └── Engagement Analysis
├── Collaborations
│   ├── Brand Partnerships
│   ├── Partnership History
│   └── Collaboration Tools
└── Settings
    ├── Account Settings
    ├── Profile Management
    └── Preferences
```

## Content Creation Flows

### Independent Content Path
```
Independent Content
    ↓
[Create Content]
    ↓
[Upload/Write Content]
    ↓
[Set Distribution Channels]
    ↓
[Publish via Revelio]
    ↓
[Track Performance]
    ↓
[Earn Based on Metrics]
    ↓
[Payout Processing]
```

### Sponsored Content Path
```
Sponsored Content
    ↓
[Browse Briefs in Opportunities]
    ↓
[Apply to Brief]
    ↓
[Accept Contract]
    ↓
[Create Content]
    ↓
[Submit for Review]
    ↓
[Track Performance]
    ↓
[Earn Guaranteed + Bonus]
    ↓
[Escrow Release/Payout]
```

## Trust Score System

```
Trust Score Calculation
├── Email Verification: 30 points
├── ID Verification: 40 points
└── Social Verification: 30 points
    └── Total: 100 points

Trust Score Benefits
├── 80+ points: High Trust
│   ├── Access to premium briefs
│   ├── Higher rates
│   └── Priority support
├── 60-79 points: Medium Trust
│   ├── Standard briefs
│   ├── Regular rates
│   └── Standard support
├── 40-59 points: Low Trust
│   ├── Limited briefs
│   ├── Lower rates
│   └── Basic support
└── <40 points: Very Low Trust
    ├── Minimal access
    ├── Lowest rates
    └── Limited support
```

## File Structure

```
frontend/src/app/creator/
├── setup/page.tsx              # Account setup wizard
├── verification/page.tsx       # Verification process
├── workspace-selection/page.tsx # Workspace type selection
├── onboarding/page.tsx         # Onboarding wizard
└── dashboard/page.tsx          # Main dashboard

frontend/src/components/
├── auth/RegisterFormNeo.tsx    # Updated registration form
└── layout/CreatorWorkspace.tsx # Enhanced dashboard
```

## Key Features

### Multi-Step Forms
- Progress tracking
- Form validation
- Back/forward navigation
- Data persistence

### Trust Building
- Email verification
- ID document upload
- Social media connection
- Trust score calculation

### Content Management
- Independent content creation
- Sponsored content applications
- Performance tracking
- Earnings management

### Collaboration Tools
- Brief browsing and applications
- Messaging system
- Campaign management
- Contract tracking

### Analytics & Insights
- Performance metrics
- Earnings tracking
- Audience insights
- Growth analytics
