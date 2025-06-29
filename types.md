Looking at the HMREF specification, here's a clean flat data structure for representing parsed hierarchical markdown:

````typescript
/**
 * Represents a single component in a hierarchical markdown execution flow.
 * Components are stored in a flat array structure with parent-child relationships
 * maintained through parent_id references.
 */
interface HMREFStep {
  /**
   * Unique identifier for this component. Used to establish ordering and
   * parent-child relationships. Should be sequential integers starting from 0.
   */
  id: number;

  /**
   * Reference to the parent component's id. Null for root-level components.
   * This establishes the hierarchical nesting structure in the flat array.
   */
  parent_id: number | null;

  /**
   * The nesting depth level of this component, starting from 0 for root level.
   * Derived from the number of '>' blockquote characters in the original markdown.
   * Used for rendering and dependency analysis.
   */
  level: number;

  /**
   * The complete content of this component including its header and body text.
   * Contains all markdown content between this component's start and the next
   * component at the same or higher level. Nested components' content is excluded.
   *
   * Example:
   * ```markdown
   * # Payment Processing
   *
   * Processing credit card transaction for order #12345.
   * Validating card details and checking fraud prevention rules.
   * ```
   */
  content: string;
}

/**
 * Complete parsed representation of an HMREF document.
 * Maintains the original document structure as a flat array of steps
 * with hierarchical relationships preserved through parent_id references.
 */
interface HMREFDocument {
  steps: HMREFStep[];
}
````

Here's an improved example that focuses on workflow definition with natural language input/output specifications:

```typescript
interface HMREFStep {
  id: number;
  parent_id: number | null;
  level: number;
  content: string;
}

interface HMREFDocument {
  steps: HMREFStep[];
}
```

**Example HMREF workflow definition:**

```markdown
# Customer Onboarding Automation

**Input:** New customer registration request with basic contact information and service preferences

The system will validate the customer information, set up their account across multiple systems, and prepare welcome materials.

> # Identity Verification Service
>
> **Input:** Customer name, email, phone number, and government ID number
>
> This service will verify the customer's identity against multiple databases and check for any compliance issues.
>
> > # Credit Bureau Check
> >
> > **Input:** Full name, SSN, date of birth, current address
> >
> > Perform comprehensive credit history lookup and risk assessment to determine account limits and approval status.
> >
> > **Output:** Credit score, risk rating, recommended account tier, and any flags or restrictions
>
> > # Sanctions Screening
> >
> > **Input:** Full name, date of birth, known aliases, current and previous addresses
> >
> > Cross-reference customer information against government watchlists, sanctions lists, and politically exposed persons databases.
> >
> > **Output:** Clear/flag status, match confidence scores, any regulatory restrictions or enhanced due diligence requirements
>
> **Output:** Identity verification status (approved/rejected/pending), compliance clearance level, recommended account type, and any required follow-up actions

> # Account Provisioning Service
>
> **Input:** Verified customer information, approved account type, service preferences, and compliance requirements
>
> Create customer accounts across all necessary systems and configure initial settings based on their service tier.
>
> > # Database Account Creation
> >
> > **Input:** Customer profile data, account tier, default preferences, and security settings
> >
> > Generate unique customer ID, create master account record, and set up initial security credentials.
> >
> > **Output:** Customer ID, account number, temporary password, security question setup status
>
> > # Service Configuration
> >
> > **Input:** Customer ID, selected services, account tier limits, and regional settings
> >
> > Configure access permissions, set account limits, and enable requested services based on the customer's tier.
> >
> > **Output:** Configured service list, access permissions, account limits, billing setup status
>
> > # Integration Setup
> >
> > **Input:** Customer ID, account configuration, third-party service preferences
> >
> > Connect customer account to external services they've requested, such as payment processors or partner platforms.
> >
> > **Output:** Connected service list, API keys generated, integration status for each requested service
>
> **Output:** Complete account setup confirmation, customer ID, login credentials, configured services list, and integration status

> # Welcome Communications
>
> **Input:** Customer contact preferences, account details, configured services, and onboarding checklist
>
> Generate and send personalized welcome materials and next-step guidance to help the customer get started.
>
> > # Welcome Email Generation
> >
> > **Input:** Customer name, account type, configured services, login credentials, and personalization data
> >
> > Create customized welcome email with account details, getting started guide, and relevant tips based on their selected services.
> >
> > **Output:** Personalized welcome email content, getting started checklist, relevant documentation links
>
> > # Onboarding Schedule Creation
> >
> > **Input:** Customer preferences, account complexity, selected services, and availability calendar
> >
> > Create a personalized onboarding timeline with key milestones, optional training sessions, and check-in points.
> >
> > **Output:** Onboarding timeline, scheduled check-in dates, optional training session availability, milestone tracking setup
>
> **Output:** Welcome communications sent status, onboarding schedule established, customer portal access confirmed, and support ticket system setup complete

**Output:** Fully onboarded customer with verified identity, provisioned accounts across all systems, configured services, sent welcome materials, and established onboarding timeline. Customer is ready to begin using services with appropriate support channels activated.
```

**Rendered Markdown**

> # Customer Onboarding Automation
>
> **Input:** New customer registration request with basic contact information and service preferences
>
> The system will validate the customer information, set up their account across multiple systems, and prepare welcome materials.
>
> > # Identity Verification Service
> >
> > **Input:** Customer name, email, phone number, and government ID number
> >
> > This service will verify the customer's identity against multiple databases and check for any compliance issues.
> >
> > > # Credit Bureau Check
> > >
> > > **Input:** Full name, SSN, date of birth, current address
> > >
> > > Perform comprehensive credit history lookup and risk assessment to determine account limits and approval status.
> > >
> > > **Output:** Credit score, risk rating, recommended account tier, and any flags or restrictions
> >
> > > # Sanctions Screening
> > >
> > > **Input:** Full name, date of birth, known aliases, current and previous addresses
> > >
> > > Cross-reference customer information against government watchlists, sanctions lists, and politically exposed persons databases.
> > >
> > > **Output:** Clear/flag status, match confidence scores, any regulatory restrictions or enhanced due diligence requirements
> >
> > **Output:** Identity verification status (approved/rejected/pending), compliance clearance level, recommended account type, and any required follow-up actions
>
> > # Account Provisioning Service
> >
> > **Input:** Verified customer information, approved account type, service preferences, and compliance requirements
> >
> > Create customer accounts across all necessary systems and configure initial settings based on their service tier.
> >
> > > # Database Account Creation
> > >
> > > **Input:** Customer profile data, account tier, default preferences, and security settings
> > >
> > > Generate unique customer ID, create master account record, and set up initial security credentials.
> > >
> > > **Output:** Customer ID, account number, temporary password, security question setup status
> >
> > > # Service Configuration
> > >
> > > **Input:** Customer ID, selected services, account tier limits, and regional settings
> > >
> > > Configure access permissions, set account limits, and enable requested services based on the customer's tier.
> > >
> > > **Output:** Configured service list, access permissions, account limits, billing setup status
> >
> > > # Integration Setup
> > >
> > > **Input:** Customer ID, account configuration, third-party service preferences
> > >
> > > Connect customer account to external services they've requested, such as payment processors or partner platforms.
> > >
> > > **Output:** Connected service list, API keys generated, integration status for each requested service
> >
> > **Output:** Complete account setup confirmation, customer ID, login credentials, configured services list, and integration status
>
> > # Welcome Communications
> >
> > **Input:** Customer contact preferences, account details, configured services, and onboarding checklist
> >
> > Generate and send personalized welcome materials and next-step guidance to help the customer get started.
> >
> > > # Welcome Email Generation
> > >
> > > **Input:** Customer name, account type, configured services, login credentials, and personalization data
> > >
> > > Create customized welcome email with account details, getting started guide, and relevant tips based on their selected services.
> > >
> > > **Output:** Personalized welcome email content, getting started checklist, relevant documentation links
> >
> > > # Onboarding Schedule Creation
> > >
> > > **Input:** Customer preferences, account complexity, selected services, and availability calendar
> > >
> > > Create a personalized onboarding timeline with key milestones, optional training sessions, and check-in points.
> > >
> > > **Output:** Onboarding timeline, scheduled check-in dates, optional training session availability, milestone tracking setup
> >
> > **Output:** Welcome communications sent status, onboarding schedule established, customer portal access confirmed, and support ticket system setup complete
>
> **Output:** Fully onboarded customer with verified identity, provisioned accounts across all systems, configured services, sent welcome materials, and established onboarding timeline. Customer is ready to begin using services with appropriate support channels activated.

**Parsed structure:**

```typescript
const document: HMREFDocument = {
  steps: [
    {
      id: 0,
      parent_id: null,
      level: 0,
      content:
        "# Customer Onboarding Automation\n\n**Input:** New customer registration request with basic contact information and service preferences\n\nThe system will validate the customer information, set up their account across multiple systems, and prepare welcome materials.\n\n**Output:** Fully onboarded customer with verified identity, provisioned accounts across all systems, configured services, sent welcome materials, and established onboarding timeline. Customer is ready to begin using services with appropriate support channels activated.",
    },
    {
      id: 1,
      parent_id: 0,
      level: 1,
      content:
        "# Identity Verification Service\n\n**Input:** Customer name, email, phone number, and government ID number\n\nThis service will verify the customer's identity against multiple databases and check for any compliance issues.\n\n**Output:** Identity verification status (approved/rejected/pending), compliance clearance level, recommended account type, and any required follow-up actions",
    },
    {
      id: 2,
      parent_id: 1,
      level: 2,
      content:
        "# Credit Bureau Check\n\n**Input:** Full name, SSN, date of birth, current address\n\nPerform comprehensive credit history lookup and risk assessment to determine account limits and approval status.\n\n**Output:** Credit score, risk rating, recommended account tier, and any flags or restrictions",
    },
    {
      id: 3,
      parent_id: 1,
      level: 2,
      content:
        "# Sanctions Screening\n\n**Input:** Full name, date of birth, known aliases, current and previous addresses\n\nCross-reference customer information against government watchlists, sanctions lists, and politically exposed persons databases.\n\n**Output:** Clear/flag status, match confidence scores, any regulatory restrictions or enhanced due diligence requirements",
    },
    {
      id: 4,
      parent_id: 0,
      level: 1,
      content:
        "# Account Provisioning Service\n\n**Input:** Verified customer information, approved account type, service preferences, and compliance requirements\n\nCreate customer accounts across all necessary systems and configure initial settings based on their service tier.\n\n**Output:** Complete account setup confirmation, customer ID, login credentials, configured services list, and integration status",
    },
    {
      id: 5,
      parent_id: 4,
      level: 2,
      content:
        "# Database Account Creation\n\n**Input:** Customer profile data, account tier, default preferences, and security settings\n\nGenerate unique customer ID, create master account record, and set up initial security credentials.\n\n**Output:** Customer ID, account number, temporary password, security question setup status",
    },
    {
      id: 6,
      parent_id: 4,
      level: 2,
      content:
        "# Service Configuration\n\n**Input:** Customer ID, selected services, account tier limits, and regional settings\n\nConfigure access permissions, set account limits, and enable requested services based on the customer's tier.\n\n**Output:** Configured service list, access permissions, account limits, billing setup status",
    },
    {
      id: 7,
      parent_id: 4,
      level: 2,
      content:
        "# Integration Setup\n\n**Input:** Customer ID, account configuration, third-party service preferences\n\nConnect customer account to external services they've requested, such as payment processors or partner platforms.\n\n**Output:** Connected service list, API keys generated, integration status for each requested service",
    },
    {
      id: 8,
      parent_id: 0,
      level: 1,
      content:
        "# Welcome Communications\n\n**Input:** Customer contact preferences, account details, configured services, and onboarding checklist\n\nGenerate and send personalized welcome materials and next-step guidance to help the customer get started.\n\n**Output:** Welcome communications sent status, onboarding schedule established, customer portal access confirmed, and support ticket system setup complete",
    },
    {
      id: 9,
      parent_id: 8,
      level: 2,
      content:
        "# Welcome Email Generation\n\n**Input:** Customer name, account type, configured services, login credentials, and personalization data\n\nCreate customized welcome email with account details, getting started guide, and relevant tips based on their selected services.\n\n**Output:** Personalized welcome email content, getting started checklist, relevant documentation links",
    },
    {
      id: 10,
      parent_id: 8,
      level: 2,
      content:
        "# Onboarding Schedule Creation\n\n**Input:** Customer preferences, account complexity, selected services, and availability calendar\n\nCreate a personalized onboarding timeline with key milestones, optional training sessions, and check-in points.\n\n**Output:** Onboarding timeline, scheduled check-in dates, optional training session availability, milestone tracking setup",
    },
  ],
};
```
